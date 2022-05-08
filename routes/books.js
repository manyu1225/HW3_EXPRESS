var express = require('express');
var router = express.Router();
const Book = require('../models/book');

/* GET users listing. */
router.get('/', async (req, res, next) =>  {
    const allBook  =await Book.find();
    res.status(200).json({
      "status": 'success',
      "data": allBook
    });
  });

  router.post('/', async (req, res, next) =>{
    try{
      const data = req.body;
      let { author, title} = data;
  
      if (!author||!title ) {
        // 回傳失敗
        res.status(400).json({
          "status": 'fail',
          "message": '請確認欄位'
        })
        return;
      } 
      const  newUser= await Book.create( { author, title} )
      res.status(200).json({ status: 'success', newUser });  
   
    } catch (error) {
      // 回傳失敗
      res.status(400).json({
        "status": 'false',
        "message": error.message
      })
    }
  });
  


  router.get('/:id', async (req, res, next) => {
    try {
      // 取得 id
      const id = req.params.id; 
     const book = await Book.find({ _id: id }).populate({
      path: 'author', // 對應到 bookSchema author
      select: 'name',
    });
    if (book.length) {
      res.status(200).json({
        status: 'success',
        data: {
          book
        }
      });
    } else {
      res.status(400).json({
        status: 'fail',
        message: "id 不存在"
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
})




module.exports = router;
