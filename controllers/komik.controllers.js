const express = require('express');
const cheerio = require('cheerio');
const { fetchDataWithHeaders } = require('../helpers/HttpClient');
const { sendResponse } = require('../helpers/ResponseHandler');
const router = express.Router();
const { komik } = require('../helpers/baseURL');

router.get('/', async (req, res) => {
  const url = `${komik}/`;
  
  try {
    const data = await fetchDataWithHeaders(url);
    const $ = cheerio.load(data);

    const results = [];

    $('.animepost').each((_, el) => {
      const title = $(el).find('.tt h4').text().trim();
      const link = $(el).find('a[rel="bookmark"]').attr('href');
      const image = $(el).find('.limietles img').attr('src');
      const rating = $(el).find('.fa-star').parent().text().trim();
      const type = $(el).find('.typeflag').text().trim();
      const views = $(el).find('.fa-eye').parent().text().trim();
      const color = $(el).find('.fa-palette').parent().text().trim();
      const status = $(el).find('.status-skroep').text().trim();

      const chapters = [];
      $(el).find('.lsch a').each((_, chapterEl) => {
        const chapterTitle = $(chapterEl).text().trim();
        const chapterLink = $(chapterEl).attr('href');
        chapters.push({ chapterTitle, chapterLink });
      });

      results.push({
        title,
        link,
        image,
        rating,
        type,
        views,
        color,
        status,
        chapters 
      });
    });

    sendResponse(res, true, { results }, 'Yay, daijoubu!.');
  } catch (error) {
    console.error('Oh no! Nande?:', error);
    sendResponse(res, false, null, ' Oh no! Nande?: ' + error.message);
  }
});

module.exports = router;
