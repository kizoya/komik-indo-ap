const RequestLimit = require('./middleware/rateLimit');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.set('trust proxy', 1);
app.use(cors());
////////////[Import controller]////////////
const KomikOngoing = require('./controllers/komik.Ongoing');
const komikDetail = require('./controllers/komik.Detail');
const komikChapter = require('./controllers/komik.Chapter');
const komikSearch = require('./controllers/komik.Search');
const komikLibrary = require('./controllers/komik.Library');
const komikGenre = require('.controllers/komik.Genre');

////////////[    End import   ]////////////
////////////////////////////////////
///////////[Start routes]///////////
app.use('/komik/latest', RequestLimit, KomikOngoing);
app.use('/komik/detail', RequestLimit, komikDetail);
app.use('/komik/chapter', RequestLimit, komikChapter);
app.use('/komik/search', RequestLimit, komikSearch);
app.use('komik/genre', RequestLimit, komikGenre);
app.use('/komik/library', RequestLimit, komikLibrary)

////////////[End routes]////////////
app.get('/', (req, res) => {
   res.render('index');
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
   console.log(`Server berjalan di port ${port}`);
});
// Proxy image 
app.get("/img", async (r, e, a) => { let t = r.query.url; if (!t) return a(Error("URL parameter is required")); try { let i = await axios({ url: t, responseType: "stream" }); i.data.pipe(e) } catch (p) { a(Error("Error!")) } });
// rada ribet cuy karena pake ai:v
