#!/usr/bin/env node

// merge two files---the incoming 1-page index and the global index (on disk)
// the details of the global index can be seen in the test cases.

const fs = require('fs');
const { exit } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const globalIndexPath = process.argv[2];
var globalString = fs.readFileSync(globalIndexPath, "utf8");

const makeIndex = (data) => {
  if (data === "") {
    return {};
  }
  var indices = {};
  let lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (line === "") {
      continue;
    }
    
    let tokens = line.split(" | ");
    if (!tokens) {
      continue;
    }
    if (tokens.length > 2) {
      let gram = tokens[0];
  
      if (!indices[gram]) {
        indices[gram] = {}
      }
    
      let tj = 1;
      while (tj < tokens.length) {
        indices[gram][tokens[tj + 1]] = parseInt(tokens[tj]);
        tj += 2;
      }
    } else {
      let tokens = line.split(" | ");
      let new_tokens = tokens[1].split(" ");
      if (!tokens) {
        continue;
      }
      let gram = tokens[0];
  
      if (!indices[gram]) {
        indices[gram] = {}
      }
    
      let tj = 0;
      while (tj < new_tokens.length) {
        indices[gram][new_tokens[tj]] = parseInt(new_tokens[tj + 1]);
        tj += 2;
      }
    }
  }

  return indices;
}

const indexToString = (index) => {
  let output = ""
  for (let [gram, data] of Object.entries(index)) {
    output += `${gram} |`;
    for (let [url, num] of Object.entries(data)) {
      // if (string_num === "NaN") {
      //   console.log("Error: " + num + " is not a numbeqasdasdasr");
      //   if (isNaN(num)) {
      //     console.log("Error: " + gram + " fuck: " + index);
      //   }
      //   exit(1);
      // }
      output += ` ${url} ${num}`;
    }
    output += "\n";
  }

  output = output.substring(0, output.length - 1);

  return output;
}

const mergeIndices = (newIndex, globalIndex) => {
  for (let [gram, data] of Object.entries(newIndex)) {
    
    if (globalIndex[gram]) {
      for (let [url, num] of Object.entries(data)) {
        if (globalIndex[gram][url]) {
          globalIndex[gram][url] += num;
        } else {
          globalIndex[gram][url] = num;
        }
      }
    } else {
      globalIndex[gram] = {};
      for (let [url, num] of Object.entries(data)) {
        globalIndex[gram][url] = num;
      }
    }
  }
  // TODO some code here
}


let globalIndices = makeIndex(globalString);
let data = "";

// TODO some code here
rl.on('line', (line) => {
  data += line + "\n";
  // TODO some code here
});

rl.on('close', () => {
  let fileIndices = makeIndex(data);

  mergeIndices(fileIndices, globalIndices);
  console.log(indexToString(globalIndices));
});