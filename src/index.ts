import * as cdk from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

export interface ITagValue {
  /** equivilant to '@@assign' in a JSON Tag policy*/
  assign?: string[];
}

export interface ITagKey {
  /** equivilant to '@@assign' in a JSON Tag policy*/
  assign: string;
}

export interface ITagEnforcedFor {
  /** equivilant to '@@assign' in a JSON Tag policy*/
  assign?: string[];
}

// TODO support other operators?
// '@@append' & '@remove'
// '@@operators_allowed_for_child_policies';
// https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_example-tag-policies.html
export interface TagRule {
  readonly tagKey: ITagKey;
  readonly tagValue?: ITagValue;
  readonly enforcedFor?: ITagEnforcedFor;
}

export type TagPolicy = Record<string, TagRule>;
export interface ITagPolicyConfig {
  /**
   * The tag policy to enforce
   * https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_example-tag-policies.html
   */
  readonly tagPolicy: TagPolicy;
}

/**
 * A CDK Aspect that enforces AWS tag policies on taggable resources
 */
export class TagEnforcer implements cdk.IAspect {
  private readonly tagPolicy: TagPolicy;
  constructor(config: ITagPolicyConfig) {
    this.tagPolicy = config.tagPolicy;
  }

  public visit(node: IConstruct): void {
    // skip default
    if (node.node.id === 'Default') {
      return;
    }

    const isTaggable = cdk.TagManager.isTaggable(node);
    const isTaggableV2 = cdk.TagManager.isTaggableV2(node);
    if (isTaggable || isTaggableV2) {
      this.validateTags(node);
    }
  }

  private validateTags(node: IConstruct): void {
    const tags = cdk.TagManager.of(node)?.tagValues();
    // Check required tags
    for (const [_tagPolicyKey, rule] of Object.entries(this.tagPolicy)) {
      const requiredKey = rule.tagKey.assign;

      // Check if the tag exists with the correct case
      const hasTag = tags?.[requiredKey] !== undefined;
      if (!hasTag) {
        cdk.Annotations.of(node).addWarning(
          `Missing required tag: ${requiredKey} or the tag key case doesn't match the required case`,
        );
      }
      if (hasTag && rule.tagValue) {
        const tagValue = tags?.[requiredKey];
        const legalValue = rule.tagValue.assign?.includes(tagValue);
        if (!legalValue) {
          cdk.Annotations.of(node).addWarning(
            `Illegal Tag Value for required tag: ${requiredKey}`,
          );
        }
      }
    }
  }
}