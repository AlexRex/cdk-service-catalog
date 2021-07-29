#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { S3BucketProduct } from "./products/s3-bucket";
import { existsSync } from "fs";

export class ServiceCatalogStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // we depend on the synth phase to have been performed
    if (!existsSync("cdk.out")) {
      return;
    }
    new S3BucketProduct(this, "S3BucketProduct");
  }
}

const app = new cdk.App();

if (!process.env.AWS_REGION)
  throw Error("must set environment variable: AWS_REGION");

const { AWS_REGION, CDK_DEFAULT_ACCOUNT } = process.env;
const env = { account: CDK_DEFAULT_ACCOUNT, region: AWS_REGION };

new ServiceCatalogStack(app, "ServiceCatalogStack", {
  env,
});
