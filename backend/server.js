const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require("./Routes/resRoute");

const app = express();

//dbpassword-sogLfXLkzt4jbf3N


//app middleware
app.use(express.json());
app.use("/Resources",router);



const PORT = 8000;
const DB_URL = "mongodb+srv://UserAshen:sogLfXLkzt4jbf3N@mernapp.9exup.mongodb.net/?retryWrites=true&w=majority&appName=MernApp";

mongoose.connect(DB_URL).then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => console.log('DB connect error',error));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

