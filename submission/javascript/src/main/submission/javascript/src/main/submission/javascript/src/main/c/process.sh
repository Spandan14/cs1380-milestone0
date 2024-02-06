#!/bin/bash
# process text to convert it to maintain one word per 
# line, convert it to lowercase ascii, and remove any stopwords 
# useful commands: tr, iconv, grep

SOURCE=$(dirname $0)

tr -cs A-Za-z '\n' | tr '[:upper:]' '[:lower:]' | grep -vwf "$SOURCE/../d/stopwords.txt"
