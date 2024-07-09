// components/Chat.tsx
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3000/api')

const Chat = ({ chatId, userId }: { chatId: string; userId: string }) => {
	const [message, setMessage] = useState('')
	const [chat, setChat] = useState<string[]>([])

	useEffect(() => {
		socket.on('msgToClient', (message: { content: string }) => {
			setChat(prevChat => [...prevChat, message.content])
		})

		return () => {
			socket.off('msgToClient')
		}
	}, [])

	const sendMessage = () => {
		socket.emit('msgToServer', { chatId, userId, content: message })
		setMessage('')
	}

	return (
		<div>
			<div>
				{chat.map((msg, index) => (
					<div key={index}>{msg}</div>
				))}
			</div>
			<input
				type='text'
				value={message}
				onChange={e => setMessage(e.target.value)}
			/>
			<button onClick={sendMessage}>Send</button>
		</div>
	)
}

export default Chat
