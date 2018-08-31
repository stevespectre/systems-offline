import EquipmentBase from './equipment-base';

export default class Plasma extends EquipmentBase {
    constructor(ctx, planets) {
        super(ctx, planets);
        this.frequency = 50;
        this.radius = 50;
        this.color = '#ff0000';
    }
}
