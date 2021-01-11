export enum Status {
    PENDING = "ingediend",
    APPROVED = "goedgekeurd",
    CANCELED = "geannuleerd",
    FINISHED = "afgehandeld"
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
            return {/*TODO: translation function for display value*/displayText: "goedgekeurd", value: 1}
        case Status.CANCELED:
            return {/*TODO: translation function for display value*/displayText: "geannuleerd", value: 2}
        case Status.FINISHED:
            return {/*TODO: translation function for display value*/displayText: "afgehandeld", value: 3}
    }
}