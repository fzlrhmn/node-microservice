/**
 * Created by fzlrhmn on 11/26/16.
 */

let ReportModel = require('../models/report');
let moment      = require('moment');

moment().format();
moment.locale('id');

let report = {
    post: (req,res) => {
        let newReport = new ReportModel();
        let date = new Date();

        newReport.title         = req.body.title;
        newReport.description   = req.body.description;
        newReport.created_date  = date;
        newReport.latitude      = req.body.latitude;
        newReport.longitude     = req.body.longitude;
        newReport.status_log    = [{status: "wait", timestamp: date}];

        let newReportPromise = newReport.save();
        newReportPromise
            .then((doc) => {
                res.status(200)
                    .json(doc)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    get: (req,res) => {
        ReportModel.find({}, (error, reports) => {
            if (error) {
                res.status(400).send(error)
            }else{

                let reportResponse = reports.map(item => {
                    let date = moment(item.created_date);

                    let status = item.status_log.map(itemStatus => {
                        let dateStatus = moment(itemStatus.timestamp);

                        return {
                            status: itemStatus.status,
                            timestamp: dateStatus.format("Do MMMM YYYY HH:mm:ss")
                        }
                    });

                    return {
                        id: item._id,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        title: item.title,
                        description: item.description,
                        timestamp: date.format("Do MMMM YYYY HH:mm:ss"),
                        status: status
                    }
                });

                res.status(200).json({count: reportResponse.length, data : reportResponse});
            }
        })
    },
    getById: (req,res) => {
        ReportModel.findById(req.params.id)
            .then(results => {
                let date = moment(results.created_date);

                let response = {
                    title: results.title,
                    description: results.description,
                    latitude: results.latitude,
                    longitude: results.longitude,
                    timestamp: date.format("Do MMMM YYYY HH:mm:ss")
                };

                res.status(200).json(response)
            })
            .catch(error => {
                console.log(error);
            })
    }
};

module.exports = report;