/**
 * Created by llming on 2017/3/18.
 */
var file = require("../models/file.js");

exports.showIndex = function (req, res) {
    //内层函数,不是return回来东西,而是调用高层函数提供的
    //回调函数.把数据当成回调函数的参数来使用
    file.getAllAlbums(function (err,allAlbum) {
        if(err){
            res.send(err);
            return;
        }

        res.render("index",{
            "albums" : allAlbum
        });
    });
};

exports.showAlbum = function (req, res) {
    res.send("相册"+req.params.albumName);
};