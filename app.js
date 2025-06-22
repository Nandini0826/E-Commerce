 const express = require("express");
 const app = express();
 const cookieParser = require("cookie-parser");
 const path = require("path");
 const expressSession = require("express-session");
 const flash = require("connect-flash");
const userRouter = require("./routes/userRouter");
const ownerRouter = require("./routes/ownersRouter"); 
 const productRouter = require("./routes/productRouter");
 const index = require("./routes/index");
 const PORT = 3000;
 require("dotenv").config();

const db = require("./config/mongoose-connection");

const cors = require('cors');
 app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true
   
 }));

 app.use(express.json());
 app.use(express.urlencoded({ extended: true}));
 app.use(cookieParser());
 app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
 );
 app.use(flash()); 
 app.use(express.static(path.join(__dirname, "public")));    

 app.use("/users", userRouter);
 app.use("/admin", ownerRouter);
 app.use("/products", productRouter);
app.use("/", index);
 
app.use(express.static(path.join(__dirname, "../client/build"))); // Path to React build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
 app.listen(PORT, () => console.log( `Server running on port ${PORT}`));