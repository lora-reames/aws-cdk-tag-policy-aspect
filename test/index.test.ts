import { SynthUtils } from '@aws-cdk/assert';
import { Stack, Aspects, Tags, AspectPriority } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { SynthesisMessageLevel } from 'aws-cdk-lib/cx-api';
import { Construct } from 'constructs';
import { expectMessages } from './test-utils';
import { TagPolicy, TagEnforcer } from '../src/index';

describe('TagEnforcer', () => {
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

  test('no messages added when tags are correct', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new TagEnforcer({ tagPolicy }), {
      priority: AspectPriority.READONLY,
    });

    const bucket = new s3.Bucket(stack, 'TestBucket', {
      versioned: true,
    });

    Tags.of(bucket).add('CostCenter', 'Marketing');
    Tags.of(bucket).add('Project', 'Website');

    const messages = SynthUtils.synthesize(stack).messages;
    expect(messages.length).toEqual(0);
  });

  test('adds warn annotation when required tag is missing', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new TagEnforcer({ tagPolicy }), {
      priority: AspectPriority.READONLY,
    });

    new s3.Bucket(stack, 'TestBucket', {
      versioned: true,
    });

    const messages = SynthUtils.synthesize(stack).messages;

    expectMessages(
      messages,
      {
        containing: [
          'Missing required tag: CostCenter',
          'Missing required tag: Project',
        ],
        level: SynthesisMessageLevel.WARNING,
        length: 2,
      },
    );
  });

  test('adds warning annotation when tag case is incorrect', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new TagEnforcer({ tagPolicy }), {
      priority: AspectPriority.READONLY,
    });

    const bucket = new s3.Bucket(stack, 'TestBucket', {
      versioned: true,
    });

    Tags.of(bucket).add('costcenter', 'Marketing');
    Tags.of(bucket).add('project', 'Website');

    const messages = SynthUtils.synthesize(stack).messages;
    expectMessages(messages, {
      containing: [
        'Missing required tag: CostCenter',
        'Missing required tag: Project',
      ],
      level: SynthesisMessageLevel.WARNING,
      length: 2,
    });
  });

  test('adds warning for incorrect tag_value', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new TagEnforcer({ tagPolicy }), {
      priority: AspectPriority.READONLY,
    });

    const bucket = new s3.Bucket(stack, 'TestBucket', {
      versioned: true,
    });

    Tags.of(bucket).add('CostCenter', 'NOTMARKETING');
    Tags.of(bucket).add('Project', 'Website');

    const messages = SynthUtils.synthesize(stack).messages;
    expect(messages.length).toEqual(1);
    expect(messages[0].entry.data).toMatch(
      /Illegal Tag Value for required tag: CostCenter/,
    );
    expect(messages[0].level).toEqual(SynthesisMessageLevel.WARNING);
  });

  test('validates tags applied to a parent construct', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new TagEnforcer({ tagPolicy }), {
      priority: AspectPriority.READONLY,
    });

    class ParentConstruct extends Construct {
      constructor(scope: Construct, id: string) {
        super(scope, id);
        new s3.Bucket(this, 'TestBucket', {
          versioned: true,
        });
      }
    }

    const parentConstruct = new ParentConstruct(stack, 'TheParentConstruct');

    Tags.of(parentConstruct).add('CostCenter', 'Marketing');
    Tags.of(parentConstruct).add('Project', 'Website');

    const messages = SynthUtils.synthesize(stack).messages;
    expect(messages.length).toEqual(0);
  });

  test('validates tags applied at stack', () => {
    const stack = new Stack();
    Aspects.of(stack).add(new TagEnforcer({ tagPolicy }), {
      priority: AspectPriority.READONLY,
    });

    new s3.Bucket(stack, 'TestBucket', {
      versioned: true,
    });

    Tags.of(stack).add('CostCenter', 'Marketing', {
      priority: AspectPriority.MUTATING,
    });
    Tags.of(stack).add('Project', 'Website', {
      priority: AspectPriority.MUTATING,
    });

    const messages = SynthUtils.synthesize(stack).messages;
    expect(messages.length).toEqual(0);
  });
});
