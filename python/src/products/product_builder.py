#!/usr/bin/env python3
from aws_cdk import core as cdk
from products.product_model import ProductTemplate


class SynthProduct():
    productName: str

    def __init__(self, product: ProductTemplate) -> None:
        app = cdk.App(
            runtime_info=False,
            stack_traces=False,
            tree_metadata=False
        )
        product.stack(app, product.name)
        app.synth()
        self.productName = product.name
