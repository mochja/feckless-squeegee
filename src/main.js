define(['require'], function(require) {
  require(['hbars!src/template'], function(template) {
    document.body.innerHTML = template({name: 'Ahmed, The Terrorist.'});
  });
});