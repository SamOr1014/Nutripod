import { Hide, VStack } from "@chakra-ui/react";
import DietitianNavLinks from "./Dietitian_nav_links";
export default function DietitianNav() {
  function CollapsedNav() {
    return (
      <>
        <Hide below="md">
          <VStack
            direction="column"
            width="120px"
            maxH="100%"
            spacing="5"
            p="2"
          >
            <DietitianNavLinks />
          </VStack>
        </Hide>
      </>
    );
  }

  return <CollapsedNav />;
}
