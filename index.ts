/** @format */

import http from 'http';
import request from 'request';

let request_body: any;

function objToHTML(data: {}) {
  let html = '';
  for (const [key, value] of Object.entries(data)) {
    html += `<td> ${key} </td>\n`;
    if (Array.isArray(value)) {
      html += `<td> ${arrToHTML(value)} </td>`;
    } else if (typeof value === 'object') {
      html += `<td> ${objToHTML(value)} </td>\n`;
    } else {
      html += `<td> ${value} </td>\n`;
    }
  }
  return html;
}

function arrToHTML(data: any[]) {
  let html = '';
  data.forEach(function (element) {
    if (Array.isArray(element)) {
      html += `<tr> ${arrToHTML(element)} </tr>\n`;
    } else if (typeof element === 'object') {
      html += `<tr> ${objToHTML(element)} </tr>\n`;
    } else {
      html += `<tr><td> ${element} </td></tr>\n`;
    }
  });

  return html;
}

function toHTML(data: any) {
  // Initialize the html sttring
  let html = `
  <html>
  <head>
  <title>Data aggregator</title>
  </head>
  <body>
  <table>
  `;

  // test the type of data (Array or object)
  if (Array.isArray(data)) {
    html += `<tr> ${arrToHTML(data)} </tr>\n`;
  } else if (typeof data === 'object') {
    html += `<tr> ${objToHTML(data)} </tr>\n`;
  } else {
    html += `<tr><td> ${data} </td></tr>\n`;
  }

  // Close html
  html += `</table></body></html>`;
  return html;
}

request(
  'https://www.bnefoodtrucks.com.au/api/1/trucks',
  function (_err, _res, body) {
    request_body = JSON.parse(body);
    //console.log(toHTML(body));
  },
);

http
  .createServer(function (_req, res) {
    if (request_body) {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      res.end(toHTML(request_body));
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.end('Nothing retrieved yet');
    }
  })
  .listen(8080);
