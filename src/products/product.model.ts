import { Stack } from '@aws-cdk/core';

export type ProductTemplate = {
  stack: typeof Stack;
  name: string;
};
