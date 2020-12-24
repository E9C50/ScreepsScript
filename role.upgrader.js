var roleUpgrader = {
    run: function (creep) {
		var toolsFinder = require('tools.finder');
		let allowHarvestSource = false;

        // find all has resource structures.
        hasResourceStructure = toolsFinder.findHasResourceStructure(creep.room);

        // when Upgrader is upgrading, but has no any more resource, then start harvest resource.
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
        }
        // when Upgrader is harvesting, but has no any more capacity, then start upgrading.
        // or Upgrader is harvesting and has some resource, but not any building can get resource, then start upgrading
        if ((!creep.memory.upgrading && creep.store.getFreeCapacity() == 0 ) || 
            (!creep.memory.upgrading && creep.store.getUsedCapacity() > 0 && hasResourceStructure.length == 0)) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
			toolsFinder.getCloseResource(creep, Game.flags.UpgraderPlace, allowHarvestSource)
        }
    }
};

module.exports = roleUpgrader;