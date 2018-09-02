import { GeyserType } from "../enums/GeyserType";

export default class Geyser {
    type: GeyserType;
    eruptionRate?: number;
    activeDormancyPeriod?: number;
    dormancyPeriod?: number;
    eruptionPeriod?: number;
    activeEruptionPeriod?: number;

    constructor(type: GeyserType, eruptionRate?: number, activeDormancyPeriod?: number, dormancyPeriod?: number, eruptionPeriod?: number, activeEruptionPeriod?: number) {
        this.type = type;
        this.eruptionRate = eruptionRate;
        this.activeDormancyPeriod = activeDormancyPeriod;
        this.dormancyPeriod = dormancyPeriod;
        this.eruptionPeriod = eruptionPeriod;
        this.activeEruptionPeriod = activeEruptionPeriod;
    };
};