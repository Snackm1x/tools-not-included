import Geyser from './Geyser';
import GameVersion from './GameVersion';
import { GeyserType } from '../enums/GeyserType';
import { GameUpgrade } from '../enums/GameUpgrade';
import { GeyserProperties } from '../../constants/GeyserProperties';
import SeedDTO from '../../api/dto/SeedDTO';

export default class Seed {
    id?: string;
    creationDate: Date;
    modVersion: number | undefined;
    addedByMod: boolean;

    seedNumber: number;
    gameVersion: GameVersion;
    geysers: Array<Geyser>;
    geyserQuantities: Map<GeyserType, number>;
    

    constructor(seed: number, gameVersion: GameVersion, geysers: Array<Geyser>, uploadDate: Date = new Date(), addedByMod:boolean, modVersion?: number, id?: string) {
        this.id = id;
        this.addedByMod = addedByMod;
        this.modVersion = modVersion;

        this.seedNumber = seed;
        this.gameVersion = gameVersion;
        this.geysers = geysers;
        this.creationDate = uploadDate;

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

    public static FromDTO(dto : SeedDTO) : Seed {
        var geysers : Geyser[] = [];

        dto.geysers.forEach(element => {
            geysers.push(new Geyser(element.geyserType as GeyserType, element.eruptionRate, element.activeDormancyPeriod, element.dormancyPeriod, element.eruptionPeriod, element.activeEruptionPeriod));
        });

        return new Seed(dto.seed, new GameVersion(dto.gameVersion.gameUpgrade as GameUpgrade, dto.gameVersion.versionNumber), geysers, new Date(dto.creationDate), dto.addedByMod, dto.modVersion, dto.id);
    }
};