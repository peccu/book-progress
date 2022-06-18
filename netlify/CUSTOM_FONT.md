# custom font for netlify function (AWS Lambda)

- Noto Serif Font (TTF)
  - https://github.com/googlefonts/noto-cjk/tree/main/Serif#language-specific-variable-fonts
- fonts.conf for lambda env
  - https://medium.com/creditorwatch/aws-lambda-fonts-libfontconfig-5e837281a4ce#d651
- how to use font for netlify function env
  - hints in issue
    - https://github.com/netlify/zip-it-and-ship-it/issues/525#issuecomment-858580934
  - Its sample
    - https://github.com/spencewood/svg-function/pull/2/files
    - directory structure
      ```
      ./netlify/functions/
        svg/
          fontA.ttf
          fonts.conf
          svg.js
      ```
    - set fontconfig path in `svg.js`
      ```
      process.env.FONTCONFIG_PATH = "/var/task/functions/svg";
      ```
  - but, if you use chrome-aws-lambda, you only need to do is call `await chromium.font` like below.
    ```
    // should be called before launching chromium
    await chromium.font('https://raw.githubusercontent.com/ixkaito/NotoSerifJP-subset/master/subset/NotoSerifCJKjp-Regular.otf');
    const browser = await chromium.puppeteer.launch({...});
    ```
