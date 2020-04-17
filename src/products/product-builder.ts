#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ProductTemplate } from './product.model';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

export const getProductTemplate = (product: ProductTemplate) => {
  const app = new cdk.App({
    runtimeInfo: false,
    stackTraces: false,
    treeMetadata: false
  });

  const defEnv = {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: 'eu-west-1'
    }
  };

  new product.stack(app, product.name, defEnv);

  const synth = app.synth();

  const template = synth.getStackArtifact(product.name).template;

  const templateDir = './templates';

  if (!existsSync(templateDir)) {
    mkdirSync(templateDir);
  }
  
  const templatePath = `${templateDir}/${product.name}.template.json`;

  writeFileSync(templatePath, JSON.stringify(template, null, 2));

  return {
    template,
    templatePath
  };
}
