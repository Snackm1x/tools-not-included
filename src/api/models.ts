﻿/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v12.0.6.0 (NJsonSchema v9.13.2.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming



export interface GameUpgrade {
    key: string;
    displayName: string;
    symbol: string;
}

export interface GeyserType {
    key: string;
    displayName: string;
}

export interface SeedListFilter {
    rowsPerPage: number;
    page: number;
    seed?: number | undefined;
    gameUpgrades?: string[] | undefined;
    earliestVersionNumber?: number | undefined;
    latestVersionNumber?: number | undefined;
    geysers?: MinGeyser[] | undefined;
}

export interface MinGeyser {
    type?: string | undefined;
    min?: number | undefined;
}

export interface SeedList {
    totalEntries?: number | undefined;
    seeds?: Seed[] | undefined;
}

export interface Seed {
    id: string;
    creationDate: Date;
    seed: number;
    gameUpgrade: string;
    versionNumber: number;
    geysers: Geyser[];
    geyserQuantities: { [key: string] : number; };
    spaceDestinations: SpaceDestination[];
    modVersion: number;
}

export interface Geyser {
    type: string;
    eruptionRate: number;
    activeDormancyPeriod: number;
    dormancyPeriod: number;
    eruptionPeriod: number;
    activeEruptionPeriod: number;
    calculatedOutput: number;
    posX: number;
    posY: number;
}

export interface SpaceDestination {
    type: string;
    distance: number;
}

export interface ModSeed {
    seed: number;
    versionNumber: number;
    geysers: ModGeyser[];
    spaceDestinations: SpaceDestination[];
    modVersion: number;
}

export interface ModGeyser {
    type: string;
    eruptionRate: number;
    activeDormancyPeriod: number;
    dormancyPeriod: number;
    eruptionPeriod: number;
    activeEruptionPeriod: number;
    posX: number;
    posY: number;
}

export interface SpaceDestinationType {
    key: string;
    displayName: string;
}

export interface SeedBrowserFilter {
    seedNumber?: number | undefined;
    includeArchived?: boolean | undefined;
    rules?: SeedBrowserFilterRule[] | undefined;
    page: number;
    pageSize: number;
}

export interface SeedBrowserFilterRule {
    id: number;
    groupId: number;
    type: SeedBrowserFilterRuleType;
    object: string;
    comparator: SeedBrowserFilterRuleComparator;
    value: number;
}

export enum SeedBrowserFilterRuleType {
    Total_Output = "Total Output", 
    Geyser = "Geyser", 
    Planet = "Planet", 
}

export enum SeedBrowserFilterRuleComparator {
    At_least = "at least", 
    At_most = "at most", 
}