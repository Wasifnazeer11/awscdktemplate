#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NpxpackageStack } from '../lib/npxpackage-stack';


import { execSync } from "child_process";

const runCommand = (command:any)  => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/Wasifnazeer11/awscdktemplate.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);

const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) {
  process.exit(1);
}

console.log(`Installing dependencies for ${repoName}`);

const installedDeps = runCommand(installDepsCommand);

if (!installedDeps) {
  process.exit(1);
}

console.log("Congrats ! You are ready. Follow the following commands to start");
console.log(`cd ${repoName} && npm run dev`);

const app = new cdk.App();
new NpxpackageStack(app, 'NpxpackageStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});