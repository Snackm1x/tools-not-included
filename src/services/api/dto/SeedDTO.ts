export default interface SeedDTO {
    id?: string;
    seed: number;
    gameUpgrade: string;
    versionNumber: number;
    creationDate?: Date;
    modVersion?: number;
    addedByMod: boolean;
    geysers: {
        geyserType: string;
        activeDormancyPeriod?: number;
        dormancyPeriod?: number;
        activeEruptionPeriod?: number;     
        eruptionPeriod?: number;
        eruptionRate?: number;        
    }[];
}