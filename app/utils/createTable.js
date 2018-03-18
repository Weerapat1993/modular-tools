const Table = require('cli-table2');

/**
 * Create Table Command Line
 * @param {[]} head
 * @return {Table}
 */
const createTable = head => new Table({ head, chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' }});

module.exports = createTable;
