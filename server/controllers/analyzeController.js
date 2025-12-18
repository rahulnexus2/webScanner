import * as sslChecker from 'ssl-checker';
import * as whoiser from 'whoiser';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Helper to extract domain from URL
const getDomain = (url) => {
    try {
        const hostname = new URL(url).hostname;
        return hostname;
    } catch (error) {
        return null;
    }
};

export const analyzeWebsite = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const domain = getDomain(url);
    if (!domain) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    let results = {
        score: 0,
        status: 'Unknown',
        reasons: [],
        details: {}
    };

    try {
        // 1. SSL Check
        try {
            const sslDetails = await sslChecker(domain);
            results.details.ssl = sslDetails;
            if (sslDetails.valid) {
                results.score += 30;
                results.reasons.push('Valid SSL Certificate detected');
            } else {
                results.reasons.push('SSL Certificate is invalid or missing');
            }
        } catch (err) {
            results.reasons.push('Process failed: SSL Check');
        }

        // 2. Domain Age / Whois
        try {
            const whoisData = await whoiser.whoisDomain(domain);
            // Whoiser returns data keyed by registrar, need to find the first valid entry with created date
            let createdDate = null;
            let registrarName = null;

            for (const key in whoisData) {
                const record = whoisData[key];
                if (record['Created Date'] || record['Creation Date']) {
                    createdDate = record['Created Date'] || record['Creation Date'];
                    registrarName = record['Registrar'];
                    break;
                }
            }

            if (createdDate) {
                const created = new Date(createdDate);
                const copyAge = new Date();
                const ageInDays = (copyAge - created) / (1000 * 60 * 60 * 24);

                // Format age string (e.g., "5.2 years")
                const ageInYears = (ageInDays / 365).toFixed(1);
                results.details.age = `${ageInYears} years`;

                if (ageInDays > 365) {
                    results.score += 20;
                    results.reasons.push('Domain is established (> 1 year)');
                } else if (ageInDays < 30) {
                    results.reasons.push('Domain is very new (< 30 days)');
                    results.score -= 20; // Stricter penalty
                } else {
                    results.score += 10;
                    results.reasons.push('Domain age is moderate');
                }
                // Bonus for very old domains
                if (ageInDays > 1825) { // 5 years
                    results.score += 10;
                    results.reasons.push('High Trust: Domain > 5 years old');
                }

            } else {
                results.reasons.push('Could not verify domain age');
            }
        } catch (err) {
            console.error("Whois error", err);
            results.reasons.push('Process failed: Domain Age Check');
        }

        // 3. Content & Header Check
        try {
            const response = await axios.get(url, {
                timeout: 5000,
                validateStatus: () => true
            });

            if (response.status === 200) {
                results.score += 10;
                results.reasons.push('Website is accessible (HTTP 200)');
            } else {
                results.reasons.push(`Website returned status ${response.status}`);
            }

            // Basic Content Analysis
            const $ = cheerio.load(response.data);
            const title = $('title').text();
            results.details.title = title;

            const suspiciousKeywords = ['login', 'verify', 'update', 'banking', 'secure'];
            const bodyText = $('body').text().toLowerCase();

            let foundSuspicious = false;
            suspiciousKeywords.forEach(word => {
                if (bodyText.includes(word)) foundSuspicious = true;
            });

            if (foundSuspicious) {
                // Not necessarily bad, but combined with other factors it could be.
                // For now, let's just note it.
                results.reasons.push('Contains sensitive keywords (login, bank, etc.)');
            }

        } catch (err) {
            results.reasons.push('Website could not be reached');
        }

        // 4. URL Heuristics (Client-side logic moved here)
        if (url.length > 50) {
            results.reasons.push('URL is unusually long');
        } else {
            results.score += 10;
            results.reasons.push('URL length is normal');
        }

        // Normalize Score
        if (results.score > 100) results.score = 100;
        if (results.score < 0) results.score = 0;

        // Determine Status
        if (results.score >= 70) results.status = 'Safe';
        else if (results.score >= 40) results.status = 'Suspicious';
        else results.status = 'Dangerous';

        res.json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Analysis failed' });
    }
};
