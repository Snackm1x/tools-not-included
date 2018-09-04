export default interface SeedDTO {
    id: string;
    seedNumber: string;
    gameVersion: {
        gameUpgrade: string;
        versionNumber: number;
    };
    geysers: {
        type: string;
        activeDormancyPeriod: number;
        dormancyPeriod: number;
        activeEruptionPeriod: number;     
        eruptionPeriod: number;
        eruptionRate: number;        
    }[];
    creationDate: Date;
}