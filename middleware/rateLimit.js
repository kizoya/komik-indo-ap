const rateLimit = require('express-rate-limit');
const RequestLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 500, // maksimal 500 request per 15 menit
  message: { status: false, message: "Oh no! permintaan sudah mencapai limit!" }
});

module.exports = RequestLimit;
