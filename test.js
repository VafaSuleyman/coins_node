const https = require('https');

https.get('http://localhost:3002/coins', (resp) => {
  let data = '';

  // veri geldikçe parça parça işleyelim
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // tüm veri geldikten sonra işleme başlayalım
  resp.on('end', () => {
    console.log(JSON.parse(data));
  });

}).on('error', (err) => {
  console.log('Hata: ' + err.message);
});