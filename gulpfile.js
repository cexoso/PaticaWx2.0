'use strict'
var gulp = require('gulp'),
connect = require('gulp-connect'),
jshint = require('gulp-jshint'),
concat = require('gulp-concat'),
jsmin = require('gulp-jsmin'),
es = require('event-stream'),
inject = require('gulp-inject'),
bowerFiles = require('main-bower-files'),
csso = require('gulp-csso'),
rename = require('gulp-rename'),
sass = require("gulp-sass"),
path= require("path"),
clean=require("gulp-clean");
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
gulp.task('server',['injectDev'],function () {
  connect.server({
    root: [
      'app',
      'bower_components'
    ],
    livereload: true,
    port: 80
    // ,
    // middleware: function (connect, opt) {
    //   return [function (req, res, next) {
    //     if (!req.url.match('/api/')) {
    //       next();
    //     } else {
    //       console.log('代理：' + req.url)
    //       proxy.web(req, res, {
    //         target: 'http://127.0.0.1:8080/PaticaService/'
    //       });
    //     }
    //   }
    //   ]
    // }//end of middleware
  });
  var rel = [
    'app/**/*.html',
    'app/**/*.html',
    'app/**/*.js',
    'app/**/*.css'
  ];
  gulp.run('scss:watch');
  gulp.watch(rel, function (event) {    
    console.log(event)
    if(event.type.match('add|delete')&&event.path.match('.js$|.css$')){
      gulp.run('injectDev');      
    }
    gulp.src('./app/index.html').pipe(connect.reload());
  });
});
gulp.task('lint', function () {
  var js = [
    'app/scripts/**/*.js'
  ];
  gulp.watch(js, function () {
    gulp.src(js).pipe(jshint()).pipe(jshint.reporter('default'));
  });
});
gulp.task('default', [
  'server'
]);
var distPath = 'D:/apache-tomcat-7.0.63/webapps/PaticaService';
var distPath1 = 'E:/Program Files/eclipseWS/PaticaService/WebContent';
gulp.task('watch', function () {
  gulp.watch('app/scripts/**/*.js', [
    'buildlogic'
  ]);
  gulp.watch('app/views/**/*', [
    'buildview'
  ]);
  gulp.watch('app/tpls/**/*', [
    'buildtpl'
  ]);
  gulp.watch('app/styles/**/*.css', [
    'buildcsscos'
  ]);
})
gulp.task('build', function () {
  return gulp.start([
  'buildlogic',
  'buildview',
  'buildtpl',
  'buildlib',
  'buildcsslib',
  'buildcsscos',
  'buildimg'
  ]);
})
gulp.task('buildlogic', function () {
  var path = 'app/scripts/**/*.js';
  return gulp.src(path).pipe(concat('all.js'), {
    newLine: ';'
  })
  // .pipe(jsmin())
  .pipe(gulp.dest(distPath + '/scripts')).pipe(gulp.dest(distPath1 + '/scripts'));
})
gulp.task('buildview', function () {
  return gulp.src('app/views/**/*').pipe(gulp.dest(distPath + '/views')).pipe(gulp.dest(distPath1 + '/views'));
})
gulp.task('buildimg', function () {
  return gulp.src('app/images/**/*').pipe(gulp.dest(distPath + '/images')).pipe(gulp.dest(distPath1 + '/images'));
})
gulp.task('buildtpl', function () {
  return gulp.src('app/tpls/**/*').pipe(gulp.dest(distPath + '/tpls')).pipe(gulp.dest(distPath1 + '/tpls'));
})
gulp.task('buildlib', function () {
  var path = 'app/scripts/**/*.js';
  var arr = [
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-bootstrap/ui-bootstrap.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/ui-select/dist/select.js',
    'bower_components/angular-sanitize/angular-sanitize.js'
  ];
  return gulp.src(arr).pipe(concat('lib.js'), {
    newLine: ';'
  }).pipe(jsmin()).pipe(gulp.dest(distPath + '/scripts')).pipe(gulp.dest(distPath1 + '/scripts'));
});
gulp.task('buildcsslib', function (opt, q) {
  var arr = [
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
    'bower_components/ui-select/dist/select.css'
  ];
  gulp.src('bower_components/bootstrap/dist/fonts/*.*').pipe(gulp.dest(distPath + '/fonts')).pipe(gulp.dest(distPath1 + '/fonts'));
  return gulp.src(arr).pipe(concat('lib.css')).pipe(csso()).pipe(gulp.dest(distPath + '/styles')).pipe(gulp.dest(distPath1 + '/styles'));
});
gulp.task('buildcsscos', function (opt, q) {
  var path = 'app/styles/**/*.css';
  return gulp.src(path).pipe(concat('costom.css')).pipe(csso()).pipe(gulp.dest(distPath + '/styles')).pipe(gulp.dest(distPath1 + '/styles'));
});
function injectDev() {
  gulp.src('app/indexTpl.html').pipe(inject(gulp.src(bowerFiles(), {
    read: false
  }), {
    name: 'bower',
    addRootSlash: false,
    ignorePath: [
      'bower_components',
      'app'
    ]
  })).pipe(inject(gulp.src('app/**/*.js', {
    read: false
  }), {
    name: 'inject',
    addRootSlash: false,
    ignorePath: [
      'bower_components',
      'app'
    ]
  })).pipe(inject(gulp.src('app/**/*.css', {
    read: false
  }), {
    name: 'inject',
    addRootSlash: false,
    ignorePath: [
      'bower_components',
      'app'
    ]
  })).pipe(rename('index.html')).pipe(gulp.dest('app/'));
}
gulp.task('injectDev', injectDev);
gulp.task('injectDist', function () {
  gulp.src('app/indexTpl.html').pipe(inject(gulp.src(bowerFiles(), {
    read: false
  }), {
    name: 'bower'
  })).pipe(rename('index.html')).pipe(gulp.dest('dist/'));
});

gulp.task('scss:watch', function(){
 gulp.watch('app/**/*.scss', function (event) {      
      console.log(event);
      console.log(event.type.match('deleted'));
      if(event.type.match('deleted')){
        var csspath=path.dirname(event.path)+'\\'+path.basename(event.path,'scss')+'css';
        console.log(csspath)
        gulp.src(csspath)
        .pipe(clean());
      }else{
        var st=new Date();
        gulp.src(event.path)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.dirname(event.path)));
        var et=new Date();
        console.log(et-st+'ms for compile sass');  
      }
  });
});