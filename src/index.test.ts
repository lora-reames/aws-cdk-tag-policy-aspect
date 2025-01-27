import { SynthUtils } from '@aws-cdk/assert';
import { Stack, Aspects, Tags } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
// import { Template, Match } from 'aws-cdk-lib/assertions';
import { SynthesisMessageLevel } from 'aws-cdk-lib/cx-api';
import { TagPolicy, TagPolicyAspect } from './index';

describe('TagPolicyAspect', () => {
  const tagPolicy: TagPolicy = {
    CostCenter: {
      tagKey: {
        assign: 'CostCenter',
      },
      tagValue: {
        assign: ['Marketing'],
      },
    },
    Project: {
      tagKey: {
        assign: 'Project',
      },
    },
  };

  test('passes when tags are correct', () => {
    const stack = new Stack();

    const bucket = new s3.Bucket(stack, 'TestBucket', {
      versioned: true,
    });

    Tags.of(bucket).add('CostCenter', 'Marketing');
    Tags.of(bucket).add('Project', 'Website');

    Aspects.of(stack).add(new TagPolicyAspect({ tagPolicy }));

    // Check that no error annotations exist
    const messages = SynthUtils.synthesize(stack).messages;
    expect(messages.length).toEqual(0);
  });

  test('adds error annotation when required tag is missing', () => {
    const stack = new Stack();

    new s3.Bucket(stack, 'TestBucket', {
      versioned: true,
    });

    // Tags.of(bucket).add('CostCenter', 'Marketing');
    Aspects.of(stack).add(new TagPolicyAspect({ tagPolicy }));

    // Synthesize and check for error annotation
    const messages = SynthUtils.synthesize(stack).messages;
    expect(messages.length).toEqual(2);
    expect(messages[0].entry.data).toMatch(/Missing required tag: CostCenter/);
    expect(messages[1].entry.data).toMatch(/Missing required tag: Project/);
  });

  test('adds error annotation when tag case is incorrect', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new TagPolicyAspect({ tagPolicy }));

    const bucket = new s3.Bucket(stack, 'TestBucket', {
      versioned: true,
    });

    Tags.of(bucket).add('costcenter', 'Marketing');
    Tags.of(bucket).add('project', 'Website');

    // Synthesize and check for error annotation
    const messages = SynthUtils.synthesize(stack).messages;
    expect(messages.length).toEqual(2); // One error for each incorrect tag
    expect(messages[0].entry.data).toMatch(
      /Missing required tag: CostCenter/,
    );
    expect(messages[1].entry.data).toMatch(
      /Missing required tag: Project/,
    );
  });

  test('incorrect tag_value should add error', () => {
    const stack = new Stack();

    const bucket = new s3.Bucket(stack, 'TestBucket', {
      versioned: true,
    });

    Tags.of(bucket).add('CostCenter', 'NOTMARKETING');
    Tags.of(bucket).add('Project', 'Website');

    Aspects.of(stack).add(new TagPolicyAspect({ tagPolicy }));

    // Check that no error annotations exist
    const messages = SynthUtils.synthesize(stack).messages;
    expect(messages.length).toEqual(1);
    expect(messages[0].entry.data).toMatch(/Illegal Tag Value for required tag: CostCenter/);
    expect(messages[0].level).toEqual(SynthesisMessageLevel.ERROR);
  });

});