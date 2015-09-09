({
  baseUrl: './',
  name: 'src/main',
  insertRequire: ['src/main'],
  out: 'public/main-built.js',
  wrap: true,
  optimize: 'none',
  mainConfigFile: 'main.config.js',
  stubModules: ['text', 'hbars'],
  findNestedDependencies: true,
  inlineText: true,
  preserveLicenseComments: false,
  onModuleBundleComplete: function (data) {
    var fs = nodeRequire('fs'),
      amdclean = nodeRequire('amdclean'),
      outputFile = data.path,
      cleanedCode = amdclean.clean({
        filePath: outputFile
      });
   
    fs.writeFileSync(outputFile, cleanedCode);
  },
  onBuildWrite : function(moduleName, path, content){
    // replace handlebars with the runtime version
    if (moduleName === 'Handlebars') {
      path = path.replace('handlebars.js', 'handlebars.runtime.min.js');
      content = nodeRequire('fs').readFileSync(path).toString();
      content = content.replace(/(define\()(function)/, '$1"handlebars", $2');
    }
    return content;
  }
})