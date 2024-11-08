const axios = require('axios');
const Fetcheader = async (url) => {
    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Gecko/20100101 Firefox/83.0',
            'Origin': url,
            'Referer': url,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',  // Menentukan tipe konten yang diterima
            'Accept-Encoding': 'gzip, deflate, br, zstd',  // Menentukan jenis encoding yang diterima
            'Accept-Language': 'id-ID'
        }
    });

    return data;
};

module.exports = { Fetcheader };
