let express     = require('express');
let app         = express();
let bodyParser  = require('body-parser');
let mongoose    = require('mongoose');
let router      = express.Router();
let report      = require('./app/controllers/reportController');
let port = process.env.PORT || 5000;

mongoose.connect('mongodb://188.166.246.129:27017/express-api-mongodb');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
router.route('/report')
    .get(report.get)
    .post(report.post);

router.route('/report/:id')
    .get(report.getById);

app.use('/api', router);
app.listen(port);
console.log("app started at port " + port);
