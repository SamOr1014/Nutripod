"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = () => router.push("api/auth/signout");
  return (
    <Button variant="outline" onClick={handleLogout}>
      <LogOut />
      Log Out
    </Button>
  );
};

export default LogoutButton;
