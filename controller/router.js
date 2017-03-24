/**
 * Created by llming on 2017/3/18.
 */
var file = require("../models/file.js");

exports.showIndex = function (req, res,next) {
    //内层函数,不是return回来东西,而是调用高层函数提供的
    //回调函数.把数据当成回调函数的参数来使用
    file.getAllAlbums(function (err,allAlbum) {
        if(err){
            next();
            return;
        }

        res.render("index",{
            "albums" : allAlbum
        });
    });
};

exports.showAlbum = function (req, res,next) {
    //遍历相册中的所有图片
   var albumName = req.params.albumName;

   //具体业务交给model
    file.getAllImagesByAlbumName(albumName,function (err,imagesArray) {
        if(err){
            next();
            return;
        }
        res.render("album",{
            "albumname" : albumName,
            "images" : imagesArray
        });
    });
};

//显示上传
exports.showUp = function (req, res,next) {
    file.getAllAlbums(function (err, albums) {
        if(err){
            next();
            return;
        }
        res.render("up",{
            albums : albums
        });
    });
};

//实现上传
exports.doPost = function (req, res) {
    file.reName(req,function (err) {
        if(err) {
            res.send(err);
            return;
        }
        res.send("成功");
    });
};