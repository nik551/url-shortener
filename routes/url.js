const express = require('express');
const { handleGenerateNewShortURL,handleExpandedURL,handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/",handleGenerateNewShortURL);
router.get('/:shortId',handleExpandedURL);
router.get("/analytics/:shortId",handleGetAnalytics)


module.exports = router;


