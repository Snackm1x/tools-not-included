import { GeyserType } from "../enums/GeyserType";

export default class Geyser {
    type: GeyserType;
    eruptionRate?: number;
    activeDormancyPeriod?: number;
    dormancyPeriod?: number;
    eruptionPeriod?: number;
    activeEruptionPeriod?: number;
    calculatedOutput?: number | string;

    constructor(type: GeyserType, eruptionRate?: number, activeDormancyPeriod?: number, dormancyPeriod?: number, eruptionPeriod?: number, activeEruptionPeriod?: number) {
        this.type = type;
        this.eruptionRate = eruptionRate;
        this.activeDormancyPeriod = activeDormancyPeriod;
        this.dormancyPeriod = dormancyPeriod;
        this.eruptionPeriod = eruptionPeriod;
        this.activeEruptionPeriod = activeEruptionPeriod;

        this.calculatedOutput = this.calculateOutput();
    };

    private calculateOutput(): number | string {
        if (!(this.eruptionRate && this.activeDormancyPeriod && this.activeEruptionPeriod && this.dormancyPeriod && this.eruptionPeriod))
            return "N/A";

        return (this.activeEruptionPeriod / this.eruptionPeriod) * (this.activeDormancyPeriod / this.dormancyPeriod) * this.eruptionRate;
    }
};