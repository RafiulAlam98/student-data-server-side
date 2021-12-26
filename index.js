const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000
const cors = require('cors')
app.use(cors())
app.use(express.json())

require ('dotenv').config()



const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qlklf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.get('/', (req, res) => {
     console.log("server running")
     res.send('Server Running')
})

app.listen(port, () => {
     console.log("listening from port",port)
})