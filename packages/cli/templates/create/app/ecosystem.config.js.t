---
to: ecosystem.config.js
---
const path = require('path');

module.exports = {
  apps : [{
    name: "xx",
    script: "./xx.js",
    env: {
      PORT: 80,
      NODE_ENV: "production",
      STATIC_PATH : path.join(
        __dirname,
        'node_modules',
        '@xx',
        'ui'
      )
    }
  }]
}
