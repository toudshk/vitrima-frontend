// import { FC, useEffect, useState } from "react";
// import SocketApi from "@/api/socket";

// const useConnectSocket: FC<{ setArrivalMessage: any }> = ({
//   setArrivalMessage,
// }) => {
//   useEffect(() => {
//     SocketApi.createConnection();

//     SocketApi.socket?.on("client-path", (data) => {
//       setArrivalMessage({
//         sender: data.dto.senderId,
//         text: data.dto.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);
// };
// export default useConnectSocket;
