#!/bin/bash

cat v.js | sed 's/"VERSION_STR"/'$(date "+%s")'/g' > public/v.js
