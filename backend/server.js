require('dotenv').config();

const express = require("express");
const {dbConnect} = require("./config/dbConnect");
const pokemonRoutes = require("./Routes/pokemonRoutes");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");
dbConnect();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use("/api/pokemon", pokemonRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 5000 ;
app.listen(port, console.log(`server is running on ${port}`));  