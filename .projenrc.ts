import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Lora Reames',
  authorAddress: 'shes.lora.reames@gmail.com',
  cdkVersion: '2.178.1',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.7.0',
  name: 'cdk-tag-enforcer',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/lora-reames/cdk-tag-enforcer',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  deps: ['@aws-cdk/assert'],
  bundledDeps: ['@aws-cdk/assert'],
  // packageName: undefined,  /* The "name" in package.json. */
  peerDeps: ['aws-cdk-lib', 'constructs'],

  tsconfig: {
    compilerOptions: {
      incremental: true,
    },
  },
});
project.synth();