#!/usr/bin/env python3
from aws_cdk.aws_servicecatalog import CloudFormationProduct, CloudFormationTemplate
from aws_cdk import core as cdk
from ..product_builder import SynthProduct
from products.s3_bucket.s3_bucket_template import S3ProductTemplate
from os import path


class S3BucketProduct(cdk.Construct):
    def __init__(self, scope: cdk.Stack, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        productName = SynthProduct(S3ProductTemplate).productName

        CloudFormationProduct(
            self, 's3-product',
            product_name="S3 Product",
            description="This is an S3 product",
            owner="whoever",
            product_versions=[
                {
                    'productVersionName': 'v1',
                    'cloudFormationTemplate': CloudFormationTemplate.from_asset(
                        path.join(
                            "cdk.out", f'{productName}.template.json')
                    ),
                },
            ])
