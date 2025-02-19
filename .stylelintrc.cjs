module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-standard-vue/scss'],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      extends: ['stylelint-config-standard-scss']
    },
    {
      files: ['*.vue', '**/*.vue'],
      extends: ['stylelint-config-standard-scss', 'stylelint-config-standard-vue/scss']
    }
  ]
};
