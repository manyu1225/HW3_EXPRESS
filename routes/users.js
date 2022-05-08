var express = require('express');
var router = express.Router();
const User = require('../models/user');
 //'http://localhost:3000/users?category=music&page=1' 在 POSTMAN 發出 GET 請求
 router.get('/',async (req, res, next) =>{
  // 取出參數
  const {category, page}  = req.query;
  /* 請在此填寫答案*/
  res.status(200).json({
    status: 'success',
    data: {
      /* 請在此填寫答案*/   
      category ,
      page
    }
  });
});
/* GET users listing.
router.get('/', async (req, res, next) =>  {
  const allUser  =await User.find();
  res.status(200).json({
    "status": 'success',
    "data": allUser
  });
}); */

router.post('/', async (req, res, next) =>{
  try{
    const data = req.body;
    let { nickName, gender, avatar} = data;

    if (!nickName||!gender ) {
      // 回傳失敗
      res.status(400).json({
        "status": 'fail',
        "message": '請確認暱稱與性別欄位'
      })
      return;
    } 
    const  newUser= await User.create({  nickName,  gender,  avatar })
    res.status(200).json({ status: 'success', newUser });  
 
  } catch (error) {
    // 回傳失敗
    res.status(400).json({
      "status": 'false',
      "message": error.message
    })
  }
});

// 修改 
router.patch('/:id', async (req, res, next) => {
  try{
    // 取得 id
    const id = req.params.id;
    const { nickName, gender, avatar } = req.body;
    if (!nickName || !gender) {
      res.status(400).json({ status: 'false', message: '使用者資料未填寫完整' }); 
      return;
    }else{
      const editContent = {
        nickName,
        gender,
        avatar
      } 
      const editUser = await User.findByIdAndUpdate(id, editContent, { new: true });
      if (editUser) {
        res.status(200).json({
          "status": 'success',
          "data": editUser
        });
      } else {
        res.status(400).json({
          "status": 'false',
          "message": "id 不存在"
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      "status": 'false',
      "message": error.message
    })
  }
});

// 刪除
router.delete('/', async (req, res, next) => {
  await User.deleteMany({});
  res.status(200).json({
    "status": 'success',
    "data": []
  });
});

module.exports = router;
