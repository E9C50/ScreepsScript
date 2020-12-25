const { checkWorking } = require('tools.status');
const { getCloseResource, findSturctures } = require('tools.finder');

module.exports = {
	roleSupporterRun: function (creep) {
		let allowHarvestSource = false;

		checkWorking(creep, allowHarvestSource);

		if (creep.memory.working) {
			var closeTower = creep.pos.findClosestByRange(findSturctures(creep.room, [STRUCTURE_TOWER]));
			if (closeTower == null) {
				creep.moveTo(Game.flags.SupporterPlace);
			}
			if (creep.transfer(closeTower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(closeTower);
			}
		} else {
			var dropSources = creep.room.find(FIND_DROPPED_RESOURCES);
			if (creep.pickup(dropSources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(dropSources[0]);
			}
			getCloseResource(creep, Game.flags.SupporterPlace, false)
		}
	}
};