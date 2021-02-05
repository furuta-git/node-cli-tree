#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const blue = '\u001b[34m';
const yellow = '\u001b[33m';
const reset = '\u001b[0m';

const argc = process.argv.length;
const argv = process.argv;
const root_dir = path.resolve(argc > 2 ? argv[2] : './');
const depth = (argc > 3 ? argv[3] : 3);

function show_tree (root, depth) {
  if (depth >= 0) console.log(yellow + '[D]' + reset + root);
  const files = fs.readdirSync(root);
  for (const file of files) {
    const fp = path.join(root, file);
    const stats = fs.statSync(fp);
    if (stats.isDirectory()) {
      show_tree(fp, depth - 1);
    } else {
      if (depth > 0) console.log(blue + '[F]' + reset + fp);
    }
  }
}

show_tree(root_dir, depth);