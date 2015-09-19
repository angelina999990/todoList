var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('stylus', function(){
  gulp.src('./public/stylus/style.styl')
      .pipe(stylus())
      .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', ['browser-sync'], function(){
  gulp.watch('./public/stylus/*.styl', ['stylus']);
  gulp.watch('./public/src/*/*.js', ['scripts']);
});

/**
 * [description]监听文件更新浏览器
 * 监听 css， js，hbs文件的改变，更新文件，浏览器端不用刷新也能同步
 */
gulp.task('browser-sync', ['nodemon'], function(){
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/stylesheets/*.css','public/javascripts/bundle.js'],
    browser: 'google-chrome',
    port: 7000,
    reloadOnRestart: false
  });
});

/**
 * [description]监听文件更新服务器端
 * 主要是当app.js 等配置项改变的时候，需要重启服务器客户端才会生效。nodemon监听js(主要app.js )的改变，重启服务
 * 这样运行gulp, 编码时就不用每次手动重启了
 */
gulp.task('nodemon', ['scripts'], function(){
  return nodemon({
    script: 'bin/www',
    ext: 'js'
  }).on('start', function(){

  });
});

gulp.task('scripts', function() {
  return browserify('./public/src/app.js', {
          // noParse: ['./public/src/todo-list-template.hbs'],
          extensions: ['.hbs'],
          insertGlobals: true,
          debug: !process.env.NODE_ENV
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('default', ['watch']);
