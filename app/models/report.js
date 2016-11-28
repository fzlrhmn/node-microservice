/**
 * Created by fzlrhmn on 11/26/16.
 */

let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

let reportSchema = new Schema({
    title: String,
    description: String,
    created_date: Date,
    latitude: Number,
    longitude: Number,
    status_log: [{status:String, timestamp: Date}]
});

let report = mongoose.model('report', reportSchema);

module.exports = report;