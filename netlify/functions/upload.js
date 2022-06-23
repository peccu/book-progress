// upload captured sharing image to cloudinary

/* eslint-disable no-undef */

const upload = async (name, url) => {
  const cloudinary = require("cloudinary");

  cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
  });

  return await cloudinary.v2.uploader.upload(
    url,
    { public_id: name });
};

exports.handler = async function (event, context) {
  const isbn = event.queryStringParameters.isbn || "9784478109373";

  console.log("Uploading isbn: " + isbn);
  // does not work 'cause of access from cloudinary and not from local
  // const url = process.env.NETLIFY_LOCAL == "true" ? "http://localhost:9999" : process.env.URL;
  // const cloudImage = await upload(isbn, `${url}/.netlify/functions/image?isbn=${isbn}`);
  try{
    const cloudImage = await upload(isbn, `${process.env.URL}/.netlify/functions/image?isbn=${isbn}`);

    console.log(cloudImage);
    console.log('cloud image: ' + cloudImage.secure_url);

    const result = {
      version: cloudImage.version,
      public_id: cloudImage.public_id,
      format: cloudImage.format,
    };
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }catch(e){
    console.log('some error');
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
