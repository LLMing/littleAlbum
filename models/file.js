/**
 * Created by llming on 2017/3/18.
 */
var fs = require("fs");
var formidable = require("formidable");
var path = require("path");
var sd = require("silly-datetime");

//这个函数的callback中含有两个参数,一个是err
//另一个是所有文件夹名字的array
exports.getAllAlbums = function (callback) {
    fs.readdir("./uploads",function (err, files) {
        if(err){
            callback("没有找到uploads文件夹",null);
            return;
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

//通过文件名,得到所有图片
exports.getAllImagesByAlbumName = function (albumName, callback) {
    fs.readdir("./uploads/"+albumName,function (err, files) {
       if(err){
           callback("没有找到相册",null);
           return;
       }
       var allImages = [];
        (function Iterator(i) {
            if(i == files.length){
                //遍历结束
                console.log(allImages);
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/"+albumName+"/"+files[i],function (err, stats) {
                if(err){
                    callback("找不到文件"+files[i],null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                Iterator(i+1);
            });
        })(0);
    });
};

//上传文件的改名
exports.reName = function (req,callback) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../tempup/");
    form.parse(req,function (err, fields, files) {
        console.log(fields);
        console.log(files);
        //改名
        if(err){
            callback("上传文件失败");
            return;
        }

        var size = parseInt(files.tupian.size);
        if(size > 10240){
            fs.unlink(files.tupian.path);
            callback("图片尺寸应该小于1M");
            return;
        }

        var ttt = sd.format(new Date(),"YYYYMMDDHHmmss");
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.tupian.name);
        var wenjianjia = fields.wenjianjia;
        var oldpath = files.tupian.path;
        var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia +"/"+ttt + ran + extname);
        fs.rename(oldpath,newpath,function (err) {
            if(err){
                callback("改名失败");
            }
        });
    });
};