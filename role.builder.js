const { checkWorking } = require('./tools.status');
const { getCloseResource, getAllRepairStructure } = require('./tools.finder');

module.exports = {
	roleBuilderRun: function (creep) {
		let allowHarvestSource = false;

		checkWorking(creep, allowHarvestSource);

		if (creep.memory.working) {
			var closeConstructiont = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
			var closeStructure = creep.pos.findClosestByRange(getAllRepairStructure(creep.room));

			if (closeConstructiont && creep.build(closeConstructiont) == ERR_NOT_IN_RANGE) {
				creep.moveTo(closeConstructiont);
			} else if (closeStructure && creep.repair(closeStructure) == ERR_NOT_IN_RANGE) {
				creep.moveTo(closeStructure);
			}
		} else {
			getCloseResource(creep, Game.flags.BuilderPlace, allowHarvestSource)
		}
	}
};