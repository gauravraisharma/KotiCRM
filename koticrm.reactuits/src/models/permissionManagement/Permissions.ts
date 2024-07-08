export interface Permission {
    moduleId: number;
    roleId: string;
    permissionId: number;
    moduleName: string;
    isView: boolean;
    isEdit: boolean;
    isDelete: boolean;
    isAdd: boolean;
}

export class PermissionClass implements Permission {
    moduleId: number;
    roleId: string;
    permissionId: number;
    moduleName: string;
    isView: boolean;
    isEdit: boolean;
    isDelete: boolean;
    isAdd: boolean;

    constructor() {
        this.moduleId = 0;
        this.roleId = "";
        this.permissionId = 0;
        this.moduleName = "";
        this.isView = false;
        this.isEdit = false;
        this.isDelete = false;
        this.isAdd = false;
    }
}

