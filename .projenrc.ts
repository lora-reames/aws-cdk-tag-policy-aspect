import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Lora Reames',
  authorAddress: 'shes.lora.reames@gmail.com',
  cdkVersion: '2.68.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.7.0',
  name: 'aws-cdk-tag-policy-aspect',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/shes.lora.reames/aws-cdk-tag-policy-aspect.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  deps: ['@aws-cdk/assert'],
  // packageName: undefined,  /* The "name" in package.json. */

  // Make sure we export all our types
  publishToPypi: {
    distName: 'cdk-tag-policy',
    module: 'cdk_tag_policy',
  },

  // Add AWS CDK as peer dependency
  peerDeps: ['aws-cdk-lib', 'constructs'],
});
project.synth();