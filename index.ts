/** @format */

import http from 'http';
import moment from 'moment';

const greeting = 'Zenva';
function serverCallback(_req: http.RequestOptions, res: http.ServerResponse) {
  const now = moment();
  //const open = moment().hour(10).minute(0).second(0);
  const open = moment('10', 'HH');
  //const close = moment().hour(12).minute(0).second(0);
  const close = moment('12', 'HH');
  console.log(now.format());
  console.log(`
    now: ${now.format()}
    open: ${open.format()}
    close: ${close.format()}
    `);
  let msg = '';
  if (now.isBetween(open, close)) {
    msg = 'We are now open!';
  } else if (now.isBefore(open)) {
    msg = `Our business hours are from ${open.format(
      'HH:mm',
    )} to ${close.format('HH:mm')}
    come back ${now.to(open)}.`;
  } else {
    msg = `Our business hours are from ${open.format(
      'HH:mm',
    )} to ${close.format('HH:mm')}
    come back tomorrow.`;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`
    Hello ${greeting}!
    Welcome to our page.
    Now, it is ${now.format('h:mm a')}
    ${msg}
    `);
}

http.createServer(serverCallback).listen(8080);
