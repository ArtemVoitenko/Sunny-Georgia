var gulp = require("gulp"); 
var sass = require("gulp-sass"); 
var postcss = require("gulp-postcss"); 
var plumber = require("gulp-plumber");
var autoprefixer = require("autoprefixer"); 
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("style", function () {   
	gulp.src("sass/main.sass")
	.pipe(plumber())         
	.pipe(sass())     
	.pipe(postcss([       
		autoprefixer()     
		]))     
	.pipe(gulp.dest("build/css")) 
	.pipe(minify())
	.pipe(rename("style.min.css"))
	.pipe(gulp.dest("build/css"))
	.pipe(server.reload( {stream: true} ));
});
gulp.task("images", function(){
	return gulp.src("img/**/*.svg")
	.pipe(imagemin([
		imagemin.svgo()
		]))
	.pipe(gulp.dest("/img"));
	});
gulp.task("sprite", function(){
	return gulp.src("build/img/*-icon.svg")
	.pipe(svgstore({
		inlineSvg: true
		}))
	.pipe(rename("sprite.svg"))
	.pipe(gulp.dest("build/img"));
	});
gulp.task("minifyJS", function(){
	gulp.src([
		"js/jQuery.js",
		"js/jquery-ui.min.js",		
		"js/script.js"])
	.pipe(concat('script.min.js'))
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest("build/js"))
	.pipe(server.reload( {stream: true} ));
	});
gulp.task("serve", function(){
	server.init({
		server: "build/"
		});
	gulp.watch("sass/**/*.{sass,scss}",["style"]);
	gulp.watch("js/**/*.js", ["minifyJS"]);
	gulp.watch("*.html", ["html"]);	
	});
gulp.task("build", function (done) {
	run(
		"clean",
		"copy",
		"style",
		"sprite",
		"minifyJS",
		"html",
		done
		);
	});
gulp.task("html", function(){
	return(gulp.src("*.html"))
		.pipe(posthtml([
			include()
			]))
		.pipe(gulp.dest("build/"))
		.pipe(server.reload( {stream: true} ));
		
	});
gulp.task("copy", function(){
	return(gulp.src([
		"fonts/**/*.{otf,ttf,woff,woff2}",
		"img/**",
		"js/**"
		], {
			base: "."
		})
		.pipe(gulp.dest("build"))
		)
	});
gulp.task("default", ["serve"]);
gulp.task("clean", function () {   
	return del("build"); 
	});