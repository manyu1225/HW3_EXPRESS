var express = require('express');
var router = express.Router();
const Post = require('../models/post');
 
//         在 GET posts 網址列帶入排序及限制筆數的參數
// 並運用 Express 提供的 req.query 取得網址列的參數，將尋找到符合的資料設定排序及呈現指定資料數量

/* GET users listing. */
router.get('/', async (req, res, next) =>  {
  const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
  const limit = req.query.limit;
  console.log(timeSort);
  console.log(limit);
    const all  =await Post.find().sort(timeSort).limit(limit);
    res.status(200).json({
      "status": 'success',
      data: {
        all
      }
    });

  });


  router.get('/:id', async (req, res, next) => {
    try {
      // 取得 id
      const id = req.params.id; 
      const data = await Post.find({_id: id });
     // console.log(data.length); 1
      if (data.length) {
        res.status(200).json({
            "status": 'success',
            data: {
                data
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
  });


  router.post('/', async (req, res, next) =>{
    try{
      const data = req.body;  // 取得來自 request body 的資料
      let { name, tags, type,content} = data;
   // 驗證是否有 content 欄位 -> 若有則使用 mongoose 語法新增資料 -> 回傳成功回應
      //                       -> 未填寫 content 欄位 -> 回傳失敗
      if (!name||!type ||!content) {
        // 回傳失敗
        res.status(400).json({
          "status": 'fail',
          "message": '請確認欄位'
        })
        return;
      }else{

        const  newUser= await Post.create({ name, tags, type,content})
        res.status(200).json({ status: 'success', newUser });  


      }

    } catch (error) {
      // 回傳失敗
      res.status(400).json({
        "status": 'false',
        "message": error.message
      })
    }
  });
  
module.exports = router;
