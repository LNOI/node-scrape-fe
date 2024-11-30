"use server";
import { signIn, signOut } from "@/auth";

export async function doSocialLogin() {
  await signIn();
}

export async function doLogout() {
  try {
    await signOut({ redirect: true });
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
}
