import DeleteStateOptions from '../serviceFactory/options/DeleteStateOptions';
import { jsonContentType } from '../utils/constants';
import Config from './Config';
import checkStateWriteScopes from './utils/checkStateWriteScopes';
import validateActivityId from './utils/validateActivityId';
import validateAgent from './utils/validateAgent';
import validateRegistration from './utils/validateRegistration';

export default (config: Config) => {
  return async (opts: DeleteStateOptions): Promise<void> => {
    const client = opts.client;
    checkStateWriteScopes(client.scopes);
    validateActivityId(opts.activityId);
    validateAgent(opts.agent);
    validateRegistration(opts.registration);

    const deleteResult = await config.repo.deleteState({
      activityId: opts.activityId,
      agent: opts.agent,
      client,
      registration: opts.registration,
      stateId: opts.stateId,
    });

    if (deleteResult.contentType === jsonContentType) {
      return;
    }

    await config.repo.deleteStateContent({
      key: `${deleteResult.id}.${deleteResult.extension}`,
      lrs_id: client.lrs_id,
    });
  };
};
