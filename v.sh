#!/bin/bash

echo commit ref: $COMMIT_REF
cat v.js | sed 's/"VERSION_STR"/'$(date "+%s")'/g' > public/v.js
# curl -Lo \
#      netlify/functions/image/NotoSerifCJKjp-Regular.otf \
#      https://github.com/ixkaito/NotoSerifJP-subset/raw/master/subset/NotoSerifCJKjp-Regular.otf
# ^ 1MB
# https://github.com/googlefonts/noto-cjk/raw/main/Serif/Variable/TTF/Subset/NotoSerifJP-VF.ttf
# ^ 13MB
# https://github.com/googlefonts/noto-cjk/raw/main/Serif/Variable/TTF/NotoSerifCJKjp-VF.ttf
# ^ over 50MB
