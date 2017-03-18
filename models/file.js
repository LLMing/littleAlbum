/**
 * Created by llming on 2017/3/18.
 */
var fs = require("fs");

exports.getAllAlbums = function (callback) {
    fs.readdir("./uploads",function (err, files) {
        if(err){
            callback("没有找到uploads文件夹",null);
        }

        var allAlbum = [];
        (function iterator(i) {
            if(i == files.length){
                //遍历结束
                console.log(allAlbum);
                callback(null,allAlbum);
                return;
            }
            fs.stat("./uploads/"+files[i],function (err, stats) {
                if(err){
                    callback("找不到文件"+files[i],null);
                }
                if(stats.isDirectory()){
                    allAlbum.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
};