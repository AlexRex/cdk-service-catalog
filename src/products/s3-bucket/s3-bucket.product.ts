import * as cdk from "@aws-cdk/core";
import { join } from "path";
import {
  CloudFormationTemplate,
  CloudFormationProduct,
} from "@aws-cdk/aws-servicecatalog";
import { synthProduct } from "../product-builder";
import { S3ProductTemplate } from "./s3-bucket.template";

export class S3BucketProduct extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const productName = synthProduct(S3ProductTemplate);

    new CloudFormationProduct(this, "s3-product", {
      productName: "S3 Product",
      description: "This is an s3 product",
      owner: "whoever",
      productVersions: [
        {
          productVersionName: "v1",
          cloudFormationTemplate: CloudFormationTemplate.fromAsset(
            join("cdk.out", `${productName}.template.json`)
          ),
        },
      ],
    });
  }
}
