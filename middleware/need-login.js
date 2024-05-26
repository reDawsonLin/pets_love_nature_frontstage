export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (!useCookie("token").value) {
    return navigateTo({ name: "login" });
  }
});
