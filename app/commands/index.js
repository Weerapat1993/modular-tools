const { Config, ConfigAdd, ConfigRemove } = require('./config');
const Commit = require('./commit');
const Clone = require('./clone');
const Status = require('./status');
const Init = require('./init');
const MakeFeature = require('./makeFeature');
const MakeComponent = require('./makeComponent');
const MakeCommon = require('./makeCommon');
const MakeUtil = require('./makeUtil');


exports.ConfigAdd = ConfigAdd;
exports.ConfigRemove = ConfigRemove;
exports.Commit = Commit;
exports.Clone = Clone;
exports.Status = Status;
exports.Config = Config;
exports.Init = Init;
exports.MakeFeature = MakeFeature;
exports.MakeComponent = MakeComponent;
exports.MakeUtil = MakeUtil;
exports.MakeCommon = MakeCommon;
