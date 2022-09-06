import { Button, Center, WrapItem } from "@chakra-ui/react";

export default function BookingDetail() {
  const fakeData: Array<any> = [
    { time: "09:00", booked: true },
    { time: "10:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
    { time: "11:00", booked: false },
  ];

  return (
    <>
      {fakeData.map((booking) => {
        if (booking.booked) {
          return (
            <WrapItem>
              <Center>
                <Button w="180px" h="40px" disabled={true}>
                  {booking.time}
                </Button>
              </Center>
            </WrapItem>
          );
        } else {
          return (
            <WrapItem>
              <Center>
                <Button w="180px" h="40px">
                  {booking.time}
                </Button>
              </Center>
            </WrapItem>
          );
        }
      })}
    </>
  );
}
