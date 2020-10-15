const express = require('express');
const app = express();
var path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')))




// defining routes
const flyersRoutes = require('./routes/api-route')
app.use('/api/flyers', flyersRoutes);

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
})



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;