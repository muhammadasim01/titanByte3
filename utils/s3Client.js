const { S3Client } = require("@aws-sdk/client-s3");

const region = "us-east-1";

const s3Client = new S3Client({ region });

export { s3Client, region };
