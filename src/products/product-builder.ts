#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { ProductTemplate } from "./product.model";

export const synthProduct = (product: ProductTemplate) => {
  const app = new cdk.App({
    runtimeInfo: false,
    stackTraces: false,
    treeMetadata: false,
  });

  new product.stack(app, product.name);

  app.synth();

  return product.name;
};
