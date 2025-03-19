import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IRoomInventory } from "../(hooks)/useRoomRateAvailabilityCalendar";


interface IProps {
  inventory: IRoomInventory;
  room_category: {
    id: string;
    name: string;
  };
}


// export default function RoomInventoryStatusCell(props: IProps) {
//   const theme = useTheme();
// console.log('aaaa',props.inventory)
//   return (
//     <>
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           pr: 1,
//           fontSize: "18px",
//           textAlign: "right",
//           fontWeight: "bold",
//           borderLeft: "1px solid",
//           borderBottom: "1px solid",
//           borderColor: props.inventory.status
//             ? theme.palette.success.light
//             : theme.palette.error.dark,
//           color: theme.palette.background.default,
//           backgroundColor: props.inventory.status
//             ? theme.palette.success.main
//             : theme.palette.error.main,
//           cursor: "pointer",
//         }}
//       >
//         {props.inventory.status ? "Open" : "Close"}
//       </Box>
//     </>
//   );
// }


export default function RoomInventoryStatusCell(props: IProps) {
  const theme = useTheme();
  console.log("aaaa", props.inventory);
  return (
    <>
      {/* Room status  */}
      <Box
        sx={{
          width: "100%",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
          color: theme.palette.background.default,
          backgroundColor: props.inventory.status
            ? theme.palette.success.main
            : theme.palette.error.main,
          cursor: "pointer",
        }}
      >
        {props.inventory.status ? "Open" : "Close"}
      </Box>
      {/* Rooms to sell */}
      <Box
        sx={{
          width: "100%",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
        {props?.inventory?.available}
      </Box>
      {/* Net booked  */}
      <Box
        sx={{
          width: "100%",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
        {props?.inventory?.booked}
      </Box>
      {/* Standard  */}
      <Box
        sx={{
          width: "100%",
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
        500
      </Box>
      {/* Min. length of stay  */}
      <Box
        sx={{
          width: "100%",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
       {props?.inventory?.booked}
      </Box>
      {/* Min. advance  */}
      <Box
        sx={{
          width: "100%",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
       0
      </Box>
      {/* Ramadan  */}
      <Box
        sx={{
          width: "100%",
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
          {props?.inventory?.booked}
      </Box>
      {/* Min. length of stay  */}
      <Box
        sx={{
          width: "100%",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
        0
      </Box>
      {/* Min. advance  */}
      <Box
        sx={{
          width: "100%",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
        0
      </Box>
      {/* Dhamaka 25  */}
      <Box
        sx={{
          width: "100%",
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
        0
      </Box>
      {/* Min. length of stay  */}
      <Box
        sx={{
          width: "100%",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
        0
      </Box>
      {/* Min. advance  */}
      <Box
        sx={{
          width: "100%",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
        0
      </Box>
      {/* Eid 25  */}
      <Box
        sx={{
          width: "100%",
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
        0
      </Box>
      {/* Min. length of stay  */}
      <Box
        sx={{
          width: "100%",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
        0
      </Box>
      {/* Min. advance  */}
     <Box
        sx={{
          width: "100%",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pr: 1,
          fontSize: "18px",
          textAlign: "right",
          fontWeight: "bold",
          borderLeft: "1px solid",
          borderBottom: "1px solid",
          borderColor: props.inventory.status
            ? theme.palette.success.light
            : theme.palette.error.dark,
        }}
      >
        0
      </Box>
    </>
  );
}