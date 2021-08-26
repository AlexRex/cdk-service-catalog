#!/usr/bin/env python3
from os import getenv
from aws_cdk import core
from products.s3_bucket.s3_bucket_product import S3BucketProduct
from pathlib import Path


class ServiceCatalogsStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        if not Path("cdk.out").exists():
            return

        S3BucketProduct(self, "S3BucketProduct")


app = core.App()
if not getenv('AWS_REGION'):
    raise Exception('must set environment variable: AWS_REGION')

_env = core.Environment(account=getenv(
    'CDK_DEFAULT_ACCOUNT'), region=getenv('AWS_REGION'))

ServiceCatalogsStack(app, "ServiceCatalogStack", env=_env)
app.synth()
