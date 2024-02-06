#!/bin/bash
# Invert index to create a mapping from terms to URLs containing that term
# The details of the index structure can be seen in the test cases

awk -v url="$1" '{
    count[$0]++
}
END {
    for (word in count) {
        printf "%s | %d | %s\n", word, count[word], url
    }
}' "-" | tr '\t' ' ' | awk '{ print $1, length, $0 }' | sort -k1,1 -k2,2n | cut -d' ' -f3-
