const express = require('express');
const cheerio = require('cheerio');
const { Fetcheader } = require('../helpers/HttpClient');
const { sendResponse } = require('../helpers/ResponseHandler');
const router = express.Router();
const { komik } = require('../helpers/baseURL');

router.get('/page/:pages?', async (req, res) => {
   const pages = req.params.pages || 1;
   const url = `${komik}/komik-terbaru/page/${pages}/`;

   try {
      const data = await Fetcheader(url);
      const $ = cheerio.load(data);
      const results = [];
      const komik_populer = [];
      $(`a[href^="${komik}"]`).each((_, el) => {
         const href = $(el).attr('href');
         $(el).attr('href', href.replace(komik, ''));
      });

      $('.animepost').each((_, el) => {
         const title = $(el).find('.tt h4').text().trim() || 'No Title';
         const link = $(el).find('a[rel="bookmark"]').attr('href') || '';
         const image = $(el).find('img[itemprop="image"]').attr('src') || '';
         const type = $(el).find('.typeflag').attr('class').split(' ').pop() || 'No type';
         const color = $(el).find('.warnalabel').text().trim() || 'Hytam putih';

         const chapter = [];
         $(el).find('.lsch').each((_, chapterEl) => {
            const ch_title = $(chapterEl).find('a').text().trim().replace(/Ch\./i, 'Chapter') || 'Untitled Chapter';
            const ch_link = $(chapterEl).find('a').attr('href') || '';
            const ch_Date = $(chapterEl).find('span.datech').text().trim() || 'No Date';
        chapter.push({ ch_title, ch_link, ch_Date });
    });

         results.push({
            title,
            link,
            image,
            type,
            color,
            chapter,
         });
      });
      $('.serieslist.pop li').each((_, el) => {
         const rank = $(el).find('.ctr').text().trim() || 'No rank';
         const title = $(el).find('h4 a').text().trim() || 'No Title';
         const link = $(el).find('h4 a').attr('href') || '';
         const image = $(el).find('.imgseries img').attr('src') || '';
         const author = $(el).find('.author').text().trim() || 'Unknown author';
         const rating = $(el).find('.loveviews').text().trim().split(' ').pop() || 'No rating';

         komik_populer.push({
            title,
            link,
            rank,
            author,
            rating,
            image
         });
      });

      const totalPages = parseInt($('.pagination a.page-numbers').eq(-2).text().trim()) || 1;
      sendResponse(res, true, { totalPages, results, komik_populer }, 'successfully');
   } catch (error) {
      console.error('Oh no!:', error);
      sendResponse(res, false, null, 'Oh no! Nande?: ' + error.message);
   }
});

module.exports = router;
