export enum Fuel {
    PATROL = "Benzine",
    DIESEL = "Diesel",
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
        case Fuel.DIESEL:
            return {/*TODO: translation function for display value*/displayText: "Diesel", value: 1}
        case Fuel.GAS:
            return {/*TODO: translation function for display value*/displayText: "Gas", value: 2}
    }
}
