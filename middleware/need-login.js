import { faDoorClosed } from "@fortawesome/free-solid-svg-icons";

export default defineNuxtRouteMiddleware(() => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  const token = useCookie("token");
  console.log('token :>> ', token);
  if (!useCookie("token").value) {

    return navigateTo({ name: "login" });
  }
});
