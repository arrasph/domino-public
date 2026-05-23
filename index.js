const http = require('http');

let intervalId;

function sendRequest() {
  fetch("http://shimage.net/domino/domino.php", {
    "headers": {
      "accept": "*/*",
      "accept-language": "ja,en-US;q=0.9,en;q=0.8",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "PHPSESSID=1ojhhi9fvbmbqujsvg1hkosbe6",
      "Referer": "http://shimage.net/domino/"
    },
    "body": "action=countup&trialcount=2592",
    "method": "POST"
  })
  .then(response => {
    console.log(`[${new Date().toLocaleTimeString()}] POST Status:`, response.status);
    
    // Stop setInterval if status is 403
    if (response.status === 403) {
      console.log("403 Forbidden received. Stopping requests.");
      clearInterval(intervalId);
    }
  })
  .catch(error => {
    console.error("POST Error:", error);
  });
}

intervalId = setInterval(sendRequest, 1000);

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.statusCode = 204; // No Content
    res.end();
    return;
  }

  console.log(`[${new Date().toLocaleTimeString()}] 新規アクセス: ${req.url}`);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Hello World!\n');
});

server.listen(port, () => {
  console.log(`ポート ${port} で起動しました。`);
});
