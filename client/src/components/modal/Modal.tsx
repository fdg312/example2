import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'

const Modal = ({ children }: { children: React.ReactNode }) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const router = useRouter()

	const handleClose = (event: any) => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			router.back()
		}
	}

	return (
		<div className={`fixed z-10 inset-0 overflow-y-auto block`}>
			<div
				className='flex items-center justify-center min-h-screen'
				onClick={handleClose}
			>
				<div className='fixed inset-0 transition-opacity' aria-hidden='true'>
					<div className='absolute inset-0 bg-gray-500 opacity-75'></div>
				</div>
				<div
					ref={modalRef}
					className='relative bg-white rounded-lg overflow-hidden max-w-md min-w-[380px]'
				>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Modal
