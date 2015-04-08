### To get this working
* npm install
* npm run gulp

### The problem
I have set up gulp so that it will reload when the gulpfile is modified. That basic process is working, but for some reason it seems the old tasks are not being terminated properly.

```javascript
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
```

That is a basic gulpfile that demonstrates the problem. When I tweak that gulpfile to cause it to reload I receive this in the console:

```
    [11:21:02] Starting 'default'...
    [11:21:02] Finished 'default' after 5.25 ms
    [11:21:02] Using gulpfile ~/repo/gulp-reload/gulpfile.js
    [11:21:02] Starting 'styles'...
    [11:21:02] Finished 'styles' after 34 ms
    [11:21:02] Starting 'watch-styles'...
    [11:21:03] Finished 'watch-styles' after 669 ms
    [11:21:03] Starting 'watch-gulp'...
    [11:21:03] Finished 'watch-gulp' after 1.83 ms
    [11:21:03] Starting 'watch'...
    [11:21:03] Finished 'watch' after 2.92 μs
```

Then modifying a less file within the directory gives this output

```
    [11:21:24] Starting 'styles'...
    [11:21:24] Finished 'styles' after 8.95 ms
    [11:21:24] Starting 'styles'...
    [11:21:24] Finished 'styles' after 2.92 ms
```

Each subsequent restart seems to lead to an additional call to styles, as if the old watchers are still there.

This is problem is cross posted at [StackOverflow](http://stackoverflow.com/questions/29519142/duplicate-tasks-on-self-reloading-gulp)
