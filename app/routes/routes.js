/**
 * Created by fzlrhmn on 11/26/16.
 */
let express     = require('express');
let router      = express.Router();

router.route('/report')
    .get((req,res) => {
        res.status(200).json({ message: "hello world"})
    })
    .post((req,res) => {

    });

module.exports = router;