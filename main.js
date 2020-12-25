/*!
 * Screeps 游戏自动脚本主文件
 * Author: E9C50
 * Version: v1.0.0
 * CreateAt: 2020-12-22
 * Github: https://github.com/E9C50/ScreepsScript
 * License: Apache LICENSE 2.0
 */

var { roleHarvesterRun } = require('./role.harvester');
var { roleSupporterRun } = require('./role.supporter');
var { roleUpgraderRun } = require('./role.upgrader');
var { roleBuilderRun } = require('./role.builder');
var { autoCreateCreepsRun } = require('./auto.create.creeps');

module.exports.loop = function () {
    let autoAttack = false;
    var tower = Game.getObjectById('5fe44519a6cc37b80b84b831');
    if (tower) {
        var closestDamagedRoad = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_ROAD)
        });
        var closestDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_WALL)
        });
        if (closestDamagedRoad) {
            tower.repair(closestDamagedRoad);
        }
        if (closestDamagedWall && tower.store[RESOURCE_ENERGY] > tower.store.getFreeCapacity(RESOURCE_ENERGY)) {
            tower.repair(closestDamagedWall);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile && autoAttack) {
            tower.attack(closestHostile);
        }
    }

    autoCreateCreepsRun();

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvesterRun(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgraderRun(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilderRun(creep);
        }
        if (creep.memory.role == 'supporter') {
            roleSupporterRun(creep);
        }
    }
}
