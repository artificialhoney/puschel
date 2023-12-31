module.exports = {
  apps : [{
    script: 'npx nx serve hub --host=0.0.0.0'
  }, {
    script: 'npx nx serve ui --host=0.0.0.0'
  }]
};
