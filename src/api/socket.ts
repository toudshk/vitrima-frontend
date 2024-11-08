import io, { Socket } from "socket.io-client";

class SocketApi {
  static socket: null | Socket = null;
  static createConnection() {
    this.socket = io(`${process.env.APP_URL}`, {
      secure: true, // Это обычно необходимо для работы с HTTPS
      rejectUnauthorized: false, // Это может быть необходимо для самоподписанных сертификатов, но будьте осторожны
    });

    this.socket.on("connect", () => {
    });

    this.socket.on("disconnect", (e) => {
    });
  }
}
export default SocketApi