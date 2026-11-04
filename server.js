const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",'Content-Type');
    res.header("Access-Control-Allow-Methods", ['GET', 'PUT', 'POST']);
    next();
});

app.use(require('./routes/index'));

if (require.main === module) {
    app.listen(3000, () => console.log('listening on port 3000'));
}

module.exports = app;
