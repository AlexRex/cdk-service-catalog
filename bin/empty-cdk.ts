#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EmptyCdkStack } from '../lib/empty-cdk-stack';

const app = new cdk.App();
new EmptyCdkStack(app, 'EmptyCdkStack');
