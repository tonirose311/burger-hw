const path = require('path');
const PORT = process.env.PORT || 3000;

const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

const Router = require('./controllers/burgers_controller');
const router = new Router(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'))); 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

router.start();

app.listen(PORT, () => {
  console.log('Server started listening on port ' + PORT);
});