/** @format */

import http from 'http';
import request from 'request';
import fs from 'fs';
import parse from 'csv-parse';
import url from 'url';
import toHTML from './toHtml';
import updateLog from './updateLog';

let json_body: any;
let csv_body: any;
let html: string;

setInterval(() => {
  request(
    'https://www.bnefoodtrucks.com.au/api/1/trucks',
    function (_err, _res, body) {
      //json_body = toHTML(JSON.parse(body));
      json_body = JSON.parse(body);
    },
  );
}, 2000);

setInterval(() => {
  request(
    'https://www.data.brisbane.qld.gov.au/data/dataset/404d9718-33c2-4ec2-8a8f-ed0195a151d0/resource/4a67a16d-ffc7-4831-a77b-64d8ac42459e/download/cbd-bike-racks-2021-04-08.csv',
    function (_err, _res, data) {
      parse(data, function (_err: any, data: any) {
        //csv_body = toHTML(data, 'csv');
        csv_body = data;
      });
    },
  );
}, 2000);

http
  .createServer(function (req, res) {
    let reqUrl = url.parse(req.url);
    switch (reqUrl.path) {
      case '/json':
        if (json_body && html) {
          updateLog('Accessed JSON data');
          res.writeHead(200, {
            'Content-Type': 'text/html',
          });
          res.end(toHTML(html, json_body, 'json'));
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/plain',
          });
          res.end('Nothing retrieved yet');
        }
        break;
      case '/csv':
        if (csv_body && html) {
          updateLog('Accessed CSV data');
          res.writeHead(200, {
            'Content-Type': 'text/html',
          });
          res.end(toHTML(html, csv_body, 'csv'));
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/plain',
          });
          res.end('Nothing retrieved yet');
        }
        break;
      default:
        res.writeHead(200, {
          'Content-Type': 'text/html',
        });
        res.write('<a href="/csv">CSV Data<a><br>');
        res.end('<a href="json">JSON Data</a><br>');
    }
  })
  .listen(8080);

fs.readFile('./index.html', function (err, data) {
  if (err) {
    throw err;
  }

  html = data.toString();
});
