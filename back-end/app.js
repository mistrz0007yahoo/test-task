const express = require("express");
const app = express();
const filesData = require("./filesData");

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/files", (_, res) => {
  filesData
    .getFilesList()
    .then((files) => {
      res.json(files);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.get("/tables/:file", function (req, res) {
  filesData
    .getTables(req.params.file)
    .then(({ tables }) => {
      res.json(tables.map((table) => table.title));
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.get("/details/:file/:tableName", function (req, res) {
  filesData
    .getDetails(req.params)
    .then((details) => {
      delete details.title;
      res.json(details);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
