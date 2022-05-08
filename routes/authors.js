
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
      let { name ,introduction} = data;
  
      if (!name) {
        // 回傳失敗
        res.status(400).json({
          "status": 'fail',
          "message": '請確認欄位'
        })
        return;
      } 
      const  dataAuthor = await Author.create({ name , introduction})
      res.status(200).json({ status: 'success', dataAuthor });  
   
    } catch (error) {
      // 回傳失敗
      res.status(400).json({
        "status": 'false',
        "message": error.message
      })
    }
  });

module.exports = router;