"use client";
import React from "react";
import { useSession } from "next-auth/react";
import {
  Button,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { doLogout, doSocialLogin } from "@/app/actions/index";

export default function InformationUser() {
  const { data: session, status, update } = useSession();
  return (
    <div className="flex flex-center gap-4">
      {status === "authenticated" ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              isBordered
              name={session?.user.name}
              className="transition-transform"
              description="Trial"
              avatarProps={{
                src: session?.user.image,
              }}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="subscription">Subscription</DropdownItem>
            <DropdownItem
              key="logout"
              onClick={async () => {
                await doLogout();
                // reload page
                window.location.reload();
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button
          onClick={async () => {
            await doSocialLogin();
          }}
        >
          Sign in
        </Button>
      )}
    </div>
  );
}
