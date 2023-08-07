import { useSelector } from "react-redux";

export const RoleProvider = ({ children, roles }) => {
    const user = useSelector((state) => state.authUser.user);

    let role_found = false;

    if (roles.length > 0) {
        for (let index = 0; index < roles.length; index++) {
            if (roles[index] == user.current_role_id) {
                role_found = true;
                break;
            }
        }

        if (role_found === true) {
            return (children);
        }
    }
}