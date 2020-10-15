module.exports = {
  modules: (filename) => filename.endsWith('.module.css'),
  generateScopedName: '[path]_[name]_[local]',
};
