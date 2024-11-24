"use server";
import { signIn, signOut } from "@/auth";

export async function doSocialLogin() {
  await signIn("keycloak");
}
export async function doLogout() {
  try {
    await signOut({ redirect: false });
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
}
