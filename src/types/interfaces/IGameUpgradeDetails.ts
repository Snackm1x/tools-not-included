import { GameUpgrade } from '../enums/GameUpgrade';

export default interface IGameUpgradeDetails {
    upgrade: GameUpgrade;
    displayName: string;
    symbol: string;
}