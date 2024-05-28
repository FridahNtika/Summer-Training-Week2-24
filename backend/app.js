// Import the express module
const express=require('express');
// Create an instance of the express application
const app=express();
// Specify a port number for the server
const port=5001;
// use middleware to parse json request bodies
app.use(express.json());

const db = require("./firebase");
const {collection, doc, getDocs, updateDoc, addDoc} = require("firebase/firestore");
const cors = require('cors');
app.use(cors());
require("dotenv").config();

// Start the server and listen to the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

app.post("/new-message", async(req, res) => {
    try {
        const username = req.body.user;
        const message = req.body.mess;
        const docRef = await addDoc(collection(db, "userMessages"), {
            username: username,
            message: message
        })
        res.status(200).json({message: `Successfully added document with id ${docRef.id}`});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// get all messages
app.get("/message", async(req, res) => {
    try {
        const docRef = await getDocs(collection(db, "userMessages"));
        console.log("dr: ", docRef);
        let temp = []
        docRef.forEach((doc) => {
            temp.push({id: doc.id, ...doc.data() })});
        console.log(temp);
        //res.send(temp)
        res.status(200).json(temp);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

app.post("/delete/:id", async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        await deleteDoc(doc(db, "userMessages", id));
        res.status(200).json({message: `Successfully deleted document with ID ${docRef.id}`});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

//module.exports = router;