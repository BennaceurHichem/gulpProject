var gulp  = require('../node_modules/gulp');
var typeScript  = require('../node_modules/gulp-typescript');
var mocha  = require('../node_modules/gulp-mocha');
var istanbul=require('../node_modules/gulp-istanbul');
var jshint=require('../node_modules/gulp-jshint');

gulp.task('compileScripts',function() {
    
    return gulp.src("./src/*.ts")
            .pipe(typeScript())  
           
            .pipe(gulp.dest('./src')); //the destination of results 
});

gulp.task('pre-test',function() {
    
    return gulp.src("./src/la_lib.js")
            .pipe(istanbul())  
           
            .pipe(istanbul.hookRequire()); //the destination of results 
});

gulp.task('test',function() {
    
    return gulp.src("./test/test.js")
            .pipe(mocha())
            .pipe(istanbul.writeReports())
            .pipe(istanbul.enforceThresholds({thresholds:{global: 75} } ))
            .pipe(gulp.dest('./test')); //the destination of results 
});

gulp.task('testPre',gulp.series('pre-test','test'));
gulp.task('testQuality',gulp.series('compileScripts','testPre'));

gulp.task('lint',function() {
    
    return gulp.src("./src/la_lib.js")
            .pipe(jshint())
            .pipe(
                jshint.reporter("gulp-jshint-html-reporter",{
                    filename:__dirname +"/jshint-output.html",
                    createMissingFolder: false
                })
            )

            .pipe(gulp.dest('./test')); //the destination of results 
});

gulp.task('default',gulp.series('testQuality','lint'));
