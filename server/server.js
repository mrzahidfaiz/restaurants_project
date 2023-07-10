const express = require("express");
const dbConnection = require("./database/connection");
const { PORT } = require("./config/index");
const router = require("./routes/routes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

dbConnection();

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is Running on Port! ${PORT}`));
