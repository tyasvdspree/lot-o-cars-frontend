export enum Color {
    BLACK = "Zwart",
    BLUE = "Blauw",
    BROWN = "Bruin",
    GREEN = "Groen",
    GREY = "Grijs",
    ORANGE = "Oranje",
    PINK = "Roze",
    PURPLE = "Paars",
    RED = "Rood",
    WHITE = "Wit",
    YELLOW = "Geel"
}
interface ColorSpec {
    displayText: string,
    value: number
}
function getColorSpec(color: Color):ColorSpec {
    switch(color){
        case Color.BLACK:
            return {displayText:"Zwart", value:0}
        case Color.BLUE:
            return {displayText:"Blauw", value:1}
        case Color.BROWN:
            return {displayText:"Bruin", value:2}
        case Color.GREEN:
            return {displayText:"Groen", value:3}
        case Color.GREY:
            return {displayText:"Grijs", value:4}
        case Color.ORANGE:
            return {displayText:"Oranje", value:5}
        case Color.PINK:
            return {displayText:"Roze", value:6}
        case Color.PURPLE:
            return {displayText:"Paars", value:7}
        case Color.RED:
            return {displayText:"Rood", value:8}
        case Color.WHITE:
            return {displayText:"Wit", value:9}
        case Color.YELLOW:
            return {displayText:"Geel", value:10}
    }
}