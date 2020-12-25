module.exports = {
    roleHarvesterRun: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            var source = creep.pos.findClosestByRange(creep.room.find(FIND_SOURCES));
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            var closeSpawn = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            }));
            var closeExtension = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            }));

            if (closeSpawn) {
                if (creep.transfer(closeSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closeSpawn);
                }
            } else if (closeExtension) {
                if (creep.transfer(closeExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closeExtension);
                }
            } else {
                creep.moveTo(Game.flags.HarvesterPlace);
            }
        }
    }
};