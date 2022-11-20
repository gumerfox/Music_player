export const audio = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/audio`)
    .pipe(app.gulp.dest(`${app.path.build.audio}`));
};
// .src(app.path.src.files)
// .pipe(app.gulp.dest(app.path.build.files));
