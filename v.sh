#!/bin/bash

cat v.js | sed 's/"VERSION_STR"/'$(date "+%s")'/g' > public/v.js
curl -Lo \
     netlify/functions/bookimage/NotoSerifJP-VF.ttf \
     https://github.com/googlefonts/noto-cjk/raw/main/Serif/Variable/TTF/Subset/NotoSerifJP-VF.ttf
# V over 50MB ^ 13MB
# https://github.com/googlefonts/noto-cjk/raw/main/Serif/Variable/TTF/NotoSerifCJKjp-VF.ttf
