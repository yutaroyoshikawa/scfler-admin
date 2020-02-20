/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { S3, config } from "aws-sdk";

config.update({
  region: process.env.EACT_APP_S3_REGION!,
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY!,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY!
});

export const s3 = new S3();
