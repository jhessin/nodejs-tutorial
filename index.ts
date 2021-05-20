import http from "http";

function serverCallback(req: http.RequestOptions, res: http.ServerResponse) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("");
}

http.createServer(serverCallback).listen(8080);
