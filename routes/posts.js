var express = require('express');
var router = express.Router();
const Post = require('../models/post');
 
/* GET users listing. */
router.get('/', async (req, res, next) =>  {
    const allUser  =await Post.find();
    res.status(200).json({
      "status": 'success',
      "data": allUser
    });
  });


  router.get('/:id', async (req, res, next) => {

      // 取得 id
      const id = req.params.id; 
      const data = await Post.findByIdAndDelete(id);
      res.status(200).json({
        "status": 'success',
        "data": data
      });
  });


  router.post('/', async (req, res, next) =>{
    try{
      const data = req.body;
      let { name, tags, type,content} = data;
  
      if (!name||!type ) {
        // 回傳失敗
        res.status(400).json({
          "status": 'fail',
          "message": '請確認欄位'
        })
        return;
      } 
      const  newUser= await Post.create({ name, tags, type,content})
      res.status(200).json({ status: 'success', newUser });  
   
    } catch (error) {
      // 回傳失敗
      res.status(400).json({
        "status": 'false',
        "message": error.message
      })
    }
  });
  
module.exports = router;
