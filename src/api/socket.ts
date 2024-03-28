import io, { Socket } from "socket.io-client";

class SocketApi {
  static socket: null | Socket = null;
  static createConnection() {
    // Используйте https вместо http, если ваш сервер поддерживает HTTPS
    this.socket = io(`${process.env.APP_URL}`, {
      secure: true, // Это обычно необходимо для работы с HTTPS
      rejectUnauthorized: false, // Это может быть необходимо для самоподписанных сертификатов, но будьте осторожны
    });

    this.socket.on("connect", () => {
      console.log("connected");
    });

    this.socket.on("disconnect", (e) => {
      console.log("disconnect");
    });
  }
}
export default SocketApi