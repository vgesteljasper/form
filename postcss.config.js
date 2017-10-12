module.exports = {
  plugins: [
    require("stylelint"),
    require("postcss-import"),
    require("postcss-reporter")({
      clearMessages: true
    }),
    require("postcss-cssnext")
  ]
};
