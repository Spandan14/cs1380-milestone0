#!/usr/bin/env node

// Extract text from a web page

const { convert, htmlToText } = require('html-to-text');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

// TODO Add some code
const valid_tags = ["p", "h1", "h2", "h3", "h4", "h5", "h6"]
let content = "";

rl.on('line', (line) => {
  content += line + "\n";
});

rl.on('close', () => {
  console.log(convert(content));
});
