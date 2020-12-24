var roleHarvester = {
    run: function (creep) {
        // if screep has free capacity, go find resource
        if (creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (Game.spawns.Spawn.store.getFreeCapacity() > 0) {
                if (creep.transfer(Game.spawns.Spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.Spawn);
                }
            } else if (targets.length > 0) {
                closeTarget = creep.pos.findClosestByRange(targets)
                if (creep.transfer(closeTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closeTarget);
                }
            } else {
                creep.moveTo(Game.flags.HarvesterPlace);
            }
        }
    }
};

module.exports = roleHarvester;