const mongoose = require('mongoose')

// Use global JS promise instead of blue bird
mongoose.Promise = global.Promise

// Connection settings to Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/angular_to_do', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((e) => {
    console.log("ERROR : Connection to MongoDB failed")
    console.log(e)
})

module.exports = mongoose