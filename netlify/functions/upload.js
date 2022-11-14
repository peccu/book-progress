// upload captured sharing image to cloudinary
// meybe need background function
// https://docs.netlify.com/functions/build-with-javascript/

/* eslint-disable no-undef */

const upload = async (name, url, force = false) => {
  const cloudinary = require("cloudinary");

  cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
  });
  const folder = "book-progress";

  const current = await cloudinary.v2.api.resources_by_ids(
    [`${folder}/${name}`],
    function (error, result) {
      console.log(result, error);
    },
  );
  if (!force && current.resources.length > 0) {
    return current.resources[0];
  }
  console.log("not found or force. fetch and uploading");

  return await cloudinary.v2.uploader.upload(url, {
    public_id: name,
    folder: folder,
  });
};

exports.handler = async function (event) {
  const isbn = event.queryStringParameters.isbn || "9784478109373";
  const force = event.queryStringParameters.force;

  console.log(`Uploading isbn: ${isbn}`);
  try {
    // does not work 'cause of access from cloudinary and not from local
    // const url = process.env.NETLIFY_LOCAL == "true" ? "http://localhost:9999" : process.env.URL;
    // const cloudImage = await upload(isbn, `${url}/.netlify/functions/image?isbn=${isbn}`);
    const cloudImage = await upload(
      isbn,
      `${
        process.env.URL
      }/.netlify/functions/image?isbn=${isbn}&${new Date().getTime()}`,
      force,
    );

    console.log(cloudImage);
    console.log(`cloud image: ${cloudImage.secure_url}`);

    const result = {
      version: cloudImage.version,
      public_id: cloudImage.public_id,
      format: cloudImage.format,
    };
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    console.log("some error");
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
