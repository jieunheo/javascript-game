const axios = require('axios');
const cheerio = require('cheerio');

const static = require('serve-static');
const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const port = 3000;

app.set('port', port);
app.use('/', static(path.join(__dirname, 'public')));

const router = express.Router();
router.route('/movie').get(function(req, res) {
  movieFetch();
});

app.use('/', router);

var client_id = 'wYTTlyY2DCVAjYliB7ma';
var client_secret = 'rDN3LeHPWb';
app.get('/search/movie', function (req, res) {
  const query = encodeURI(req.query.query) || '1';
  var api_url = 'https://openapi.naver.com/v1/search/movie.json?query=' + query; // json 결과
  var request = require('request');
  var options = {
    url: api_url,
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const movies = JSON.parse(body).items;
      
      let html = '';
      movies.forEach(movie => {
        const title = movie.title;
        const link = movie.link;
        const image = movie.image;
        const subtitle = movie.subtitle;
        const pubDate = movie.pubDate;

        html +=`
          <li class="movie">
            <a href='${link}'>
              <img src='${image}' alt='${title}' />
            </a>
            <p class='title'>${title}<span>${subtitle}<span><p>
            <p class="date">${pubDate}</p>

          </li>
        `;
      });
      res.writeHead(200, {'Content-Type': 'text/html;text/css;charset=utf-8'});
      res.write(`<link rel="stylesheet" href="/style.css">`);
      res.write(`<div class="container" id="container">`);
      res.write(`<header class="header"><h1>${req.query.query}</h1></header>`);
      res.write(`<main class="main">`);
      res.write('<a href="/index.html">메인화면으로</a>');
      res.write('<ul class="movieList">');
      res.write(html);
      res.write('</ul>');
      res.write(`</main>`);
      res.write('</div>');
      res.end();
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
 });

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!');
});