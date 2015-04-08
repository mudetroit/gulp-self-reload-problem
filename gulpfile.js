var gulp = require('gulp');
var less = require('gulp-less');
var spawn = require('child_process').spawn;

gulp.task('default', function(){
	var p;

	if(p)
		p.kill();

	p = spawn('gulp', ['watch'], {stdio: 'inherit'});
});

gulp.task('watch', ['styles', 'watch-styles', 'watch-gulp']);

gulp.task('styles', function(){
	return gulp.src('./***.less')
	.pipe(less())
	.pipe(gulp.dest('./'))
});

gulp.task('watch-styles', ['styles'], function(){
	gulp.watch('./**/*.less', ['styles']);
});

gulp.task('watch-gulp', ['styles'], function(){
  gulp.watch('./gulpfile.js', ['default']);
});
