// AuthenticatedRoute.js

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface PermissionAuthProps {
    modulePermission: any;
    isAuth: boolean; 
}
const PermissionAuth: React.FC<PermissionAuthProps> = ({ modulePermission, isAuth }) => {

    //user should be logged in and have authorization 
    if (isAuth) {
        const auth = useSelector((state: any) => state.authReducer.loggedIn);
        const Permissions = useSelector((state: any) => state.authReducer.modulePermission);
        let IsModulePermission = false;
        if (Permissions == null || Permissions == undefined) {
            IsModulePermission = false;
        }
        else if (modulePermission == null || modulePermission == undefined) {
            IsModulePermission = true;
        }
        else {
            //check for module in modulePermission
            const foundIndex = Permissions.findIndex((module: any) => { return module.moduleName == modulePermission })
            if (foundIndex != -1) {
                IsModulePermission = true;
            }
        }

        return (auth && IsModulePermission) ? <Outlet /> : <Navigate to="/dashboard" />;
    } else {
        return <Outlet />;
    }
};

export default PermissionAuth;
