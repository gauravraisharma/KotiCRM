export interface Role {
    id: string;
    name: string;
    isactive: boolean;
}

export class RoleClass implements Role {
    id: string;
    name: string;
    isactive: boolean;

    constructor() {
        this.id = "";
        this.name = "";
        this.isactive = false;
    }
}
