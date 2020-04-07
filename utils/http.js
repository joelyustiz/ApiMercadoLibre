const https = require('https');

function HttpRequest(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, resp => {
        let data = '';
        console.log("http prueba")
        resp.on('data', chunk => {
          data += chunk;
          console.log("http data")
        });

        resp.on('end', () => {
            resolve(data)
            console.log("http end")
          //console.log(JSON.parse(data).explanation);
        });
      })
      .on('error', err => {
        reject(err)
        console.log('Error: ' + err.message);
      });
  });
}

module.exports = HttpRequest
