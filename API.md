# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### TagRule <a name="TagRule" id="aws-cdk-tag-policy-aspect.TagRule"></a>

#### Initializer <a name="Initializer" id="aws-cdk-tag-policy-aspect.TagRule.Initializer"></a>

```typescript
import { TagRule } from 'aws-cdk-tag-policy-aspect'

const tagRule: TagRule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-tag-policy-aspect.TagRule.property.tagKey">tagKey</a></code> | <code><a href="#aws-cdk-tag-policy-aspect.ITagKey">ITagKey</a></code> | *No description.* |
| <code><a href="#aws-cdk-tag-policy-aspect.TagRule.property.enforcedFor">enforcedFor</a></code> | <code><a href="#aws-cdk-tag-policy-aspect.ITagEnforcedFor">ITagEnforcedFor</a></code> | *No description.* |
| <code><a href="#aws-cdk-tag-policy-aspect.TagRule.property.tagValue">tagValue</a></code> | <code><a href="#aws-cdk-tag-policy-aspect.ITagValue">ITagValue</a></code> | *No description.* |

---

##### `tagKey`<sup>Required</sup> <a name="tagKey" id="aws-cdk-tag-policy-aspect.TagRule.property.tagKey"></a>

```typescript
public readonly tagKey: ITagKey;
```

- *Type:* <a href="#aws-cdk-tag-policy-aspect.ITagKey">ITagKey</a>

---

##### `enforcedFor`<sup>Optional</sup> <a name="enforcedFor" id="aws-cdk-tag-policy-aspect.TagRule.property.enforcedFor"></a>

```typescript
public readonly enforcedFor: ITagEnforcedFor;
```

- *Type:* <a href="#aws-cdk-tag-policy-aspect.ITagEnforcedFor">ITagEnforcedFor</a>

---

##### `tagValue`<sup>Optional</sup> <a name="tagValue" id="aws-cdk-tag-policy-aspect.TagRule.property.tagValue"></a>

```typescript
public readonly tagValue: ITagValue;
```

- *Type:* <a href="#aws-cdk-tag-policy-aspect.ITagValue">ITagValue</a>

---

## Classes <a name="Classes" id="Classes"></a>

### TagPolicyAspect <a name="TagPolicyAspect" id="aws-cdk-tag-policy-aspect.TagPolicyAspect"></a>

- *Implements:* aws-cdk-lib.IAspect

A CDK Aspect that enforces AWS tag policies on resources.

#### Initializers <a name="Initializers" id="aws-cdk-tag-policy-aspect.TagPolicyAspect.Initializer"></a>

```typescript
import { TagPolicyAspect } from 'aws-cdk-tag-policy-aspect'

new TagPolicyAspect(config: ITagPolicyConfig)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-tag-policy-aspect.TagPolicyAspect.Initializer.parameter.config">config</a></code> | <code><a href="#aws-cdk-tag-policy-aspect.ITagPolicyConfig">ITagPolicyConfig</a></code> | *No description.* |

---

##### `config`<sup>Required</sup> <a name="config" id="aws-cdk-tag-policy-aspect.TagPolicyAspect.Initializer.parameter.config"></a>

- *Type:* <a href="#aws-cdk-tag-policy-aspect.ITagPolicyConfig">ITagPolicyConfig</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-cdk-tag-policy-aspect.TagPolicyAspect.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="aws-cdk-tag-policy-aspect.TagPolicyAspect.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="aws-cdk-tag-policy-aspect.TagPolicyAspect.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---




## Protocols <a name="Protocols" id="Protocols"></a>

### ITagEnforcedFor <a name="ITagEnforcedFor" id="aws-cdk-tag-policy-aspect.ITagEnforcedFor"></a>

- *Implemented By:* <a href="#aws-cdk-tag-policy-aspect.ITagEnforcedFor">ITagEnforcedFor</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-tag-policy-aspect.ITagEnforcedFor.property.assign">assign</a></code> | <code>string[]</code> | equivilant to '@@assign' in a JSON Tag policy. |

---

##### `assign`<sup>Optional</sup> <a name="assign" id="aws-cdk-tag-policy-aspect.ITagEnforcedFor.property.assign"></a>

```typescript
public readonly assign: string[];
```

- *Type:* string[]

equivilant to '@@assign' in a JSON Tag policy.

---

### ITagKey <a name="ITagKey" id="aws-cdk-tag-policy-aspect.ITagKey"></a>

- *Implemented By:* <a href="#aws-cdk-tag-policy-aspect.ITagKey">ITagKey</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-tag-policy-aspect.ITagKey.property.assign">assign</a></code> | <code>string</code> | equivilant to '@@assign' in a JSON Tag policy. |

---

##### `assign`<sup>Required</sup> <a name="assign" id="aws-cdk-tag-policy-aspect.ITagKey.property.assign"></a>

```typescript
public readonly assign: string;
```

- *Type:* string

equivilant to '@@assign' in a JSON Tag policy.

---

### ITagPolicyConfig <a name="ITagPolicyConfig" id="aws-cdk-tag-policy-aspect.ITagPolicyConfig"></a>

- *Implemented By:* <a href="#aws-cdk-tag-policy-aspect.ITagPolicyConfig">ITagPolicyConfig</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-tag-policy-aspect.ITagPolicyConfig.property.tagPolicy">tagPolicy</a></code> | <code>{[ key: string ]: <a href="#aws-cdk-tag-policy-aspect.TagRule">TagRule</a>}</code> | The tag policy to enforce https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_example-tag-policies.html. |

---

##### `tagPolicy`<sup>Required</sup> <a name="tagPolicy" id="aws-cdk-tag-policy-aspect.ITagPolicyConfig.property.tagPolicy"></a>

```typescript
public readonly tagPolicy: {[ key: string ]: TagRule};
```

- *Type:* {[ key: string ]: <a href="#aws-cdk-tag-policy-aspect.TagRule">TagRule</a>}

The tag policy to enforce https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_example-tag-policies.html.

---

### ITagValue <a name="ITagValue" id="aws-cdk-tag-policy-aspect.ITagValue"></a>

- *Implemented By:* <a href="#aws-cdk-tag-policy-aspect.ITagValue">ITagValue</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-tag-policy-aspect.ITagValue.property.assign">assign</a></code> | <code>string[]</code> | equivilant to '@@assign' in a JSON Tag policy. |

---

##### `assign`<sup>Optional</sup> <a name="assign" id="aws-cdk-tag-policy-aspect.ITagValue.property.assign"></a>

```typescript
public readonly assign: string[];
```

- *Type:* string[]

equivilant to '@@assign' in a JSON Tag policy.

---

