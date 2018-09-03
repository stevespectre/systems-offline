const difficulty = {
    easy: {
        startSpeed: 5,
        minSpeed: 5,
        maxSpeed: 15,
        incrieseSpeedVelocity: 10, // use (maxSpeed - minSpeed) for static speed
        decreaseSpeedVelocity: 10, // use (maxSpeed - minSpeed) for static speed
        gravitydecreaseSpeedVelocity: 0,
        turn: {
            enabled: false,
            duration: 1000,
            angle: 4
        }
    },
    medium: {
        startSpeed: 0,
        minSpeed: 3,
        maxSpeed: Infinity,
        incrieseSpeedVelocity: 1,
        decreaseSpeedVelocity: 0.15,
        gravitydecreaseSpeedVelocity: 0.01,
        turn: {
            enabled: true,
            duration: 1000,
            angle: 4
        }
    },
    hard: {
        startSpeed: 0,
        minSpeed: 1,
        maxSpeed: Infinity,
        incrieseSpeedVelocity: 1,
        decreaseSpeedVelocity: 0,
        gravitydecreaseSpeedVelocity: 0.1,
        turn: {
            enabled: true,
            duration: 50,
            angle: 30
        }
    }
};

module.exports = {
    fps: 30,
    spaceship: {
        ...difficulty.easy,
        engineParticlesEnabled: true,
        posYOffset: 150
    },
    stars: {
        enabled: true,
        minRadius: 2,
        maxRadius: 3,
        bigStarDensity: 40,
        smallStarDensity: 80,
        color: '#ffffff'
    },
    planet: {
        gridFillRate: 0.57,
        maxInARow: 3,
        gravityRate: 0.52,
        maxCraterCount: 5,
        maxMoonCount: 2,
        maxVelocity: 0, // to move planets randomly, 0: disabled
        colors: ['#333333', '#666666', '#999999']
    },
    profile: {
        chance: 0.5,
        beamRadius: 150
    },
    beam: {
        radius: 150,
        color: 'green'
    },
    equipments: {
        /*beam: {
            color: '#ffffff',
            speed: 10,
            radius: 50
        },*/
        plasma: {
            frequency: 50,
            radius: 50,
            color: '#ff0000',
            x: 0,
            y: 0
        }
    }
};
