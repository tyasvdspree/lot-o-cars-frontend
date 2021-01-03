export enum Make {
    ALFA_ROMEO = "Alfa Romeo",
    ASTON_MARTIN = "Aston Martin",
    AUDI = "Audi",
    BENTLEY = "Bentley",
    BMW = "BMW",
    BUICK = "Buick",
    CADILLAC = "Cadillac",
    CHEVROLET = "Chevrolet",
    CHRYSLER = "Chrysler",
    CITROEN = "Citroën",
    FERRARI = "Ferrari",
    FIAT = "Fiat",
    FORD = "Ford",
    HONDA = "Honda",
    HYUNDAI = "Hyundai",
    JAGUAR = "Jaguar",
    KIA = "Kia",
    LAND_ROVER = "Land Rover",
    LEXUS = "Lexus",
    MAZDA = "Mazda",
    MERCEDES_BENZ = "Mercedes Bens",
    MITSUBISHI = "Mitsubishi",
    NISSAN = "Nissan",
    OPEL = "Opel",
    PEUGEOT = "Peugot",
    PORSCHE = "Porsche",
    RENAULT = "Renault",
    SAAB = "Saab",
    SEAT = "Seat",
    SUBARU = "Subaru",
    SUZUKI = "Susuki",
    TOYOTA = "Toyota",
    VOLKSWAGEN = "Volkswagen",
    VOLVO = "Volvo"
}
interface MakeSpec {
    displayText: string,
    value: number
}
function getMakeSpec(make: Make): MakeSpec {
    switch (make) {
        case Make.ALFA_ROMEO:
            return {/*TODO: translation function for display value*/displayText: "Alfa Romeo", value: 0 }
        case Make.ASTON_MARTIN:
            return {/*TODO: translation function for display value*/displayText: "Aston Martin", value: 1 }
        case Make.AUDI:
            return {/*TODO: translation function for display value*/displayText: "Audi", value: 2 }
        case Make.BENTLEY:
            return {/*TODO: translation function for display value*/displayText: "Bentley", value: 3 }
        case Make.BMW:
            return {/*TODO: translation function for display value*/displayText: "BMW", value: 4 }
        case Make.BUICK:
            return {/*TODO: translation function for display value*/displayText: "Buick", value: 5 }
        case Make.CADILLAC:
            return {/*TODO: translation function for display value*/displayText: "Cadillac", value: 6 }
        case Make.CHEVROLET:
            return {/*TODO: translation function for display value*/displayText: "Chevrolet", value: 7 }
        case Make.CHRYSLER:
            return {/*TODO: translation function for display value*/displayText: "Chrysler", value: 8 }
        case Make.CITROEN:
            return {/*TODO: translation function for display value*/displayText: "Citroën", value: 9 }
        case Make.FERRARI:
            return {/*TODO: translation function for display value*/displayText: "Ferrari", value: 10 }
        case Make.FIAT:
            return {/*TODO: translation function for display value*/displayText: "Fiat", value: 11 }
        case Make.FORD:
            return {/*TODO: translation function for display value*/displayText: "Ford", value: 12 }
        case Make.HONDA:
            return {/*TODO: translation function for display value*/displayText: "Honda", value: 13 }
        case Make.HYUNDAI:
            return {/*TODO: translation function for display value*/displayText: "Hyundai", value: 14 }
        case Make.JAGUAR:
            return {/*TODO: translation function for display value*/displayText: "Jaguar", value: 15 }
        case Make.KIA:
            return {/*TODO: translation function for display value*/displayText: "Kia", value: 16 }
        case Make.LAND_ROVER:
            return {/*TODO: translation function for display value*/displayText: "Land Rover", value: 17 }
        case Make.LEXUS:
            return {/*TODO: translation function for display value*/displayText: "Lexus", value: 18 }
        case Make.MAZDA:
            return {/*TODO: translation function for display value*/displayText: "Mazda", value: 19 }
        case Make.MERCEDES_BENZ:
            return {/*TODO: translation function for display value*/displayText: "Mercedes Bens", value: 20 }
        case Make.MITSUBISHI:
            return {/*TODO: translation function for display value*/displayText: "Mitsubishi", value: 21 }
        case Make.NISSAN:
            return {/*TODO: translation function for display value*/displayText: "Nissan", value: 22 }
        case Make.OPEL:
            return {/*TODO: translation function for display value*/displayText: "Opel", value: 23 }
        case Make.PEUGEOT:
            return {/*TODO: translation function for display value*/displayText: "Peugot", value: 24 }
        case Make.PORSCHE:
            return {/*TODO: translation function for display value*/displayText: "Porsche", value: 25 }
        case Make.RENAULT:
            return {/*TODO: translation function for display value*/displayText: "Renault", value: 26 }
        case Make.SAAB:
            return {/*TODO: translation function for display value*/displayText: "Saab", value: 27 }
        case Make.SEAT:
            return {/*TODO: translation function for display value*/displayText: "Seat", value: 28 }
        case Make.SUBARU:
            return {/*TODO: translation function for display value*/displayText: "Subaru", value: 29 }
        case Make.SUZUKI:
            return {/*TODO: translation function for display value*/displayText: "Susuki", value: 30 }
        case Make.TOYOTA:
            return {/*TODO: translation function for display value*/displayText: "Toyota", value: 31 }
        case Make.VOLKSWAGEN:
            return {/*TODO: translation function for display value*/displayText: "Volkswagen", value: 32 }
        case Make.VOLVO:
            return {/*TODO: translation function for display value*/displayText: "Volvo", value: 33 }
    }
}