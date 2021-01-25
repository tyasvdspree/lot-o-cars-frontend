export enum Status {
    PENDING,
    APPROVED,
    CANCELED,
    FINISHED
}
export function getStatusText(status: Status) {
    let myStatus = Status[status];
    let statussen = ['ingediend', 'geaccepteerd', 'geannuleerd', 'afgehandeld'];
    return statussen[myStatus];
}
export function isPending(status: Status) {
    let myStatus = Status[status];
    let statussen = [true, false, false, false];
    return statussen[myStatus];
}
export interface StatusSpec {
    displayText: string,
    value: number
}
export function getStatusSpec(status: Status): StatusSpec {
    switch(status){
        case Status.PENDING:
            return {/*TODO: translation function for display value*/displayText: "ingediend", value: 0}
        case Status.APPROVED:
            return {/*TODO: translation function for display value*/displayText: "geaccepteerd", value: 1}
        case Status.CANCELED:
            return {/*TODO: translation function for display value*/displayText: "geannuleerd", value: 2}
        case Status.FINISHED:
            return {/*TODO: translation function for display value*/displayText: "afgehandeld", value: 3}
    }
}