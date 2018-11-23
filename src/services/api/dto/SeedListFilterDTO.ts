export default interface SeedListFilterDTO {
    rowsPerPage: number,
    page: number,

    seed?: number;
    gameUpgrades?: string[];
    earliestVersionNumber?: number;
    latestVersionNumber?: number;
    geysers?: {
        type: string;
        min?: number;
    }[];
}