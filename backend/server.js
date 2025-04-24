const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

//dbpassword-MLBpzDBcaVFQN3F6

const app = express();
const cors = require('cors');

//middleware 
app.use(express.json());
app.use(cors()); //cors middleware
//app.use(morgan('dev')); // Log HTTP request
app.use("/Users",require("./Routes/userRoute"));
app.use("/Resources",require("./Routes/resRoute"));
//app.use("/Payments",require("./Routes/payRoute"));



// const PORT = 8000;
const DB_URL = "mongodb+srv://UserAshen:MLBpzDBcaVFQN3F6@mernapp.9exup.mongodb.net/?retryWrites=true&w=majority&appName=MernApp";
mongoose.connect(DB_URL).then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => console.log('DB connect error',error));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

