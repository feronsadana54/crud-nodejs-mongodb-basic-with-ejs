const express = require("express");
const expresLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

// koneksi ke server
const app = express();
const port = 3000;

// koneksi ke database
require("./utils/db");
const selectData = require("./model/schema");

app.set("view engine", "ejs");
app.use(expresLayouts);
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.render("home", {
    title: "Home Page",
    layout: "layouts/layoutsPage.ejs",
  });
});

app.get("/data", async (req, res) => {
  const data = await selectData.find();
  res.render("data", {
    title: "Data Page",
    layout: "layouts/layoutsPage.ejs",
    data,
  });
});

app.get("/detail/:_id", async (req, res) => {
  const params = req.params["_id"];
  const data = await selectData.findById(params);
  res.render("detail", {
    title: "Detail Page",
    layout: "layouts/layoutsPage.ejs",
    data,
  });
});

app.get("/update/:_id", async (req, res) => {
  const id = req.params["_id"];
  const data = await selectData.findById(id);
  res.render("update", {
    title: "Update Page",
    layout: "layouts/layoutsPage.ejs",
    data,
  });
});

app.post("/update", async (req, res) => {
  const update = await selectData.findByIdAndUpdate(req.body._id, req.body);
  res.redirect(`/detail/${req.body._id}`);
});

app.get("/tambahData", async (req, res) => {
  res.render("tambahData", {
    title: "Add Page",
    layout: "layouts/layoutsPage.ejs",
  });
});

app.post("/tambah", async (req, res) => {
  const addData = await selectData.insertMany([req.body]);
  res.redirect("/data");
});

app.get("/hapus/:_id", async (req, res) => {
  const find = await selectData.findById(req.params["_id"]);
  const hapus = await selectData.deleteOne(find);
  res.redirect("/data");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
