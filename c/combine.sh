# #!/bin/bash
# #
# # Combine terms to create n-grams (for n=1,2,3) and then count and sort them

awk '{
    unigrams[NR]=$1
    if (NR > 1) {
        bigrams[NR-1] = last "\t" $1
        if (NR > 2) {
            trigrams[NR-2] = a[NR-2] "\t" a[NR-1] "\t" $1
        }
    }
    last=$1
    a[NR]=$1
}
END {
    for (i=1; i<=NR; i++) {
        print unigrams[i]
        if (i < NR) {
            print bigrams[i]
            if (i < NR-1) {
                print trigrams[i]
            }
        }
    }
}' "$1"