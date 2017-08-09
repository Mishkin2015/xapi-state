import assertError from 'jscommons/dist/tests/utils/assertError';
import NonJsonObject from '../../../errors/NonJsonObject';
import assertImmutableState from '../../../utils/assertImmutableState';
import assertState from '../../../utils/assertState';
import createImmutableState from '../../../utils/createImmutableState';
import createObjectState from '../../../utils/createObjectState';
import {
  JSON_CONTENT_TYPE,
  TEST_ACCOUNT_AGENT,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OBJECT_MERGED_CONTENT,
  TEST_OBJECT_PATCH_CONTENT,
  TEST_OPENID_AGENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';
import patchState from './utils/patchState';

describe('patchState with existing object content', () => {
  setup();

  it('should error when patching with text content', async () => {
    await createObjectState();
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with JSON content', async () => {
    await createObjectState();
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should merge when patching with object content', async () => {
    await createObjectState();
    await patchContent(TEST_OBJECT_PATCH_CONTENT, JSON_CONTENT_TYPE);
    await assertState(TEST_OBJECT_MERGED_CONTENT);
  });

  it('should merge when patching without registration', async () => {
    await createObjectState();
    await patchState({ registration: undefined }, TEST_OBJECT_PATCH_CONTENT);
    await assertState(TEST_OBJECT_MERGED_CONTENT);
  });

  it('should not patch existing models when patching a non-existing model', async () => {
    await patchState();
    await createImmutableState();
    await patchState();
    await assertImmutableState();
  });

  it('should merge when patching with mbox', async () => {
    await createObjectState({ agent: TEST_MBOX_AGENT });
    await patchState({ agent: TEST_MBOX_AGENT }, TEST_OBJECT_PATCH_CONTENT);
    await assertState(TEST_OBJECT_MERGED_CONTENT, { agent: TEST_MBOX_AGENT });
  });

  it('should merge when patching with mbox_sha1sum', async () => {
    await createObjectState({ agent: TEST_MBOXSHA1_AGENT });
    await patchState({ agent: TEST_MBOXSHA1_AGENT }, TEST_OBJECT_PATCH_CONTENT);
    await assertState(TEST_OBJECT_MERGED_CONTENT, { agent: TEST_MBOXSHA1_AGENT });
  });

  it('should merge when patching with openid', async () => {
    await createObjectState({ agent: TEST_OPENID_AGENT });
    await patchState({ agent: TEST_OPENID_AGENT }, TEST_OBJECT_PATCH_CONTENT);
    await assertState(TEST_OBJECT_MERGED_CONTENT, { agent: TEST_OPENID_AGENT });
  });

  it('should merge when patching with account', async () => {
    await createObjectState({ agent: TEST_ACCOUNT_AGENT });
    await patchState({ agent: TEST_ACCOUNT_AGENT }, TEST_OBJECT_PATCH_CONTENT);
    await assertState(TEST_OBJECT_MERGED_CONTENT, { agent: TEST_ACCOUNT_AGENT });
  });
});
