const fs = require('fs');
const path = require('path');

const config = require('./config');

const script = `window.sr_$ = {
    rmp: {
        THEIframe: function(src) {
            const $iframe = document.createElement('iframe');
            $iframe.src = src;
            return $iframe;
        },
        THEURL: '${config.child}',
    },
};`;

const filename = 'shared.js';

const parent1Static = path.join(__dirname, 'static', 'parent1', filename);
const parent2Static = path.join(__dirname, 'static', 'parent2', filename);

fs.writeFileSync(parent1Static, script);
fs.writeFileSync(parent2Static, script);
