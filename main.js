/*!
 * Screeps 游戏自动脚本主文件
 * Author: E9C50
 * Version: v1.0.0
 * CreateAt: 2020-12-22
 * Github: https://github.com/E9C50/ScreepsScript
 * License: Apache LICENSE 2.0
 */

var roleHarvester = require('role.harvester');
var roleSupporter = require('role.supporter');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var autoCreateCreeps = require('auto.create.creeps');

module.exports.loop = function () {
    let autoAttack = false;
    var tower = Game.getObjectById('5fe44519a6cc37b80b84b831');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_ROAD
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && autoAttack) {
            tower.attack(closestHostile);
        }
    }

    autoCreateCreeps.run();

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'supporter') {
            roleSupporter.run(creep);
        }
    }
}