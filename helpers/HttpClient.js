const axios = require('axios');

const Fetcheader = async (url) => {
    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Gecko/20100101 Firefox/83.0',
            'Origin': url,
            'Referer': url,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,id-ID;q=0.5',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'cf_clearance=4FNDJ6cC.Dv04KAmXwRN8mh9fQiC7_O1G1BJJ7MrdGg-1732076502-1.2.1.1-XRDW0wXrCrEIw.hwfTTXEV.dwyotqhqiXo5y7choOFBZ_ywic1ghL871otLKeKv7YYdOOkgDlXwPtohQ5oq7VZL4sSC8RX6z.h4OX5Oc7JIehu6KRNhBjl56oUwj.d8jMSivxRR0GAwEx27tyYuY7Km8EN3ir32PdVZeIwC7h6hQm5eCJUVVjEEhFAGD5OdoL0E25l1gp7rBvuKyNzzQeQc30wL56zB1g0QTr_OKk4bZBOM.5SZa93XkNHBJg3D01fqkrkQK33eDFPop4cAcMLZQbPBdcUtartThgo5XzmSE5sy0X1EBQt.tQOaDWdUxhgF7LCnT.k0Q_zsQ.TbrCneyLt_8EY8NYo4WsI0N7Zn40oDyd_9ia48Xr29BpkdL; _ga_HDYL70GFQ8=GS1.1.1732076499.1.0.1732076499.0.0.0; _ga=GA1.2.1674173917.1732076499; _gid=GA1.2.1099761756.1732076500; _gat_gtag_UA_150447198_8=1'
        }
    });

    return data;
};

module.exports = { Fetcheader };
