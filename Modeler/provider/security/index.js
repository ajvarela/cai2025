module.exports = {
  __init__: [ 'propertiesProvider' ],
  propertiesProvider: [ 'type', require('./SecurityPropertiesProvider').default ]
};
