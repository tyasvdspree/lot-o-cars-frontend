export enum Fuel {
    PATROL = "Benzine",
    DIEZEL = "Diezel",
    GAS = "Gas"
}
export interface FuelSpec {
    displayText: string,
    value: number
}
export function getFuelSpec(fuel: Fuel):FuelSpec {
    switch(fuel){
        case Fuel.PATROL:
            return {/*TODO: translation function for display value*/displayText: "Benzine", value: 0}
        case Fuel.DIEZEL:
            return {/*TODO: translation function for display value*/displayText: "Diezel", value: 1}
        case Fuel.GAS:
            return {/*TODO: translation function for display value*/displayText: "Gas", value: 2}
    }
}