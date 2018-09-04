import { GeyserType } from "../enums/GeyserType";

export default class Geyser {
    type: GeyserType;
    eruptionRate?: number;
    activeDormancyPeriod?: number;
    dormancyPeriod?: number;
    eruptionPeriod?: number;
    activeEruptionPeriod?: number;
    calculatedOutput?: number;

    constructor(type: GeyserType, eruptionRate?: number, activeDormancyPeriod?: number, dormancyPeriod?: number, eruptionPeriod?: number, activeEruptionPeriod?: number) {
        this.type = type;
        this.eruptionRate = eruptionRate;
        this.activeDormancyPeriod = activeDormancyPeriod;
        this.dormancyPeriod = dormancyPeriod;
        this.eruptionPeriod = eruptionPeriod;
        this.activeEruptionPeriod = activeEruptionPeriod;

        this.calculatedOutput = this.calculateOutput();
    };

    private calculateOutput() : number {
        if (!(this.eruptionRate && this.activeDormancyPeriod && this.activeEruptionPeriod && this.dormancyPeriod && this.eruptionPeriod))
            return 0;

        return 100; //TODO: calculate stuff
    }
};