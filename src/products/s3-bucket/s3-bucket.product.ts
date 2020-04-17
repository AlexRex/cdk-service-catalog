import * as cdk from '@aws-cdk/core';
import { CfnCloudFormationProduct } from '@aws-cdk/aws-servicecatalog';
import { Asset } from '@aws-cdk/aws-s3-assets';
import { getProductTemplate } from '../product-builder';
import { S3ProductTemplate } from './s3-bucket.template';

export class S3BucketProduct extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const template = getProductTemplate(S3ProductTemplate);

    const asset = new Asset(this, 'S3ProductAsset', {
      path: template.templatePath
    });

    new CfnCloudFormationProduct(this, 's3-product', {
      name: 'S3 Product',
      description: 'This is an s3 product',
      owner: 'whoever',
      provisioningArtifactParameters: [
        {
          info: {
            LoadTemplateFromURL: asset.s3Url
          }
        }
      ]
    });
  }
}
