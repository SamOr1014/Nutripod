import { useMediaQuery } from "@chakra-ui/react";

export default function DataCenter() {
  const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");
  return (
    <>
      {isSmallerThan800 ? (
        ""
      ) : (
        <iframe
          key={"datacenter_client"}
          width="100%"
          height="100%"
          src="https://datastudio.google.com/embed/reporting/2570dc1b-ea37-44a4-b4e8-b515386f6560/page/DYK3C"
        ></iframe>
      )}
    </>
  );
}
