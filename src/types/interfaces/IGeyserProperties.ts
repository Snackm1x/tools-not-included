import { GeyserType } from "../enums/GeyserType";

export default interface IGeyserProperties {
    displayName: string;
    image: string;
    outputTemp: number;
    geyserType: GeyserType;
}