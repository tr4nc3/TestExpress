const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// Register Handlebars view engine
app.engine('handlebars', exphbs());
// Use Handlebars view engine
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Example app is running → PORT 3000');
});
