import assertState from '../../../utils/assertState';
import { xapiHeaderVersion } from '../../../utils/constants';
import createObjectState from '../../../utils/createObjectState';
import {
  ALTERNATE_CONTENT_TYPE,
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

describe('expressPresenter.postState using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should 400 without version header', async () => {
    await createObjectState();
    await supertest
      .post('/xAPI/activities/state')
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .query({
        method: 'POST',
      })
      .send({
        'Content-Type': JSON_CONTENT_TYPE,
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        content: '{"bar": 2}',
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should merge when patching with object content ', async () => {
    await createObjectState();
    await supertest
      .post('/xAPI/activities/state')
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({
        method: 'POST',
      })
      .send({
        'Content-Type': JSON_CONTENT_TYPE,
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        content: '{"bar": 2}',
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertState('{"foo":1,"bar":2}');
  });
});
