/** @format */

//res.write('<a href="/csv">CSV Data<a><br>');
//res.end('<a href="json">JSON Data</a><br>');

export default function toHTML(
  html: string,
  data: any[],
  inputType: 'json' | 'csv' = 'json',
) {
  const body_start = html.indexOf('<body>');
  const body_end = html.indexOf('</body>');

  let start = html.slice(0, body_start + 6);
  const end = html.slice(body_end);

  // add link to other data type
  switch (inputType) {
    case 'csv':
      start += '<a href="../json">JSON Data</a><br>';
      break;
    case 'json':
      start += '<a href="../csv">CSV Data</a><br>';
  }

  let table = '<table><thead><tr>\n';
  if (inputType === 'csv') {
    data[0].forEach(function (item: string) {
      table += `<th> ${item} </th>\n`;
    });
  } else {
    for (const [key, value] of Object.entries(data[0])) {
      if (typeof value !== 'object') {
        table += `<th> ${key} </th>\n`;
      }
    }
  }

  table += '</tr></thead>\n';

  if (inputType === 'csv') {
    data = data.slice(1);
  }
  data.forEach(function (obj) {
    table += '<tr>\n';

    for (const [_, value] of Object.entries(obj)) {
      if (typeof value !== 'object') {
        table += `<td> ${value} </td>\n`;
      }
    }

    table += '</tr>\n';
  });

  table += '</table>';

  return `${start}\n${table}\n${end}`;
}
