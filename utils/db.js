const mongoose = require("mongoose");
const { default: selectData } = require("../model/schema");
mongoose.connect("mongodb://127.0.0.1:27017/db_latihan");
