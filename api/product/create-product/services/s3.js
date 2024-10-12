import {
  S3Client,
  PutObjectCommand,
  PutBucketCorsCommand,
} from "@aws-sdk/client-s3";
import "dotenv/config";

const client = new S3Client({});
/**
 *this function stores the image in a buffer and returns the url of the image.
 * @param {string} key
 * @param {ArrayBuffer} body
 * @param {string} contentType
 * @returns {string}
 */
export async function uploadObject(key, body, contentType) {
  const nameKey = `${Date.now()}-${key}`;
  const input = {
    Body: body,
    Bucket: process.env.NAMEBUCKET,
    Key: nameKey,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(input);
  const response = await client.send(command);

  if (response.$metadata.httpStatusCode == 200) {
    return `https://${process.env.NAMEBUCKET}.s3.amazonaws.com/${nameKey}`;
  } else {
    return " ";
  }
}
