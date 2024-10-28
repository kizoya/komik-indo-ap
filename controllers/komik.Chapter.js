const express = require('express');
const cheerio = require('cheerio');
const { Fetcheader } = require('../helpers/HttpClient');
const { sendResponse } = require('../helpers/ResponseHandler');
const router = express.Router();
const { komik } = require('../helpers/baseURL');

router.get('/:endpoint', async (req, res) => {
   const { endpoint } = req.params;
   const url = `${komik}/${endpoint}`;

   try {
      const data = await Fetcheader(url);
      const $ = cheerio.load(data);
      const results = {};
      $(`a[href^="${komik}"]`).each((_, el) => {
         const href = $(el).attr('href');
         $(el).attr('href', href.replace(komik, ''));
      });
      const id = $('article').attr('id').replace('post-', '') || 'No ID';
      results.id = id;
      results.title = $('.entry-title').text().trim() || 'No Title';
      results.navigation = {
         prev: $('a[rel="prev"]').attr('href') || null,
         next: $('a[rel="next"]').attr('href') || null
      };
      results.allch = $('a:contains("Daftar Chapter")').attr('href') || null;
      results.images = [];
      $('.chapter-image img').each((index, el) => {
         const imgSrc = $(el).attr('src');
         if (imgSrc) {
            results.images.push({ id: index + 1, src: imgSrc });
         }
      });
      const thumbnailSrc = $('div.thumb img').attr('src');
        if (thumbnailSrc) {
            results.thumbnail = {
                src: thumbnailSrc,
                title: $('div.thumb img').attr('title') || 'No Title'
            };
        }

      results.komik = {
         title: $('.infox h2').text().trim() || 'No Title',
         description: $('.shortcsc').text().trim() || 'No Description',
         chapter: []
      };

      $('#chapter_list .lchx a').each((_, el) => {
         const chapter_title = $(el).text().trim();
         const chapter_link = $(el).attr('href') || '';
         results.komik.chapter.push({ chapter_title, chapter_link });
      });

      sendResponse(res, true, { results }, 'successfully');
   } catch (error) {
      console.error('Oh no!:', error);
      sendResponse(res, false, { results: null }, 'Oh no! Nande?: ' + error.message);
   }
});

module.exports = router;
