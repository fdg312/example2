// src/chat/chat.gateway.ts
import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets'

@WebSocketGateway()
// implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
export class ChatGateway {
	// @WebSocketServer() server: Server
	// private logger: Logger = new Logger('ChatGateway')

	// constructor(private messageService: MessageService) {}

	// afterInit(server: Server) {
	// 	this.logger.log('Init')
	// }

	// handleDisconnect(client: Socket) {
	// 	this.logger.log(`Client disconnected: ${client.id}`)
	// }

	// handleConnection(client: Socket, ...args: any[]) {
	// 	this.logger.log(`Client connected: ${client.id}`)
	// }
	@SubscribeMessage('msgToServer')
	handleMessage(@MessageBody() body: any) {
		console.log(body)
	}
	// async handleMessage(
	// 	client: Socket,
	// 	payload: { chatId: string; userId: string; content: string }
	// ) {
	// 	console.log(payload)

	// 	const message = await this.messageService.create(
	// 		payload.userId,
	// 		payload.chatId,
	// 		payload.content
	// 	)
	// 	return 'hello'
	// 	// this.server.emit('msgToClient', message)
	// }
}
