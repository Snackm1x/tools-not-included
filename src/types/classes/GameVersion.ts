import { GameUpgrade } from "../enums/GameUpgrade";
import { GameUpgrades } from "../../constants/GameUpgrades";
import IGameUpgradeDetails from "../interfaces/IGameUpgradeDetails";

export default class GameVersion {
    gameUpgrade: GameUpgrade;
    versionNumber: number;
    displayNameShort: string;
    displayNameLong: string;

    constructor(gameUpgrade: GameUpgrade, versionNumber: number) {
        this.gameUpgrade = gameUpgrade;
        this.versionNumber = versionNumber;

        var upgradeDetails = GameUpgrades.get(this.gameUpgrade) as IGameUpgradeDetails;
        this.displayNameShort = upgradeDetails.symbol + "-" + this.versionNumber.toString();
        this.displayNameLong = upgradeDetails.displayName + " " + this.displayNameShort;
    }
}