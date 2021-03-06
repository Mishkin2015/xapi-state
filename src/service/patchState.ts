import { isPlainObject } from 'lodash';
import * as streamToString from 'stream-to-string';
import NonJsonObject from '../errors/NonJsonObject';
import PatchStateOptions from '../serviceFactory/options/PatchStateOptions';
import { jsonContentType } from '../utils/constants';
import getFileExtension from '../utils/getFileExtension';
import parseJSON from '../utils/parseJSON';
import Config from './Config';
import checkStateWriteScopes from './utils/checkStateWriteScopes';
import createEtag from './utils/createEtag';
import validateActivityId from './utils/validateActivityId';
import validateAgent from './utils/validateAgent';
import validateRegistration from './utils/validateRegistration';

export default (config: Config) => {
  return async (opts: PatchStateOptions): Promise<void> => {
    const client = opts.client;
    checkStateWriteScopes(client.scopes);
    validateActivityId(opts.activityId);
    validateAgent(opts.agent);
    validateRegistration(opts.registration);

    if (opts.contentType !== jsonContentType) {
      throw new NonJsonObject();
    }

    const content = parseJSON(await streamToString(opts.content), ['body']);
    if (!isPlainObject(content)) {
      throw new NonJsonObject();
    }

    const extension = getFileExtension(opts.contentType);

    const etag = createEtag();
    await config.repo.patchState({
      activityId: opts.activityId,
      agent: opts.agent,
      client,
      content,
      contentType: opts.contentType,
      etag,
      extension,
      registration: opts.registration,
      stateId: opts.stateId,
    });
    return;
  };
};
