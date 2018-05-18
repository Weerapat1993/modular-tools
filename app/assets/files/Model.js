const Case = require('case');

exports.Model = env => `import faker from 'faker/locale/en'
import { random } from 'lodash'
import { Model } from '../../../utils/Model'

/**
 * @class ${Case.pascal(env)}
 * @extends Model
 */
export class ${Case.pascal(env)} extends Model {
  // Table Name
  static table = '${Case.camel(env)}'

  // No check isRequired in PropTypes
  static isRequired = {
    description: false
  }
  
  /**
   * Set ${Case.pascal(env)} Model
   * @param {*} data data response from API
   */
  static set(data) {
    const { string, number } = this.propTypes(data)
    return { 
      id: number('id'),
      name: string('name'),
      description: string('description'),
      avatar: string('owner.avatar_url'),
      url: string('html_url'),
    }
  }

  /**
   * Mock Data ${Case.pascal(env)} Model
   */
  static faker() {
    const avatar = faker.image.avatar()
    return {
      id: random(10, 50000),
      name: faker.name.title(),
      description: faker.lorem.lines(1),
      avatar,
      url: avatar,
    }
  }

  /**
   * Get ${Case.pascal(env)} Model
   * @param {Mock} data data from reducer
   * @return {Mock}
   */
  static get(data) {
    return data
  }
}

// Mock Response
const Mock = ${Case.pascal(env)}.set()
`