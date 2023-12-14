const fs = require("fs");
const path = require("path");

const DIRECTORY_NAME = "jsonfiles";
const directoryPath = path.join(__dirname, DIRECTORY_NAME);

function getFilesList() {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

function getTables(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(DIRECTORY_NAME + "/" + filename, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const details = JSON.parse(data);
        resolve(details);
      }
    });
  });
}

function getDetails({ file, tableName }) {
  return getTables(file).then(({ tables }) =>
    tables.find(({ title }) => title === tableName)
  );
}

module.exports = { getFilesList, getTables, getDetails };
