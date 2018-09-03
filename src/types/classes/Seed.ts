import Geyser from './Geyser';
import GameVersion from './GameVersion';
import { GeyserType } from '../enums/GeyserType';
import { GeyserProperties } from '../../constants/GeyserProperties';

export default class Seed {
    id?: number;
    seed: string;
    gameVersion: GameVersion;
    geysers: Array<Geyser>;
    geyserQuantities: Map<GeyserType, number>;
    uploadDate: Date;

    constructor(seed: string, gameVersion: GameVersion, geysers: Array<Geyser>, uploadDate: Date = new Date(), id?: number,) {
        this.id = id;
        this.seed = seed;
        this.gameVersion = gameVersion;
        this.geysers = geysers;
        this.uploadDate = uploadDate;

        this.fillGeyserQuantities();
    }

    private fillGeyserQuantities() {
        this.geyserQuantities = new Map<GeyserType, number>();

        GeyserProperties.forEach(element => {
            this.geyserQuantities.set(element.geyserType, 0);
        })

        this.geysers.forEach(element => {
            var currentValue = this.geyserQuantities.get(element.type);
            this.geyserQuantities.set(element.type, currentValue ? currentValue + 1 : 1);
        });
    }
};