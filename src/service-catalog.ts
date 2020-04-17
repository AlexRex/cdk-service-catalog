#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { S3BucketProduct } from './products/s3-bucket';

export class ServiceCatalogStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new S3BucketProduct(this, 'S3BucketProduct');
  }
}

const app = new cdk.App();
new ServiceCatalogStack(app, 'ServiceCatalogStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'eu-west-1'
  }
});
