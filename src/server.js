const express = require( "express");
const cors = require('cors');
const main = require( "./main.js");


const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json({}));
app.use(express.json({
    extented: true
}));
app.use(express.static("public"));

app.get("/api/profit", async (req, res) => {
    const date = req.query;
    var data = main(date);
    res.status(200).json({
        msg:'Success',
        data:data
    });
})

app.listen(8080, console.log(`Server running on  Port :8080`));