const express = require('express');
const app = express();

const hbs = require('express-handlebars');

app.engine( 'handlebars', hbs() ); /* {
    extname: '.handlebars',
    defaultView: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
  }));*/
app.set('view engine','handlebars');
const bodyparser = require('body-parser');
const validate = require('express-validation');
const postvalidation = require('./validations');

const LPORT = 3000;
const router = express.Router();
app.use((req,res,next) => {
    console.log("Server started")
    next();
});
app.use(bodyparser.urlencoded({
    extended :true
}));
app.use(bodyparser.json());
app.use('/',router);



router.get('/', function (req,res) {
    console.log('received at /');
    res.render('index', {
	    pageTitle: "Welcome to handlebars demo!"
    });
    // res.send(`
    //     <form action="/data" method="post">
    //     <table border="0">
    //         <tr><td>Name:</td><td><input type="text" name="name"></td></tr>
    //         <tr><td>Age:</td><td><input type="text" name="age"></td></tr>
    //         <tr><td><input type="submit" name="submit" /></td><td><input type="reset" name="reset" /></td></tr>
            
    //     </table>

    //     </form>
    // `);
    //res.end();
});

app.use((err,req,res,next)=> {
    if (err instanceof validate.ValidationError) {
        res.status(err.status).send(err);
    }
    //next();
});
router.route('/data').post(validate(postvalidation),(req,res) => {
    console.log('received at /data');
    console.log(req.body);
    res.send(req.body);
});

router.route('/update').get((req,res) => {
    res.send('Need a put request to /update, this was get');
    res.send(req.body);
});

router.route('/update').put((req,res) => {
    console.log('received at /update');
    console.log(req.body);
    res.send(req.body);
});
app.listen(LPORT, () => {
    console.log('Server started at %d',LPORT);
});
module.exports = app;
