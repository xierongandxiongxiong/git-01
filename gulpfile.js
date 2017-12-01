/**
 * Created by xiong on 2017/11/30.
 */
var gulp=require("gulp");
var less=require("gulp-less");
var cssnano=require("gulp-cssnano" +
    "");
var uglify=require("gulp-uglify");
var htmlmin=require("gulp-htmlmin");
var concat=require("gulp-concat");
var browserSync=require("browser-sync");
var reload=browserSync.reload;
//less编译、压缩、合并
gulp.task("style",function () {
    gulp.src("src/styles/*.less")
        .pipe(less())
        .pipe(cssnano())
        .pipe(uglify())
        .pipe(gulp.dest("dist/styles"))
        .pipe(reload({stream:true}));
});
//js合并、压缩混淆
gulp.task("script",function () {
   gulp.src("src/scripts/*.js")
       .pipe(concat("all.js"))
       .pipe(gulp.dest("dist/scripts"))
       .pipe(reload({stream:true}));
});
//image复制
gulp.task("image",function () {
   gulp.src("src/images/*.*")
       .pipe(gulp.dest("dist/images"))
       .pipe(reload({stream:true}));
});
//html压缩
gulp.task("html",function () {
    gulp.src("src/*.html")
        .pipe(htmlmin({
            collapseWhitespace:true,
            removeComments:true
        }))
        .pipe(gulp.dest("dist"))
        .pipe(reload({stream:true}));
});
//监视
gulp.task("serve",function () {
    browserSync({
        server:{
            baseDir:["dist"]
        },
        port:2017,
        notify:false
        }, function (err,bs) {
        console.log(bs.options.getIn(["urls","local"]))
    });
    gulp.watch("src/styles/*.less",["style"]);
    gulp.watch("src/scripts/*.js",["scripts"]);
    gulp.watch("src/images/*.*",["images"]);
    gulp.watch("src/*.html",["html"]);
});