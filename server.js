//Week 1 app by Amol Venkataraman <abbunini@gmail.com>
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('sync-request');


var app = express();
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


//Create a HTML template for /authors
function createTemplate (data)  {
    var htmlTemplate = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Authors</title>
        </head>
        <body>
            ${data}
        </body>
    </html>
    `;
    return htmlTemplate;
}

//Task 1 (/)
app.get('/', function (req, res) {
  res.send("Hello World - Amol");
});

//Task 2 (/authors)
app.get('/authors', function(req, res) {
  var urls = ["https://jsonplaceholder.typicode.com/users", "https://jsonplaceholder.typicode.com/posts"];
  var res1 = request('GET', urls[0]);
  var res2 = request('GET', urls[1]);
  var users = JSON.parse(res1.body);
  var posts = JSON.parse(res2.body);
  ans = ['Author Name'  + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'No of Articles'];
  ans.push("&nbsp ")
  for (var i = 0; i < users.length; i++) {
    var nart = 0;
    for (var j = 0; j < posts.length;j++) {
      if (users[i]['id'] === posts[j]['userId']) {
        nart = nart + 1;
      }
    }
    var lname = users[i]['name'].length
    lnam = 28-lname
    ans.push(users[i]['name']+ "&nbsp ".repeat(lnam) + nart )
  }
  var ans1 = ans.join();
  var ans2 = JSON.stringify(ans1).split(',').join("<br />")
  ans3 = ans2.replace(/\"/g, "");
  res.send(createTemplate(ans3));
});

//Task 3 (/setcookie)
app.get('/setcookie', function (req, res) {
  res.cookie('Acookie', 'name = Amol, age = 13').send('Cookie is set');
});

//Task 4 (/getcookie)
app.get('/getcookie', function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(
    "Cookie is: " + req.cookies['Acookie'].toString());
});

//Task 5 (/robots.txt)
app.get('/robots.txt', function (req, res) {
  res.redirect('http://httpbin.org/deny');
});

//Task 6 (/image)
//The image was created by my brother Bala in Inkscape.
app.get('/image', function (req, res) {
  res.sendFile(path.join(__dirname, 'Images', 'scenery.svg'));
});

//Task 7 (/input)
app.get('/input', function (req, res) {
  res.sendFile(path.join(__dirname, 'HTML', 'textbox.html'));
});
//Also Task 7 (Shows the contents of the textbox)
app.post('/answer', function(req, res) {
    res.send('Text Entered: ' + JSON.stringify(req.body.usertext));
    console.log(JSON.stringify(req.body.usertext))
});

var port = 8080;
app.listen(port, function () {
  console.log(`Week 1 app listening on port ${port}!`);
});
