export interface RoleList {
    id: string;
    name: string;
    createdOn: string;
    isDefault: boolean;
    isactive: boolean;
    isdelete: boolean;
}

export class RoleListClass implements RoleList {
    id: string;
    name: string;
    createdOn: string;
    isDefault: boolean;
    isactive: boolean;
    isdelete: boolean;

    constructor() {
        this.id = "";
        this.name = "";
        this.createdOn = "";
        this.isDefault = false;
        this.isactive = false;
        this.isdelete = false;
    }
}
