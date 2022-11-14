/* eslint-disable no-undef */

// https://github.com/netlify/zip-it-and-ship-it/issues/525#issuecomment-858580934
// https://github.com/spencewood/svg-function/pull/2/files
process.env.FONTCONFIG_PATH = "/var/task/functions/svg";
process.env.FONTCONFIG_PATH = "/var/task/netlify/functions/svg";

const sharp = require("sharp");

exports.handler = async function () {
  const svgWithText = Buffer.from(
    `<svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
    <text x="20" y="35">My</text>
    <text x="40" y="35">cat</text>
    <text x="55" y="55">is</text>
    <text x="65" y="55">Grumpy!</text>
  </svg>`,
  );

  const res = (await sharp(svgWithText).png().toBuffer()).toString("base64");

  return {
    statusCode: 200,
    body: res,
    isBase64Encoded: true,
  };
};
