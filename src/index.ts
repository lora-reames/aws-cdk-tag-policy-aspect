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
 * A CDK Aspect that enforces AWS tag policies on resources
 */
export class TagPolicyAspect implements cdk.IAspect {
  private readonly tagPolicy: TagPolicy;
  constructor(config: ITagPolicyConfig) {
    this.tagPolicy = config.tagPolicy;
  }

  public visit(node: IConstruct): void {
    // Only check resources that implement ITaggable
    if (!cdk.TagManager.isTaggable(node)) {
      return;
    }

    // skip default
    if (node.node.id === 'Default') {
      return;
    }
    this.validateTags(node);
  }

  private validateTags(node: IConstruct): void {
    const parentScope = node.node.scope;
    if (!parentScope) return;
    const aspects = cdk.Aspects.of(parentScope).all;
    const tags = aspects.filter(aspect => (aspect as Object).constructor.name === 'Tag') as cdk.Tag[];

    console.log({ node: node.node, tags });

    // Extract tag requirements from policy
    const tagRules = this.tagPolicy || {};

    // Check required tags
    for (const [_tagPolicyKey, rule] of Object.entries(tagRules)) {
      const requiredKey = rule.tagKey?.assign;
      if (!requiredKey) continue;

      // Check if the tag exists with the correct case
      const hasTag = tags.some(tag => tag.key === requiredKey);
      console.log(`node has required tag ${requiredKey}:`, hasTag);
      if (!hasTag) {
        cdk.Annotations.of(node).addError(
          `Missing required tag: ${requiredKey} or the tag key case doesn't match the required case`,
        );
      }
      if (hasTag && rule.tagValue) {
        console.log('TAG VALUE RULE');
        const tag = tags.find(({ key }) => key === requiredKey);
        console.log({ tag, rule: rule.tagValue });
        if (!tag) {return;}
        const legalValue = rule.tagValue.assign?.includes(tag.value);
        console.log({ legalValue });
        if (!legalValue) {
          cdk.Annotations.of(node).addError(
            `Illegal Tag Value for required tag: ${requiredKey}`,
          );
        }
      }
    }
  }
}