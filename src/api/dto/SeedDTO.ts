export default interface SeedDTO {
    id?: string;
    seed: number;
    gameVersion: {
        gameUpgrade: string;
        versionNumber: number;
    };
    geysers: {
        geyserType: string;
        activeDormancyPeriod?: number;
        dormancyPeriod?: number;
        activeEruptionPeriod?: number;     
        eruptionPeriod?: number;
        eruptionRate?: number;        
    }[];
    creationDate?: Date;
    modVersion?: number;
    addedByMod: boolean;
}