const Case = require('case');

exports.Page = env => `import React from 'react'

const ${Case.pascal(env)}Page = props => (
  <div>${Case.pascal(env)}Page</div>
)

export default ${Case.pascal(env)}Page
`;
