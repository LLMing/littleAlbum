/**
 * Created by llming on 2017/3/18.
 */
var express = require("express");
var router = require("./controller");

var app = express();

//设置模板引擎
app.set("view engine","ejs");

//路由中间件
//静态页面
app.use(express.static("./public"));
app.use(express.static("./uploads"));

//首页
app.get("/",router.showIndex);

//相册内容页面
app.get("/:albumName",router.showAlbum);

//上传页面
app.get("/up",router.showUp);
app.post("/up",router.doPost);

//404
app.use(function (req,res) {
    res.render("err");
});

app.listen(3000);
