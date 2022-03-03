const express  = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser')
const AccountModel = require('./models/account')
var accountRouter = require('./routers/account')
const path = require('path')

app.get('/home',(req, res, next)=>{
  res.sendFile(path.join(__dirname, 'index.html'))
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname,'public')))

app.post('/signUp',(req, res, next)=>{
  const userName = req.body.username
  const passWord = req.body.password
  
  AccountModel.findOne({
    username: userName,
  })
  .then(data =>{
    if(data){
      res.json('user nay da ton tai')
    }
    else{
      return AccountModel.create({
        username: userName,
        password: passWord,
      })
    }
  })
  .then(data=>{
    res.json("Tạo tài khoản thành công")
  })
  .catch(err=>{
    res.status(500).json("Tạo tài khoản thất bại")
  })
})

app.post('/login',(req, res, next)=>{
  const username = req.body.username
  const password = req.body.password

  AccountModel.findOne({
    username: username,
    password: password
  })
  .then(data=>{
    if(data){
      res.json('Đăng nhập thành công')
    }
    else{
      res.status(300).json('Account hoặc mật khẩu không đúng!')
    }
  })
  .catch(err =>{
    res.status(500).json('Server lỗi!')
  })
})

app.use('/api/account/', accountRouter)

app.get('/', (req, res, next) => {
  res.json("HOME")
  
})

app.listen(port, ()=>{
    console.log("abv");
});