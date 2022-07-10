import WebSocket, {Server} from 'ws';
import {createServer} from "http";

export class Socket {
    ws: Server;
    constructor() {
        const server = createServer()
        this.ws = new WebSocket.Server({server})
        this.ws.on('connection', (ws) => {
            let timer = 0;
            ws.on('message', (msg) => {//сообщения приходят закодированные
                const {type, payload} = this.deserializeMsg(msg)//тут переводим в объект
                if (type === 'reset_timer') {
                    timer = 0;
                }
            })
            setInterval(() => {
                ws.send(//это отправим на бэк
                    JSON.stringify({type: 'update_timer', payload: timer++})
                    )
            }, 2000)
        })
        server.listen(3002)
    }
    deserializeMsg(msg: Buffer | ArrayBuffer | Buffer[]): {type: string, payload: any} {
        return JSON.parse(msg.toString('utf-8'))
    }
}

const socket = new WebSocket('ws://localhost:3002');
//вызывается при соединении
socket.onopen = () => {

}
//вызывается при закрытии, если бэк отключил или с инетом проблемы, в нем реконнект сокета можно сделать
socket.onclose = () => {

}
//сюда будем получать сообщения
socket.onmessage = (event) => {

}
