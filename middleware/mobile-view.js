import { getDesktopViewFromCookie, getDesktopView } from "~/utils/common";

export default function({ req, store, redirect, isMobile }) {
  if (isMobile) {
    const desktopView = store.state.desktopView;
    const desktopViewStatus = process.server
      ? getDesktopViewFromCookie(req)
      : getDesktopView();

    if (desktopViewStatus && JSON.parse(desktopViewStatus)) {
      !desktopView && store.commit("setDesktopView", true);
    } else {
      store.commit("setDesktopView", false);
      // redirect("/mobile");
    }
  }
}
