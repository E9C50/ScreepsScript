const { findHasResourceStructure } = require('./tools.finder');

var toolsStatus = {
    checkWorking: function (creep, allowHarvestSource) {
        // 找到有资源的仓库
        hasResourceStructure = findHasResourceStructure(creep.room);

        // 当身上没有资源时开始搬运
		// 当身上有剩余空间，但是还有可获取资源时，继续搬运
		// 当身上资源满了，或者身上有资源，但是没有可获取资源时，开始工作
		if (creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.working = false;
		} else if (!creep.memory.working && hasResourceStructure.length > 0 && creep.store.getFreeCapacity() > 0) {
			creep.memory.working = false;
		} else if (!creep.memory.working && allowHarvestSource && creep.store.getFreeCapacity() > 0) {
			creep.memory.working = false;
		} else {
			creep.memory.working = true;
		}
    }
}

module.exports = toolsStatus;