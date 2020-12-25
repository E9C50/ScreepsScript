module.exports = {
    getCloseResource: function (creep, elseGo, includeSource) {
        var closeSource = creep.pos.findClosestByRange(creep.room.find(FIND_MY_STRUCTURES).filter(
            structure => [STRUCTURE_EXTENSION].includes(structure.structureType) && structure.store[RESOURCE_ENERGY] > 0
        ));

        if (closeSource == null && includeSource) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else if (closeSource == null) {
            creep.moveTo(elseGo);
        }
        if (creep.withdraw(closeSource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closeSource);
        }
    },
    getAllConstructionSite: function (room) {
        return room.find(FIND_CONSTRUCTION_SITES, {
            filter: function (construction) {
                return construction.progress <= construction.progressTotal;
            }
        })
    },
    getAllRepairStructure: function (room) {
        return room.find(FIND_STRUCTURES, {
            filter: function (structure) {
                return structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax;
            }
        })
    },
    findSturctures: function (room, types) {
        return room.find(FIND_STRUCTURES, {
            filter: function (structure) {
                return types.includes(structure.structureType);
            }
        })
    },
    findHasResourceStructure: function (room) {
        return room.find(FIND_STRUCTURES).filter(
            structure => [STRUCTURE_EXTENSION, STRUCTURE_CONTAINER].includes(structure.structureType) && structure.store[RESOURCE_ENERGY] > 0
        )
    }
};