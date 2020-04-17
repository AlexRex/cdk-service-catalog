import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { CfnParameter, CfnOutput, Fn } from '@aws-cdk/core';
import { ProductTemplate } from '../product.model';

class S3StackTemplate extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketName = new CfnParameter(this, 'BucketName');

    this.templateOptions.metadata = {
      'AWS::CloudFormation::Interface': {
        ParameterGroups: [
          {
            Label: { default: 'Bucket Configuration' },
            Parameters: [bucketName.logicalId]
          }
        ],
        ParameterLabels: {
          [bucketName.logicalId]: {
            default: 'Which name should the bucket have'
          }
        }
      }
    }

    const bucket = new Bucket(this, 'test-bucket', {
      bucketName: bucketName.valueAsString
    });

    new CfnOutput(this, 'S3Id', {
      value: bucket.bucketArn,
      exportName: Fn.sub('${AWS::StackName}-S3Id')
    })
  }
}

export const S3ProductTemplate: ProductTemplate = {
  stack: S3StackTemplate,
  name: 'S3Product'
};
