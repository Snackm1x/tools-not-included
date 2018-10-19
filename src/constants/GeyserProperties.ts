import IGeyserProperties from "../types/interfaces/IGeyserProperties";
import { GeyserType } from "../types/enums/GeyserType";

export const GeyserProperties = new Map<GeyserType, IGeyserProperties>(
    [
        [GeyserType.GEYSER_CO2, { displayName: "Carbon Dioxide Geyser", image: "geyser_co2.png", outputTemp: -55.1, geyserType: GeyserType.GEYSER_CO2 }],
        [GeyserType.GEYSER_COOL_SLUSH, { displayName: "Cool Slush Geyser", image: "geyser_slush.png", outputTemp: -10, geyserType: GeyserType.GEYSER_COOL_SLUSH }],
        [GeyserType.GEYSER_OIL, { displayName: "Leaky Oil Fissure", image: "leaky_oil_fissure.png", outputTemp: 326.9, geyserType: GeyserType.GEYSER_OIL }],
        [GeyserType.GEYSER_WATER, { displayName: "Water Geyser", image: "geyser_water.png", outputTemp: 95, geyserType: GeyserType.GEYSER_WATER }],
        [GeyserType.VENT_POLLUTED_H2O, { displayName: "Polluted Water Geyser", image: "geyser_polluted_water.png", outputTemp: 30, geyserType: GeyserType.VENT_POLLUTED_H2O }],
        
        [GeyserType.VENT_CO2, { displayName: "Carbon Dioxide Vent", image: "vent_co2.png", outputTemp: 500, geyserType: GeyserType.VENT_CO2 }],
        [GeyserType.VENT_CHLORINE, { displayName: "Chlorine Gas Vent", image: "vent_chlorine.png", outputTemp: 60, geyserType: GeyserType.VENT_CHLORINE }],
        [GeyserType.VENT_COOL_STEAM, { displayName: "Cool Steam Vent", image: "vent_cool_steam.png", outputTemp: 110, geyserType: GeyserType.VENT_COOL_STEAM }],
        [GeyserType.VENT_POLLUTED_PO2, { displayName: "Hot Polluted Oxygen Vent", image: "vent_polluted_po2.png", outputTemp: 500, geyserType: GeyserType.VENT_POLLUTED_PO2 }],
        [GeyserType.VENT_HYDROGEN, { displayName: "Hydrogen Vent", image: "vent_hydrogen.png", outputTemp: 500, geyserType: GeyserType.VENT_HYDROGEN }],
        [GeyserType.VENT_GERMY_PO2, { displayName: "Inf. Polluted Oxygen Vent", image: "vent_infectious_po2.png", outputTemp: 60, geyserType: GeyserType.VENT_GERMY_PO2 }],
        [GeyserType.GEYSER_NATGAS, { displayName: "Natural Gas Geyser", image: "geyser_natgas.png", outputTemp: 150, geyserType: GeyserType.GEYSER_NATGAS }],
        [GeyserType.VENT_HOT_STEAM, { displayName: "Steam Vent", image: "vent_steam.png", outputTemp: 500, geyserType: GeyserType.VENT_HOT_STEAM }],

        [GeyserType.VOLCANO_COPPER, { displayName: "Copper Volcano", image: "volcano_copper.png", outputTemp: 2226.9, geyserType: GeyserType.VOLCANO_COPPER }],
        [GeyserType.VOLCANO_GOLD, { displayName: "Gold Volcano", image: "volcano_gold.png", outputTemp: 2626.9, geyserType: GeyserType.VOLCANO_GOLD }],
        [GeyserType.VOLCANO_IRON, { displayName: "Iron Volcano", image: "volcano_iron.png", outputTemp: 2526.9, geyserType: GeyserType.VOLCANO_IRON }],
        [GeyserType.VOLCANO_MINOR, { displayName: "Minor Volcano", image: "volcano_minor.png", outputTemp: 1726.9, geyserType: GeyserType.VOLCANO_MINOR }],
        [GeyserType.VOLCANO, { displayName: "Volcano", image: "volcano.png", outputTemp: 1726.9, geyserType: GeyserType.VOLCANO }],
    ]
);
