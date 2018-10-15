import aws from "aws-sdk";
import { NextFunction, Request, Response, Router } from "express";

const BUCKET_NAME = "indie-makers";

class S3Router {
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  public signS3 = async (req: Request, res: Response, next: NextFunction) => {
    const {
      query: { name, type }
    } = req;
    const s3 = new aws.S3({
      signatureVersion: "v4",
      region: "ap-northeast-1",
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const s3Params = {
      Bucket: BUCKET_NAME,
      Key: name,
      Expires: 60,
      ContentType: type,
      ACL: "public-read"
    };

    try {
      const signedUrl = await s3.getSignedUrl("putObject", s3Params);
      const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${name}`;
      return res.json({
        signedUrl,
        fileUrl
      });
    } catch (error) {
      return res.json({
        error: true
      });
    }
  };

  private init() {
    this.router.get("/", this.signS3);
  }
}

export default new S3Router().router;
