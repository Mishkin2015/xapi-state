import assertDeleted from '../../../utils/assertDeleted';
import createJsonState from '../../../utils/createJsonState';
import createTextState from '../../../utils/createTextState';
import {
  TEST_ACCOUNT_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
} from '../../../utils/testValues';
import { NO_CONTENT_204_HTTP_CODE, NOT_FOUND_404_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import deleteState from './utils/deleteState';

describe('expressPresenter.deleteState with existing state', () => {
  setup();

  it('should delete when deleting text', async () => {
    await createTextState();
    await deleteState().expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted();
  });

  it('should delete when deleting json', async () => {
    await createJsonState();
    await deleteState().expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted();
  });

  it('should delete when not using registration', async () => {
    await createTextState();
    await deleteState({
      registration: undefined,
    }).expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted();
  });

  it('should error when deleting existing model without a registration with one', async () => {
    await createTextState({ registration: undefined });
    await deleteState().expect(NOT_FOUND_404_HTTP_CODE);
  });

  it('should delete when deleting with an mbox', async () => {
    await createTextState({ agent: TEST_MBOX_AGENT });
    await deleteState({ agent: JSON.stringify(TEST_MBOX_AGENT) })
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted({ agent: TEST_MBOX_AGENT });
  });

  it('should delete when deleting with an mbox_sha1sum', async () => {
    await createTextState({ agent: TEST_MBOXSHA1_AGENT });
    await deleteState({ agent: JSON.stringify(TEST_MBOXSHA1_AGENT) })
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted({ agent: TEST_MBOXSHA1_AGENT });
  });

  it('should delete when deleting with an openid', async () => {
    await createTextState({ agent: TEST_OPENID_AGENT });
    await deleteState({ agent: JSON.stringify(TEST_OPENID_AGENT) })
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted({ agent: TEST_OPENID_AGENT });
  });

  it('should delete when deleting with an account', async () => {
    await createTextState({ agent: TEST_ACCOUNT_AGENT });
    await deleteState({ agent: JSON.stringify(TEST_ACCOUNT_AGENT) })
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted({ agent: TEST_ACCOUNT_AGENT });
  });
});
