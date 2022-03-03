const express = require("express");
var router = express.Router();
const AccountModel = require("../models/account");
const PAGE_SIZE = 4;

// lấy dữ liệu database
router.get("/", (req, res, next) => {
  var page = req.query.page;
  if (page) {
    page = parseInt(page);
    page = page < 0 ? 1 : page;
    var skip = (page - 1) * PAGE_SIZE;
    AccountModel.find({})
      .skip(skip)
      .limit(PAGE_SIZE)
      .then((data) => {
        AccountModel.countDocuments({}).then((total, err) => {
          console.log(total, err);
          let pages = Math.ceil(total / PAGE_SIZE);
          res.json({
            PAGE_SIZE,
            total,
            pages, 
            data,
          });
        });
      })
      .catch((err) => {
        res.status(500).json("Lỗi server");
      });
  } else {
    AccountModel.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Lỗi server");
      });
  }
});

// thêm mới
router.post("/", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  AccountModel.create({
    username: username,
    password: password,
  })
    .then((data) => {
      res.json("Thêm mới thành công ");
    })
    .catch((err) => {
      res.status(500).json("Lỗi server");
    });
});

// update database
router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  let newpassword = req.body.newpassword;

  AccountModel.findById(id, {
    password: newpassword,
  })
    .then((data) => {
      res.json("update thành công");
    })
    .catch((err) => {
      res.status(500).json("Lỗi server");
    });
});

//Xóa dữ liêu
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  AccountModel.deleteOne({
    _id: id,
  })
    .then((data) => {
      res.json("delete thành công");
    })
    .catch((err) => {
      res.status(500).json("Lỗi server");
    });
});

module.exports = router;
