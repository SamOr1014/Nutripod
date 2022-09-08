import { Hide, VStack } from "@chakra-ui/react";
import UserNavLinks from "./User_nav_links";

export default function UserNav() {
  function CollapsedNav() {
    return (
      <>
        <Hide below="md">
          <VStack
            direction="column"
            width="120px"
            maxH="100%"
            spacing="5"
            p="10"
          >
            <UserNavLinks />
          </VStack>
        </Hide>
      </>
    );
  }

  return <CollapsedNav />;
}
