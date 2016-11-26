let express     = require('express')
let app         = express()
let bodyParser  = require('body-parser')
let mongoose    = require('mongoose')

mongoose.connect('mongodb://188.166.246.129:27017/express-api-mongodb') 

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let port = process.env.PORT || 5000

let router = express.Router()

router.get('/', (req,res) => {
  res.status(200).json({ message: "hello world"})
})

app.use('/api', router)

app.listen(port)
console.log("app started at port " + port);
