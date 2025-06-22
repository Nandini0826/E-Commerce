const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/E-Commerce`)
.then(function(){//then or catch can be used
    dbgr("connected"); 
})
.catch(function(err)
{
    dbgr("err");
})
module.exports = mongoose.connection;