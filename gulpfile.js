var del = require('del');
var gulp = require('gulp');
var autoprefixer = require("gulp-autoprefixer");
var cache = require('gulp-cache');
var cssnano = require('gulp-cssnano');
var express = require('express');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var pug = require('gulp-pug');
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var svg = require('gulp-svg-sprite');
var useref = require('gulp-useref');
var spritesmith = require('gulp.spritesmith');
var imageminJpegoptim = require('imagemin-jpegoptim');
var runSequence = require("run-sequence");

var app = express();
var listener = app.listen();
var port = listener.address().port;
// var port = 9000;
var browserSync = require('browser-sync').create();

gulp.task('pug', () => {
    gulp.src('resources/pug/**/[^_]*.pug')
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
            .on('error', notify.onError(function (error) {
                return 'An error occurred while compiling pug.\nLook in the console for details.\n' + error
            }))
        .pipe(gulp.dest('resources/tmp'))
})

gulp.task('styles:serve', () => {
    return gulp.src('resources/assets/sass/**/**/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 5,
            indentType: 'tab',
            indentWidth: 4
        }).on('error', notify.onError({
            message: "<%= error.message %>",
            title: "Error sass"
        })))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('resources/tmp/css'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('styles:build', () => {
    return gulp.src('resources/assets/sass/*.scss')
        .pipe(plumber())
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 5,
            indentType: 'tab',
            indentWidth: 4
        }).on('error', notify.onError({
            message: "<%= error.message %>",
            title: "Error sass"
        })))
        .pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('resources/tmp/css'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('images', () => {
    return gulp.src('resources/assets/img/**/[^_]*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imageminJpegoptim({ progressive: true, max: 75 }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({ plugins: [{ removeViewBox: false }] })
        ], { verbose: false }))
        .pipe(gulp.dest('public/img'))
})

gulp.task('images:without-optimization', () => {
    return gulp.src('resources/assets/img/**/[_]*')
        .pipe(gulp.dest('public/img'))
})

gulp.task('svg2png', () => {
    return gulp.src('resources/assets/img/svg/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('resources/assets/img/sprites'))
})

gulp.task('sprites', () => {
    // var prefix = 'lp'
    // var data = gulp.src('resources/assets/img/' + prefix + '-sprites/*.png')
    var data = gulp.src('resources/assets/img/sprites/*.png')
        .pipe(spritesmith({
            // retinaSrcFilter: 'resources/assets/img/' + prefix + '-sprites/*-2x.png',
            // imgName: prefix + '-sprite.png',
            imgName: '_sprite.png',
            // retinaImgName: '_' + prefix + '-sprite-2x.png',
            // cssName: '_' + prefix + '-sprite.scss',
            cssName: '_sprite.scss',
            // retinaImgPath: '../img/' + prefix + '-sprite-2x.png',
            // imgPath: '../img/' + prefix + '-sprite.png',
            imgPath: '../img/_sprite.png',
            algorithm: 'top-down',
            cssVarMap: function(sprite) {
                sprite.name = '_' + sprite.name
            }
        }))
    data.img.pipe(gulp.dest('resources/assets/img/'))
    data.css.pipe(gulp.dest('resources/assets/sass/default'))
})

gulp.task('svg', () => {
    return gulp.src('resources/assets/img/svg/*.svg')
        .pipe(svg({
            mode: {
                symbol: {
                    sprite: 'sprite.svg',
                    dest: '',
                    example: true
                },
            }
        }))
        .pipe(gulp.dest('resources/assets/img'))
})

gulp.task('fonts', () => {
    return gulp.src('resources/assets/fonts/**/*')
        .pipe(gulp.dest('public/fonts'))
})

gulp.task('scripts', () => {
    return gulp.src('resources/assets/js/*')
        .pipe(gulp.dest('resources/tmp/js'))
})

gulp.task('clear-cache', (done) => {
    return cache.clearAll(done)
})

gulp.task('server', () => {

    app.disable('view cache')

    app.set('view engine', 'pug')

    app.set('views', 'resources')

    app.use(express.static('resources'))

    app.use('/tmp/', express.static('resources/assets'))
    app.use('/img/', express.static('resources/assets/img'))
    app.use('/js/', express.static('resources/assets/js'))
    app.use('/css/', express.static('resources/tmp/css'))
    app.use('/fonts/', express.static('resources/assets/fonts'))

    app.use('/bower_components',    express.static('bower_components'))
    app.use('/node_modules',        express.static('node_modules'))


    app.get('/', function(req, res) {
        res.render('pug/index.pug', function (err, html) {
            err === null ? res.send(html) : console.log(err)
        })
    })

    app.get('/404', function(req, res) {
        res.render('pug/404.pug', function (err, html) {
            err === null ? res.send(html) : console.log(err)
        })
    })

    app.get('/thx', function(req, res) {
        res.render('pug/thx.pug', function (err, html) {
            err === null ? res.send(html) : console.log(err)
        })
    })

    browserSync.init({
        proxy: 'http://localhost:'   + port,
        startPath: '/',
        host: 'localhost',
        port: port,
        ghostMode: false,
        logPrefix: 'Proxy to localhost:' + port,
    })
})

gulp.task('html', ['styles:build', 'scripts', 'fonts', 'images', 'images:without-optimization', 'pug'], () => {
    return gulp.src(['resources/tmp/*.html'])
        .pipe(useref({ searchPath: ['resources/tmp'] }))
        .pipe(gulpif('*.css', cssnano({ safe: true, autoprefixer: false })))
        .pipe(gulp.dest('public'))
})

gulp.task('clean', del.bind(null, ['resources/tmp', 'resources/html', 'public']))

gulp.task('clean-tmp', del.bind(null, ['resources/tmp']))

gulp.task('build', () => {
    runSequence('clean', 'clear-cache', 'html', 'clean-tmp');
});

gulp.task('serve', () => {
    runSequence('clear-cache', 'server', ['styles:serve', 'sprites', 'scripts'])
    gulp.watch('resources/assets/js/*', ['scripts'])
    gulp.watch('resources/assets/img/sprites/*.png', ['sprites'])
    gulp.watch('resources/assets/sass/**/**/**/*.scss', ['styles:serve'])
    gulp.watch([
        'resources/pug/**/*.pug',
        'resources/assets/img/**/*',
        'resources/assets/js/*.js',
        'resources/assets/fonts/**/*'
    ]).on('change', browserSync.reload)
})