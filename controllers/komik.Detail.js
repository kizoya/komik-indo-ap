const express = require('express');
const cheerio = require('cheerio');
const { Fetcheader } = require('../helpers/HttpClient');
const { sendResponse } = require('../helpers/ResponseHandler');
const router = express.Router();
const { komik } = require('../helpers/baseURL');

router.get('/:endpoint', async (req, res) => {
    const { endpoint } = req.params;
    const url = `${komik}/komik/${endpoint}`;

    try {
        const data = await Fetcheader(url);
        const $ = cheerio.load(data);
        $(`a[href^="${komik}"]`).each((_, el) => {
            const href = $(el).attr('href');
            $(el).attr('href', href.replace(komik, ''));
        });

        const title = $('h1.entry-title').text().trim();
        const description = $('.entry-content.entry-content-single[itemprop="description"] p').text().replace(/\s+/g, ' ').trim();

        const detail = {};
        $('.spe span').each((_, el) => {
            const key = $(el).find('b').text().replace(':', '').trim();
            const value = $(el).text().replace(`${key}:`, '').trim().replace(/\s+/g, ' ');
            detail[key] = value;
        });

        const image = $('.thumb img').attr('src') || '';
        const rating = $('.rtg i[itemprop="ratingValue"]').text().trim() || 'No rating';
        const votes = $('.votescount').text().trim() || 'No votes';
        
        const chapters = [];
        $('.listeps ul li').each((_, el) => {
            const chapter_title = $(el).find('.lchx a').text().trim();
            const chapter_link = $(el).find('.lchx a').attr('href');
            const release_time = $(el).find('.dt a').text().trim();
            chapters.push({ chapter_title, chapter_link, release_time });
        });

        let chapter_awal = null;
        let chapter_terbaru = null;
        const epsbrDivs = $('.epsbr');
        if (epsbrDivs.length >= 2) {
            chapter_awal = {
                chapter_title: $(epsbrDivs[0]).find('a').text().trim(),
                chapter_link: $(epsbrDivs[0]).find('a').attr('href')
            };
            chapter_terbaru = {
                chapter_title: $(epsbrDivs[1]).find('a').text().trim(),
                chapter_link: $(epsbrDivs[1]).find('a').attr('href')
            };
        }

        const similarManga = [];
        $('.serieslist ul li').each((_, el) => {
            const title = $(el).find('.leftseries h4 a').text().trim();
            const link = $(el).find('.leftseries h4 a').attr('href');
            const img = $(el).find('.imgseries a img').attr('src');
            const description = $(el).find('.excerptmirip').text().trim();
            similarManga.push({ title, link, img, description });
        });

        const spoilerImage = [];
        $('#spoiler .spoiler-img img').each((_, el) => {
            const src = $(el).attr('src');
            spoilerImage.push(src);
        });

        const id = $('article').attr('id').replace('post-', '');
        const genres = [];
        $('.genre-info a').each((_, el) => {
            const genre = $(el).text().trim();
            const link = $(el).attr('href');
            genres.push({ genre, link });
        });
        const results = {
            id,
            title,
            image,
            rating,
            votes,
            detail,
            genres,
            description,
            chapter_awal,
            chapter_terbaru,
            chapters,
            similarManga,
            spoilerImage
        };

        sendResponse(res, true, { results }, 'successfully');
    } catch (error) {
        console.error('error:', error);
        sendResponse(res, false, null, 'Oh no! Nande?: ' + error.message);
    }
});

module.exports = router;
