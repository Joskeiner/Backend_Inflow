import Busboy from "busboy";
/**
 *This function obtains an encoded form and decodes it by separating the
 * information into two parts, one which obtains the image and the other all
 *  the text parameters that are present.
 * @param {object} event
 * @param {number} fileZise
 * @returns {Promise<object , Array<object>>}
 */
export function parserImages(event, fileZise) {
  return new Promise((resolve, reject) => {
    /**
     * @constant { Multipart | URLEncoded} bus
     */
    const bus = Busboy({
      headers: {
        "content-type":
          event.headers["Content-Type"] || event.headers["content-type"],
      },
      limits: {
        fileZise,
      },
    });

    const result = {
      files: [],
    };
    const textResult = [];
    let products = {};

    bus.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const uploadFile = {};
      file.on("data", (data) => {
        uploadFile.content = data;
      });

      file.on("end", () => {
        if (uploadFile.content) {
          uploadFile.filename = filename;
          uploadFile.mimetype = mimetype;
          uploadFile.encoding = encoding;
          uploadFile.fieldname = fieldname;
          result.files.push(uploadFile);
        }
        // console.log(`FILES : ${JSON.stringify(result.files)}`);
      });
    });
    bus.on("field", (fieldname, value) => {
      products = {
        parameter: fieldname,
        value: value,
      };
      textResult.push(products);
    });
    bus.on("error", (err) => {
      reject(err);
    });
    bus.on("finish", () => {
      resolve({ result, textResult });
    });

    bus.write(event.body, event.isBase64Encoded ? "base64" : "binary");
    bus.end();
  });
}
