export interface Deduction {
    id: string;
    name: string;
    isActive: boolean; // Adjusted property name to match TypeScript convention
}

export class DeductionClass implements Deduction {
    id: string;
    name: string;
    isActive: boolean; // Adjusted property name to match TypeScript convention

    constructor() {
        this.id = "";
        this.name = "";
        this.isActive = false;
    }
}
