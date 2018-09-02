import { GameUpgrade } from '../types/enums/GameUpgrade';
import IGameUpgradeDetails from '../types/interfaces/IGameUpgradeDetails';

export const GameUpgrades = new Map<GameUpgrade, IGameUpgradeDetails>(
    [
        [GameUpgrade.ROCKETRY_UPGRADE, { upgrade: GameUpgrade.ROCKETRY_UPGRADE, displayName: "Rocketry Upgrade", symbol: "RU", versionNumbers: [108, 109, 110, 111] }],
        [GameUpgrade.EXPRESSIVE_UPGRADE, { upgrade: GameUpgrade.EXPRESSIVE_UPGRADE, displayName: "Expressive Upgrade", symbol: "EU", versionNumbers: [104, 105, 106, 107] }],
        [GameUpgrade.COSMIC_UPGRADE, { upgrade: GameUpgrade.COSMIC_UPGRADE, displayName: "Cosmic Upgrade", symbol: "CU", versionNumbers: [100, 101, 102, 103] }]
    ]
);