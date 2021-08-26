#!/usr/bin/env python3
from aws_cdk.core import Stack


class ProductTemplate:
    stack: Stack
    name: str

    def __init__(self, stack: Stack, name: str):
        self.stack = stack
        self.name = name
