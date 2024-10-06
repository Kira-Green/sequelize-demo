const express = require('express');
const _handlebars = require('handlebars');
const exprhbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./config/database');


     db.authenticate()
     .then(() => console.log('Connection has been established successfully.') )
    .catch(err => console.error('Unable to connect to the database:', err))
 

const app = express();

app.engine('handlebars', exprhbs.engine({defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(_handlebars)
}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('index', {layout: 'landing'}));
app.use('/gigs', require('./routes/gigs'))

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server started on port ${port}`));