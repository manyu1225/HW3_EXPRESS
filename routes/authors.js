
var express = require('express');
var router = express.Router();
const Author = require('../models/author');
/* GET users listing. */
router.get('/', async (req, res, next) =>  {
    const allUser  =await Author.find();
    res.status(200).json({
      "status": 'success',
      "data": allUser
    });
  });

router.post('/', async (req, res, next) =>{
    try{
      const data = req.body;
      if (data.name) {
        const newAuthor = await Author.create(
          {
            name: data.name,
            introduction: data.introduction
          }
        );
        res.status(200).json({
          "status": 'success',
          "data": newAuthor
        });
      } else {
        res.status(400).json({
          "status": 'false',
          "message": "欄位未填寫正確，或無此 ID"
        });
      }
    } catch (error){
      res.status(400).json({
        "status": 'false',
        "message": error.message
      });
    }  
  })
  
module.exports = router;