# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### TagRule <a name="TagRule" id="cdk-tag-enforcer.TagRule"></a>

#### Initializer <a name="Initializer" id="cdk-tag-enforcer.TagRule.Initializer"></a>

```typescript
import { TagRule } from 'cdk-tag-enforcer'

const tagRule: TagRule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-tag-enforcer.TagRule.property.tagKey">tagKey</a></code> | <code><a href="#cdk-tag-enforcer.ITagKey">ITagKey</a></code> | *No description.* |
| <code><a href="#cdk-tag-enforcer.TagRule.property.enforcedFor">enforcedFor</a></code> | <code><a href="#cdk-tag-enforcer.ITagEnforcedFor">ITagEnforcedFor</a></code> | *No description.* |
| <code><a href="#cdk-tag-enforcer.TagRule.property.tagValue">tagValue</a></code> | <code><a href="#cdk-tag-enforcer.ITagValue">ITagValue</a></code> | *No description.* |

---

##### `tagKey`<sup>Required</sup> <a name="tagKey" id="cdk-tag-enforcer.TagRule.property.tagKey"></a>

```typescript
public readonly tagKey: ITagKey;
```

- *Type:* <a href="#cdk-tag-enforcer.ITagKey">ITagKey</a>

---

##### `enforcedFor`<sup>Optional</sup> <a name="enforcedFor" id="cdk-tag-enforcer.TagRule.property.enforcedFor"></a>

```typescript
public readonly enforcedFor: ITagEnforcedFor;
```

- *Type:* <a href="#cdk-tag-enforcer.ITagEnforcedFor">ITagEnforcedFor</a>

---

##### `tagValue`<sup>Optional</sup> <a name="tagValue" id="cdk-tag-enforcer.TagRule.property.tagValue"></a>

```typescript
public readonly tagValue: ITagValue;
```

- *Type:* <a href="#cdk-tag-enforcer.ITagValue">ITagValue</a>

---

## Classes <a name="Classes" id="Classes"></a>

### TagEnforcer <a name="TagEnforcer" id="cdk-tag-enforcer.TagEnforcer"></a>

- *Implements:* aws-cdk-lib.IAspect

A CDK Aspect that enforces AWS tag policies on taggable resources.

#### Initializers <a name="Initializers" id="cdk-tag-enforcer.TagEnforcer.Initializer"></a>

```typescript
import { TagEnforcer } from 'cdk-tag-enforcer'

new TagEnforcer(config: ITagPolicyConfig)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-tag-enforcer.TagEnforcer.Initializer.parameter.config">config</a></code> | <code><a href="#cdk-tag-enforcer.ITagPolicyConfig">ITagPolicyConfig</a></code> | *No description.* |

---

##### `config`<sup>Required</sup> <a name="config" id="cdk-tag-enforcer.TagEnforcer.Initializer.parameter.config"></a>

- *Type:* <a href="#cdk-tag-enforcer.ITagPolicyConfig">ITagPolicyConfig</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-tag-enforcer.TagEnforcer.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="cdk-tag-enforcer.TagEnforcer.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="cdk-tag-enforcer.TagEnforcer.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---




## Protocols <a name="Protocols" id="Protocols"></a>

### ITagEnforcedFor <a name="ITagEnforcedFor" id="cdk-tag-enforcer.ITagEnforcedFor"></a>

- *Implemented By:* <a href="#cdk-tag-enforcer.ITagEnforcedFor">ITagEnforcedFor</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-tag-enforcer.ITagEnforcedFor.property.assign">assign</a></code> | <code>string[]</code> | equivilant to '@@assign' in a JSON Tag policy. |

---

##### `assign`<sup>Optional</sup> <a name="assign" id="cdk-tag-enforcer.ITagEnforcedFor.property.assign"></a>

```typescript
public readonly assign: string[];
```

- *Type:* string[]

equivilant to '@@assign' in a JSON Tag policy.

---

### ITagKey <a name="ITagKey" id="cdk-tag-enforcer.ITagKey"></a>

- *Implemented By:* <a href="#cdk-tag-enforcer.ITagKey">ITagKey</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-tag-enforcer.ITagKey.property.assign">assign</a></code> | <code>string</code> | equivilant to '@@assign' in a JSON Tag policy. |

---

##### `assign`<sup>Required</sup> <a name="assign" id="cdk-tag-enforcer.ITagKey.property.assign"></a>

```typescript
public readonly assign: string;
```

- *Type:* string

equivilant to '@@assign' in a JSON Tag policy.

---

### ITagPolicyConfig <a name="ITagPolicyConfig" id="cdk-tag-enforcer.ITagPolicyConfig"></a>

- *Implemented By:* <a href="#cdk-tag-enforcer.ITagPolicyConfig">ITagPolicyConfig</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-tag-enforcer.ITagPolicyConfig.property.tagPolicy">tagPolicy</a></code> | <code>{[ key: string ]: <a href="#cdk-tag-enforcer.TagRule">TagRule</a>}</code> | The tag policy to enforce https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_example-tag-policies.html. |

---

##### `tagPolicy`<sup>Required</sup> <a name="tagPolicy" id="cdk-tag-enforcer.ITagPolicyConfig.property.tagPolicy"></a>

```typescript
public readonly tagPolicy: {[ key: string ]: TagRule};
```

- *Type:* {[ key: string ]: <a href="#cdk-tag-enforcer.TagRule">TagRule</a>}

The tag policy to enforce https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_example-tag-policies.html.

---

### ITagValue <a name="ITagValue" id="cdk-tag-enforcer.ITagValue"></a>

- *Implemented By:* <a href="#cdk-tag-enforcer.ITagValue">ITagValue</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-tag-enforcer.ITagValue.property.assign">assign</a></code> | <code>string[]</code> | equivilant to '@@assign' in a JSON Tag policy. |

---

##### `assign`<sup>Optional</sup> <a name="assign" id="cdk-tag-enforcer.ITagValue.property.assign"></a>

```typescript
public readonly assign: string[];
```

- *Type:* string[]

equivilant to '@@assign' in a JSON Tag policy.

---

