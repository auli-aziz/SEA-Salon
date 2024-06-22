const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'reviews.json'
);

const getReviewsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if(err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  })
}

module.exports = class Review {
  constructor(n, c, r) {
    this.name = n;
    this.comment = c;
    this.rating = r;
  }

  save() {
    getReviewsFromFile((reviews) => {
      reviews.push(this);
      fs.writeFile(p, JSON.stringify(reviews), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getReviewsFromFile(cb);
  }
}