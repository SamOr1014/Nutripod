import { Hide, VStack } from "@chakra-ui/react";
import DietitianNavLinks from "./Dietitian_nav_links";
export default function DietitianNav() {
  function CollapsedNav() {
    return (
      <>
        <Hide below="1200px">
          <VStack
            direction="column"
            width="120px"
            maxH="100%"
            spacing="5"
            p="10"
          >
            <DietitianNavLinks />
          </VStack>
        </Hide>
      </>
    );
  }

  return <CollapsedNav />;
}
