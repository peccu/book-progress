// https://github.com/Chuloo/gatsby-netlify-functions/blob/master/src/lambda/fetch.js
import axios from "axios"

const search = async (isbn) => {
  const book = {};
  // alert(`foo ${isbn}`);
  const response = await axios.get(
    "https://api.openbd.jp/v1/get?isbn=" + isbn.toString()
  )
  const json = await response.json();
  return json;
  // const onix = json[0] && json[0];
  // // result.value = JSON.stringify(onix, null, 2);
  // const summary = json[0] && json[0].summary;
  // //  picked.value = summary;
  // book.title = summary.title;
  // book.publisher = summary.publisher;
  // book.authors = summary.author.split(" ");
  // book.pages = json[0].onix?.DescriptiveDetail?.Extent[0].ExtentValue;
  // book.cover = summary.cover;
  // book.notes = json[0].onix?.CollateralDetail?.TextContent.map(
  //   (e) => e.Text
  // ).join("\n\n");
  // return book;
};

exports.handler = function(event, context, callback) {
  const isbn = event.queryStringParameters.isbn || "9784478109373";

  (async () => {
                try {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(await search(isbn)),
      });

      // this.setState({data: await this.getData()});
    } catch (e) {
      //...handle the error...
    }
  })();
  
// t url = "https://api.openbd.jp/v1/get?isbn=" + isbn.toString();

  //   axios.get(url).then(res => {
  //     callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify(res.data),
  //     })
  //   })
}
