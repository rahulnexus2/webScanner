import * as whoiser from 'whoiser';

(async () => {
    try {
        console.log('Whoiser exports:', whoiser);
        if (whoiser.whoisDomain) {
            const domain = 'google.com';
            console.log(`Scanning ${domain}...`);
            const whoisData = await whoiser.whoisDomain(domain);
            console.log(JSON.stringify(whoisData, null, 2));
        } else {
            console.error('whoisDomain function not found');
        }
    } catch (err) {
        console.error("Error:", err);
    }
})();
