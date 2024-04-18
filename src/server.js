const express = require( "express");
const cors = require('cors');


const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json({}));
app.use(express.json({
    extented: true
}));
app.use(express.static("public"));



app.listen(8080, console.log(`Server running on  Port :8080`));