import { Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

export default function FrontPage() {
  return (
    <>
      <Link as={ReactLink} to="/dashboard">
        TO inside
      </Link>
      <Link as={ReactLink} to="/dietitian">
        Dietitians
      </Link>
      <Link as={ReactLink} to="/login">
        Login
      </Link>
    </>
  );
}
