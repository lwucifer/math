import { getToken } from "~/utils/auth";
import { USER_ROLES } from "~/utils/constants";

export default function ({ store, route, redirect }) {
    const accountRole = store.getters['auth/roles'] || [];
    console.log("[Middlware] teacher role accountRole", accountRole);

    const roleNames = accountRole.map(r => r.authority);
    const isTeacherRole = (roleNames.length > 0 && roleNames.includes(USER_ROLES.ROLE_TEACHER));
    console.log("[Middlware] teacher role", roleNames, isTeacherRole);
    
    if (!isTeacherRole) {
        return redirect(`/`);
    }
}