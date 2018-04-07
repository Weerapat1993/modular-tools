const Case = require('case');

exports.ActionTypes = env => `import { asyncActionType } from '../../../utils'

export const FETCH_${Case.constant(env)}_LIST = asyncActionType('FETCH_${Case.constant(env)}_LIST')
export const FETCH_${Case.constant(env)}_DETAIL = asyncActionType('FETCH_${Case.constant(env)}_DETAIL')
`;
