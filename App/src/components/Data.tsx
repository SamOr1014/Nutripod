import { useMediaQuery } from "@chakra-ui/react";

export default function DataCenter() {
  const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");
  return (
    <>
      {isSmallerThan800 ? (
        ""
      ) : (
        <iframe
          title="PowerBI_iframe"
          width="100%"
          height="100%"
          src="https://datastudio.google.com/embed/reporting/2b7c1066-4eb1-47b1-a127-1812eaedb8f9/page/p_5ixedkbyyc"
        ></iframe>
      )}
    </>
  );
}
