const express = require('express');
const vhost = require('vhost');

const config = require('./config');

const parent1 = express();
parent1.use(express.static('src/static/parent1'));

const parent2 = express();
parent2.use(express.static('src/static/parent2'));

const child = express();
child.use(express.static('src/static/child'));

const app = express();

app.use(vhost(config.parent1, parent1));
app.use(vhost(config.parent2, parent2));
app.use(vhost(config.child, child));

console.log(`parent1 running on ${config.parent1}...`);
console.log(`parent2 running on ${config.parent2}...`);
console.log(`child running on ${config.child}...`);
console.log('Be sure to add the above domains to your hosts file (sudo vim /etc/hosts) pointing to 127.0.0.1');

app.listen(80);
