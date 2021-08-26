#!/usr/bin/env python3
from aws_cdk import core as cdk
from aws_cdk.aws_s3 import Bucket
from ..product_model import ProductTemplate
from aws_cdk.core import CfnParameter, CfnOutput, Fn


class S3StackTemplate(cdk.Stack):
    def __init__(self, scope: cdk.Construct, id: str, **kwargs):
        super().__init__(scope, id, **kwargs)
        bucketName = CfnParameter(self, "BucketName")
        self.template_options.metadata = {
            'AWS::CloudFormation::Interface': {
                'ParameterGroups': [
                    {
                        'Label': {'default': 'Bucket Configuration'},
                        'Parameters': [bucketName.logical_id]
                    }
                ],
                'ParameterLabels': {
                    bucketName.logical_id: {
                        'default': 'Which name should the bucket have'
                    }
                }
            }
        }

        bucket = Bucket(self, 'test-bucket',
                        bucket_name=bucketName.value_as_string)

        CfnOutput(self, 'S3Id', value=bucket.bucket_arn,
                  export_name=Fn.sub('${AWS::StackName}-S3Id'))


S3ProductTemplate = ProductTemplate(
    stack=S3StackTemplate,
    name='S3Product'
)
