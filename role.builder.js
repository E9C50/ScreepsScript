const { checkWorking } = require('tools.status');
const { getCloseResource } = require('tools.finder');

var roleBuilder = {
	run: function (creep) {
		let allowHarvestSource = false;
		
		checkWorking(creep, allowHarvestSource);

		if (creep.memory.working) {
			var closeTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
			if (creep.build(closeTarget) == ERR_NOT_IN_RANGE) {
				creep.moveTo(closeTarget);
			}
		} else {
			getCloseResource(creep, Game.flags.BuilderPlace, allowHarvestSource)
		}
	}
};

module.exports = roleBuilder;