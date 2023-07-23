const mongoose = require("mongoose");
const selectData = mongoose.model("data_pribadi", {
  nama: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    default: "",
  },
});

module.exports = selectData;
