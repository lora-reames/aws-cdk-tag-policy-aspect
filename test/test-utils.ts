/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

Borrowed from cdk-nag and modified to check optionally check message level
https://github.com/cdklabs/cdk-nag/blob/main/test/test-utils.ts
*/
import { SynthesisMessage, SynthesisMessageLevel } from 'aws-cdk-lib/cx-api';

interface ExpectMessageConditions {
  readonly containing?: string[];
  readonly notContaining?: string[];
  readonly length?: number;
  readonly level?: SynthesisMessageLevel;
}
export function expectMessages(
  messages: SynthesisMessage[],
  conditions: ExpectMessageConditions,
) {
  console.log(JSON.stringify({ messages }, null, 2));
  if (conditions.containing) {
    for (const condition of conditions.containing) {
      expect(messages).toContainEqual(
        expect.objectContaining({
          entry: expect.objectContaining({
            data: expect.stringContaining(condition),
          }),
        }),
      );
    }
  }
  if (conditions.notContaining) {
    for (const condition of conditions.notContaining) {
      expect(messages).not.toContainEqual(
        expect.objectContaining({
          entry: expect.objectContaining({
            data: expect.stringContaining(condition),
          }),
        }),
      );
    }
  }
  if (conditions.length) {
    expect(messages.length).toEqual(conditions.length);
  }
  if (conditions.level) {
    console.log('expect level', conditions.level);
    expect(messages).toContainEqual(
      expect.objectContaining({
        level: conditions.level,
      }),
    );
  }
}
