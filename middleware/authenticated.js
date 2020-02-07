export default function({ store, route, redirect }) {
    if (!store.getters["auth/isAuthenticated"]) {
        if (route.path.includes("/login")) {} else {
            console.log("[auth] /login");
            return redirect(`/${store.state.i18n.locale}/login`);
        }
    }
}