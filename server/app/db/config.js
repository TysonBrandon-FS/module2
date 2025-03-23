const mongoose = require("mongoose")

const connectionDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
    })
    console.log(`connect to MongoDB succesfully ${conn.connection.host}`)
  } catch(error) {
    console.log(error)
  }
}


module.exports = connectionDB;