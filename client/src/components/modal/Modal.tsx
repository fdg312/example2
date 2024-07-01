import useSessionStore from '@/stores/sessionStore'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { RxCross2 } from 'react-icons/rx'

const Modal = ({ children }: { children: React.ReactNode }) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const closeBtnRef = useRef<HTMLDivElement>(null)
	const router = useRouter()
	const { previousPage } = useSessionStore()

	const handleClose = (event: any) => {
		if (
			modalRef.current &&
			(!modalRef.current.contains(event.target) ||
				closeBtnRef.current?.contains(event.target))
		) {
			console.log(previousPage)

			if (!!previousPage.length && previousPage[1] !== '/') {
				return router.back()
			}
			router.push('/')
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
					<div
						ref={closeBtnRef}
						onClick={handleClose}
						className='absolute top-3 right-3 bg-transparent border-0 cursor-pointer'
					>
						<RxCross2 className='text-5xl text-black' />
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Modal
