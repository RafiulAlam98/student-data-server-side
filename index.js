const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000
const cors = require('cors')
app.use(cors())
app.use(express.json())

const ObjectId = require('mongodb').ObjectId
require ('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qlklf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const run = async() =>{
     try{
          await client.connect();
          console.log("database connected")
          
          const database = client.db("student-database");
          const studentsCollection = database.collection("studentsInfo");

          // get all students information
          app.get('/students',async (req,res)=>{
               const cursor =  studentsCollection.find({})
               const result = await cursor.toArray()
               res.json(result)
          })

          // add new student
          app.post('/students',async(req,res) => {
               console.log(req.body)
               const doc = await studentsCollection.insertOne(req.body)
               res.json(doc)
          })

          // delete student information
          app.delete('/students/:id',async(req,res)=>{
               console.log(req.params.id)
               const query = {_id:ObjectId(req.params.id)}
               const result = await studentsCollection.deleteOne(query)  
               res.json(result)
          })


          app.get('/', (req, res) => {
               console.log("server running")
               res.send('Server Running')
          })
          
          app.listen(port, () => {
               console.log("listening from port",port)
          })
          

     }
     finally {
          // await client.close();
     }
    

}


run().catch(console.dir);
