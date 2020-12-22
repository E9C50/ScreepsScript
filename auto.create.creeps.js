function randomName(namePrefix) {
    let minNum = 100000; maxNum = 999999;
    return namePrefix + '_' + parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

var autoCreateCreeps = {
    createCreep: function (name, roles, memory) {
        Game.spawns.Spawn.spawnCreep(roles, name, { memory: memory })
    },
    run: function () {
        var toolsFinder = require('tools.finder');
        
        var myCreeps = []
        const HARVESTER_MAX_COUNT = 4; UPGRADER_MAX_COUNT = 2; BUILDER_MAX_COUNT = 2; SUPPORTER_MAX_COUNT = 2;

        for (var name in Game.creeps) {
            myCreeps.push(Game.creeps[name]);
        }

        if (myCreeps.filter(function (x) { return x.memory.role == 'harvester'; }).length < HARVESTER_MAX_COUNT &&
            this.createCreep(name=randomName('Harvester'), [WORK, CARRY, MOVE], { role: 'harvester' }) == 0) {
            console.log('create Harvester creep: ' + name);
        }
        if (myCreeps.filter(function (x) { return x.memory.role == 'upgrader'; }).length < UPGRADER_MAX_COUNT &&
            this.createCreep(name=randomName('Upgrader'), [WORK, CARRY, MOVE], { role: 'upgrader' }) == 0) {
            console.log('create Upgrader creep: ' + name);
        }
        if (myCreeps.filter(function (x) { return x.memory.role == 'supporter'; }).length < SUPPORTER_MAX_COUNT &&
            this.createCreep(name=randomName('Supporter'), [WORK, CARRY, MOVE], { role: 'supporter' }) == 0) {
            console.log('create Supporter creep: ' + name);
        }
        if (myCreeps.filter(function (x) { return x.memory.role == 'builder'; }).length < BUILDER_MAX_COUNT &&
            toolsFinder.getAllConstructionSite(Game.spawns.Spawn.room).length > 0 &&
            this.createCreep(name=randomName('Builder'), [WORK, CARRY, MOVE], { role: 'builder' }) == 0) {
            console.log('create Builder creep: ' + name);
        }
    }
}

module.exports = autoCreateCreeps;