import { GameUpgrade } from '../types/enums/GameUpgrade';
import IGameUpgradeDetails from '../types/interfaces/IGameUpgradeDetails';

export const GameUpgrades = new Map<GameUpgrade, IGameUpgradeDetails>(
    [
        [GameUpgrade.SPACE_INDUSTRY_UPGRADE, { upgrade: GameUpgrade.SPACE_INDUSTRY_UPGRADE, displayName: "Space Industry Upgrade", symbol: "SU" }],
        [GameUpgrade.ROCKETRY_UPGRADE, { upgrade: GameUpgrade.ROCKETRY_UPGRADE, displayName: "Rocketry Upgrade", symbol: "RU" }],
        [GameUpgrade.EXPRESSIVE_UPGRADE, { upgrade: GameUpgrade.EXPRESSIVE_UPGRADE, displayName: "Expressive Upgrade", symbol: "EU" }],
        [GameUpgrade.COSMIC_UPGRADE, { upgrade: GameUpgrade.COSMIC_UPGRADE, displayName: "Cosmic Upgrade", symbol: "CU" }]
    ]
);