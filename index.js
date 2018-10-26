const express = require('express');
const bodyParser = require('body-parser'); // module and middleware
const shopRouter = require('./server/routes/shopsRouter');
const indexRouter = require('./server/routes/indexRouter');
const path = require('path');
const morgan = require('morgan');
const app = express();
const PORT = 3300;

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');
app.use('/vue', express.static(__dirname + '/node_modules/vue'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })); // process
app.use(bodyParser.json()); // process json request

// example of middleware
app.use((req, res, next) => {
    console.log('Global middleware here.');
    req.viewModel = {
        title: 'UnionShop'
    };
    next();
});

app.use('/', indexRouter);
app.use('/shops', (req, res, next) => {
    console.log('Middleware only');
    next();
}, shopRouter);

app.get('/vue', (req, res) => {
    res.render('vuePage', {});
});

app.listen(PORT, (err) => { // arrow function feature from ES6
    if(err){ console.log(err); }
    console.log(`Listening to port ${PORT}!`);
});

