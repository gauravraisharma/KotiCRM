import { useSelector } from "react-redux";

function GetModulePermissions(moduleName: string) {
    const modulePermissions = useSelector((state: any) => state.authReducer.modulePermission);
    const module = modulePermissions.find((x:any) => x.moduleName === moduleName);
    if (module) {
      return {
        isAdd: module.isAdd || false,
        isView: module.isView || false,
        isEdit: module.isEdit || false,
        isDelete: module.isDelete || false
      };
    } else {
      // If module not found, return default permissions
      return {
        isAdd: false,
        isView: false,
        isEdit: false,
        isDelete: false
      };
    }
  }

  export default GetModulePermissions;
  