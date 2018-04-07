const Case = require('case');

exports.Scene = env => `import React from 'react'
import { Text } from 'react-native'

const ${Case.pascal(env)}Scene = props => (
  <Text>${Case.pascal(env)}Scene</Text>
)

export default ${Case.pascal(env)}Scene
`;
