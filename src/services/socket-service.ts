export class SocketService {
    socket: any;

    constructor() {
        this.socket = require('socket.io-client')('http://localhost:1337');
    }
}
