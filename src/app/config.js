module.exports = {
    spaceship: {
        speed: 5,
        burstSpeed: 5 * 3,
        engineParticlesEnabled: true
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
        gravityRate: 0.53,
        colors: ['#333333', '#666666', '#999999']
    },
    profile: {
        chance: 0.5
    },
    equipments: {
        /*beam: {
            color: '#ffffff',
            speed: 10,
            radius: 50
        },*/
        plasma: {
            frequency: 50,
            radius: 20,
            color: '#ff0000',
            x: 0,
            y: 0
        },
        a: {},
        b: {}
    }
};
