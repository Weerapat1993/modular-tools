const { Config, ConfigAdd, ConfigRemove } = require('./config')
const Commit = require('./commit')
const Clone = require('./clone')
const Status = require('./status')
const Init = require('./init')

exports.ConfigAdd = ConfigAdd
exports.ConfigRemove = ConfigRemove
exports.Commit = Commit
exports.Clone = Clone
exports.Status = Status
exports.Config = Config
exports.Init = Init