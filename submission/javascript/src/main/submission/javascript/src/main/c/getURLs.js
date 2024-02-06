#!/usr/bin/env node

const readline = require('readline');
const { JSDOM } = require('jsdom');
const { URL } = require('url');

// Example usage:
let baseURL = process.argv[2];
baseURL = baseURL.substring(0, baseURL.lastIndexOf('/') + 1);

const rl = readline.createInterface({
  input: process.stdin,
});

let current_lines = {};

rl.on('line', (line) => {
  i = line.indexOf('href=\"');
  if (i != -1) {
    rest_of_line = line.substring(i + 6);

    if (current_lines[rest_of_line.substring(0, rest_of_line.indexOf('\"'))]) {
      return;
    }

    current_lines[rest_of_line.substring(0, rest_of_line.indexOf('\"'))] = true;
    console.log(baseURL + rest_of_line.substring(0, rest_of_line.indexOf('\"')));
  }
});

rl.on('close', () => {
  // TODO some code
});
