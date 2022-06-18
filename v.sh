#!/bin/bash

cat v.js | sed 's/"VERSION_STR"/'$(date "+%s")'/g' > public/v.js
curl -Lo netlify/functions/bookimage/NotoSerifCJKjp-VF.ttf https://github.com/googlefonts/noto-cjk/raw/main/Serif/Variable/TTF/NotoSerifCJKjp-VF.ttf

