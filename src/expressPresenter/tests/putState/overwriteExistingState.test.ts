import assertImmutableState from '../../../utils/assertImmutableState';
import assertState from '../../../utils/assertState';
import createImmutableState from '../../../utils/createImmutableState';
import createTextState from '../../../utils/createTextState';
import {
  TEST_ACCOUNT_AGENT,
  TEST_IMMUTABLE_CONTENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
 } from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('expressPresenter.putState with existing model', () => {
  setup();

  it('should 400 without version header', async () => {
    await createTextState();
    await overwriteState({}, TEST_IMMUTABLE_CONTENT, '', false).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should overwrite model when overwriting an existing model', async () => {
    await createTextState();
    await overwriteState({}, TEST_IMMUTABLE_CONTENT).expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_IMMUTABLE_CONTENT);
  });

  it('should overwrite model when overwriting without a registration', async () => {
    await createTextState();
    await overwriteState({ registration: undefined }, TEST_IMMUTABLE_CONTENT)
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_IMMUTABLE_CONTENT);
  });

  it('should not overwrite non-matched models', async () => {
    await createTextState();
    await createImmutableState();
    await overwriteState();
    await assertImmutableState();
  });

  it('should overwrite model when overwriting with mbox', async () => {
    await createTextState({ agent: TEST_MBOX_AGENT });
    await overwriteState({ agent: JSON.stringify(TEST_MBOX_AGENT) }, TEST_IMMUTABLE_CONTENT)
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_IMMUTABLE_CONTENT, { agent: TEST_MBOX_AGENT });
  });

  it('should overwrite model when overwriting with mbox_sha1sum', async () => {
    await createTextState({ agent: TEST_MBOXSHA1_AGENT });
    await overwriteState({ agent: JSON.stringify(TEST_MBOXSHA1_AGENT) }, TEST_IMMUTABLE_CONTENT)
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_IMMUTABLE_CONTENT, { agent: TEST_MBOXSHA1_AGENT });
  });

  it('should overwrite model when overwriting with openid', async () => {
    await createTextState({ agent: TEST_OPENID_AGENT });
    await overwriteState({ agent: JSON.stringify(TEST_OPENID_AGENT) }, TEST_IMMUTABLE_CONTENT)
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_IMMUTABLE_CONTENT, { agent: TEST_OPENID_AGENT });
  });

  it('should overwrite model when overwriting with account', async () => {
    await createTextState({ agent: TEST_ACCOUNT_AGENT });
    await overwriteState({ agent: JSON.stringify(TEST_ACCOUNT_AGENT) }, TEST_IMMUTABLE_CONTENT)
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_IMMUTABLE_CONTENT, { agent: TEST_ACCOUNT_AGENT });
  });
});
