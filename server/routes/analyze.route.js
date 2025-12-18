import express from "express";
import { getDomainAge } from "../services/whois.service.js";
import { checkSSL } from "../services/ssl.service.js";
import { analyzeUrl } from "../services/urlAnalysis.service.js";
import { calculateScore } from "../utils/scoreEngine.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { url } = req.body;
  const domain = new URL(url).hostname;

  const age = await getDomainAge(domain);
  const ssl = await checkSSL(domain);
  const urlData = analyzeUrl(url);

  const score = calculateScore({ age, ssl, urlData });

  res.json({
    score,
    technical: { age, ssl },
    urlAnalysis: urlData,
  });
});

export default router;
