const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is req" });
  console.log(body.url);
  const shortID = shortid.generate();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  const allUrls = await URL.find({});
  return res.render("home", {
    id: shortID,
    urls: allUrls,
  });
}

async function handleExpandedURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (result === null) {
    return res.status(404).json({ status: "Not found" });
  }
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleExpandedURL,
  handleGetAnalytics,
};
