let projectFolder = "dist";
let sourceFolder = "source";
let index = "index.js";
let path = {
    discharge: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        img: projectFolder + "/img/",
        fonts: projectFolder + "/fonts/",
    },
    src: {
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/---*.html"],
        css: sourceFolder + "/scss/*.scss",
        js: sourceFolder + "/js/*.js",
        img: sourceFolder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
        fonts: sourceFolder + "/fonts/",
    },
    watch: {
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*.scss",
        js: sourceFolder + "/js/**/*.js",
        img: sourceFolder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)"
    }
};
let {src, dest} = require("gulp"), 
gulp = require("gulp"), 
browserSync = require("browser-sync").create(),
fileInclude = require("gulp-file-include"),
scss = require("gulp-sass"),
autoPrefixer = require("gulp-autoprefixer"),
mediaGroup = require("gulp-group-css-media-queries"),
optimizeCss = require("gulp-clean-css"),
renameCss = require("gulp-rename"),
renameJS = require("gulp-rename"),
optimizeJS = require("gulp-uglify-es").default
const browserSynchronization = (options) => {
    browserSync.init({
        server: {
           baseDir: "./" + projectFolder + "/" 
        },
        port:7000
    });
};
const html = () => {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest(path.discharge.html))
        .pipe(browserSync.stream())
};
const css = () => {
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle: "expanded"
        })
    )
    .pipe(autoPrefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
    }))
    .pipe(mediaGroup())
    .pipe(dest(path.discharge.css))
    .pipe(optimizeCss())
    .pipe(renameCss({
        extname: ".min.css"
    }))
    .pipe(dest(path.discharge.css))
    .pipe(browserSync.stream())
};
const js = () => {
    return src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.discharge.js))
        .pipe(optimizeJS())
        .pipe(renameJS({
            extname: ".min.js"
        }))
        .pipe(dest(path.discharge.js))
        .pipe(browserSync.stream())
};
const images = () => {
    return src(path.src.img)
    .pipe(dest(path.discharge.img))
    .pipe(browserSync.stream())
};
const watchFiles = (options) => {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
};
let compile = gulp.series(gulp.parallel(css, html, js, images));
let build = gulp.series(gulp.parallel(css, html, js, images));
let watch = gulp.parallel(build, watchFiles, browserSynchronization);
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;