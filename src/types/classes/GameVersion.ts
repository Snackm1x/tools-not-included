import { GameUpgrade } from "../enums/GameUpgrade";
import { GameUpgrades } from "../../constants/GameUpgrades";
import IGameUpgradeDetails from "../interfaces/IGameUpgradeDetails";

export default class GameVersion {
    gameUpgrade: GameUpgrade;
    gameUpgradeDisplayName: string; //Space Industry Upgrade
    versionNumber: number;
    displayNameShort: string; //SU-12345
    displayNameLong: string;  //Space Industry Upgrade SU-12345

    constructor(gameUpgrade: GameUpgrade, versionNumber: number) {
        this.gameUpgrade = gameUpgrade;
        this.versionNumber = versionNumber;

        var upgradeDetails = GameUpgrades.get(this.gameUpgrade) as IGameUpgradeDetails;
        this.gameUpgradeDisplayName = upgradeDetails.displayName;
        this.displayNameShort = upgradeDetails.symbol + "-" + this.versionNumber.toString();
        this.displayNameLong = upgradeDetails.displayName + " " + this.displayNameShort;
    }
}