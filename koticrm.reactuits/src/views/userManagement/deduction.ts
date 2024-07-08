export interface Deduction {
    id: number;
    name: string;
}

export class DeductionClass implements Deduction {
    id: number;
    name: string;

    constructor() {
        this.id = 0;
        this.name = "";
    }
}
