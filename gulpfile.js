const gulp = require("gulp");
const gutil = require("gulp-util");

const postcss = require("gulp-postcss");
const minify = require("gulp-clean-css");
const rename = require("gulp-rename");

const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const uglify = require("rollup-plugin-uglify");

const config = {
  html: {
    source: "./src/index.html",
    dest: "./build"
  },
  css: {
    source: "./src/css/main.css",
    dest: "./build/css"
  },
  js: {
    source: "./src/js/script.js",
    dest: "./build/js/script.min.js",
    exclude: "node_modules/**"
  }
};

gulp.task("default", ["html", "css", "js"]);

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

const inputOptions = {
  input: config.js.source,
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: config.js.exclude
    }),
    uglify()
  ]
};

const outputOptions = {
  format: "iife",
  sourcemap: true,
  file: config.js.dest
};

gulp.task("js", async () => {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
});

gulp.task("watch", ["default"], () => {
  gulp.watch(config.html.source, ["html"]);
  gulp.watch(config.css.source, ["css"]);
  gulp.watch(config.js.source, ["js"]);
});
