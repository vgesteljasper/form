const gulp = require("gulp");
const gutil = require("gulp-util");
const postcss = require("gulp-postcss");
const minify = require("gulp-clean-css");
const rename = require("gulp-rename");

const config = {
  css: {
    source: "./src/styles/main.css",
    dest: "./build/styles"
  },
  html: {
    source: "./src/index.html",
    dest: "./build"
  }
};

gulp.task("default", ["html", "css"]);

gulp.task("html", () =>
  gulp.src(config.html.source).pipe(gulp.dest(config.html.dest))
);

gulp.task("css", () =>
  gulp
    .src(config.css.source)
    .pipe(postcss())
    .on("error", gutil.log)
    .pipe(minify())
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest(config.css.dest))
);

gulp.task("watch", ["default"], () => {
  gulp.watch(config.html.source, ["html"]);
  gulp.watch(config.css.source, ["css"]);
});
