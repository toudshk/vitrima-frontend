import io, { Socket } from "socket.io-client";

class SocketApi {
  static socket: null | Socket = null;

  static createConnection() {
    this.socket = io("http://localhost:5000/");

    this.socket.on("connect", () => {
      console.log("connected");
    });
    this.socket.on("disconnect", (e) => {
      console.log("disconnect");
    });
    
  }
}
export default SocketApi