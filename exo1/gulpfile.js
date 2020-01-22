var gulp  = require('../node_modules/gulp');
var cleanCSS  = require('../node_modules/gulp-clean-css');
var concatCSS  = require('../node_modules/gulp-concat-css');
var cleanJS  = require('../node_modules/gulp-uglify');
var terser = require("../node_modules/gulp-terser");
var htmlMin = require("../node_modules/gulp-htmlmin");
var concat  = require('../node_modules/gulp-concat');
var copy  = require('../node_modules/copy-descriptor');

var sass  = require('../node_modules/gulp-sass');

var browserSync = require('../node_modules/browser-sync').create();
const imageMin = require('../node_modules/gulp-imagemin');
const deploySurge = require('../node_modules/gulp-surge');

var reload      = browserSync.reload;
var slack = require('../node_modules/gulp-slack')({
        url: 'https://hooks.slack.com/services/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',
       
    });

gulp.task('compileStyles',function() {
    

    //css/** tout les fichier et dossier  de dossier css

    return gulp.src("./scss/*")
            .pipe(sass())  
           
            .pipe(gulp.dest('./compilecss')); //the destination of results 
});



gulp.task('minifyStyles',function() {
    

    return  gulp.src(["./css/*","./compilecss/*"])
            .pipe(cleanCSS())  
            .pipe(gulp.dest('./build/css')); 

            

});


gulp.task('prepareStyles',gulp.series('compileStyles','minifyStyles'));



gulp.task('prepareScripts',function() {
    

    return  gulp.src("./js/*")
            .pipe(terser())  
            .pipe(gulp.dest('./build/js')); 


});

gulp.task('prepareImages',function() {
    

    return  gulp.src("./images/*.jpeg")
            .pipe(imageMin())  
            .pipe(gulp.dest('./build/images')); 


});

gulp.task('preparePages',function() {
    

        return  gulp.src("./index.html")
                .pipe(htmlMin({ collapseWhitespace: true }))  
                .pipe(gulp.dest('./build')); 
    
    
    });


    gulp.task('prepareSite',gulp.parallel('prepareStyles','prepareScripts','prepareImages','preparePages'));
    
    gulp.task('deploy', function () {
        return deploySurge({
          project: './build/',         // Path to your static build directory
          domain: 'bennaceur_berkane.surge.sh'  // Your domain or Surge subdomain
        })
      })
      gulp.task('notify', function () {
        return gulp.src('./build')
                 .pipe(slack('Deployed latest build'));
      })
      

      //PARTIE OPTIONEL//
      gulp.task('default',gulp.series('notify','prepareSite','deploy'));

      // Create a Browsersync instance
var bs = require("browser-sync").create();


// Static server
gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: "build"
            }
        });
        gulp.watch("./build/index.html").on('change', browserSync.reload);
    });

    // Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

        // Serve files from the root of this project
        browserSync.init({
            server: {
                baseDir: "./build"
            }
        });
    
        gulp.watch("./build").on("change", reload);
    });