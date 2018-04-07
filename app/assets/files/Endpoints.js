const Case = require('case');

exports.Endpoints = env => `import { API_ENDPOINT } from '../../../config/endpoints'

export const API_ENDPOINT_${Case.constant(env)}_LIST = () => API_ENDPOINT('/${Case.kebab(env)}')
export const API_ENDPOINT_${Case.constant(env)}_DETAIL = key => API_ENDPOINT(\`/${Case.kebab(env)}/\${key}\`)
`;
