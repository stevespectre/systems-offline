class Controls {

    addLightSpeedButton(spaceShip, backgroundStars) {
        document.getElementById('burst').addEventListener('mousedown', () => {
            console.log('this.spaceShip.actualSpeed',spaceShip);
            spaceShip.actualSpeed = spaceShip.burstSpeed;
        });

        document.getElementById('burst').addEventListener('mouseup', () => {
            console.log('this.spaceShip.actualSpeed',spaceShip.actualSpeed);
            spaceShip.actualSpeed = spaceShip.standardSpeed;
        });

        document.addEventListener('keydown', function(e) {
            e = e || window.event;
            if (e.keyCode == 32) {
                spaceShip.actualSpeed = spaceShip.burstSpeed;
                spaceShip.switchBurstSpeedGraphicOn();
                backgroundStars.velocity.y = -7;
            }
        });

        document.addEventListener('keyup', function(e) {
            e = e || window.event;
            if (e.keyCode == 32) {
                spaceShip.actualSpeed = spaceShip.standardSpeed;
                spaceShip.switchBurstSpeedGraphicOff();
                backgroundStars.velocity.y = -2;
            }
        });
    };
}

module.exports = Controls;