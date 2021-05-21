/** @format */

import fs from 'fs';

export default function updateLogFile(message: string) {
  fs.readFile(
    './log.txt',
    {
      flag: 'as+',
    },
    function (err, logContent) {
      if (err) throw err;

      let log = logContent.toString();

      if (log.length === 0) {
        // first read rule
        fs.writeFile('./log.txt', `Number of Accesses: 1\n${message}`, err => {
          if (err) throw err;
        });
        return;
      }

      // otherwise read and modify current log
      let lines = log.split('\n');

      lines[0] = `Number of Accesses: ${lines.length}`;
      lines.push(`${message}`);
      fs.writeFile('./log.txt', lines.join('\n'), err => {
        if (err) throw err;
      });
    },
  );
}
