const axios = require('axios');
const Fetcheader = async (url) => {
    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Gecko/20100101 Firefox/83.0',
            'Origin': url,
            'Referer': url,
            'Accept-Language: en-US,en;q=0.9'
        }
    });

    return data;
};

module.exports = { Fetcheader };
