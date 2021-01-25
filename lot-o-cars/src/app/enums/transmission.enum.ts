export enum Transmission {
    MANUAL = "handgeschakeld",
    SEMI_AUTOMATIC = "semi-automaat",
    AUTOMATIC = "automaat"
}
interface TransmissionSpec{
    displayText: string,
    value: number
}
function getTransmissionsSpec(transmission: Transmission):TransmissionSpec{
    switch(transmission){
        case Transmission.MANUAL:
            return {displayText:"handgeschakeld", value:0}
        case Transmission.SEMI_AUTOMATIC:
            return {displayText:"semi-automaat", value:1}
        case Transmission.AUTOMATIC:
            return {displayText:"automaat", value:2}
    }
} 