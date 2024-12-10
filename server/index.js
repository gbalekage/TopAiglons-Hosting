const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const upload = require("express-fileupload");

const authRoutes = require("./routes/authRoutes");
const domainRoutes = require("./routes/domainRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json()); // alows json requests
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(upload());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/domain", domainRoutes);

//errors
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
