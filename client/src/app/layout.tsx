import Aside from '@/components/aside/Aside'
import Navbar from '@/components/navbar/Navbar'
import Providers from '@/providers/Providers'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'

const rubik = Rubik({ subsets: ['cyrillic', 'latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
	auth,
}: {
	children: React.ReactNode
	auth: React.ReactNode
}) {
	return (
		<Providers>
			<html lang='en'>
				<body className={rubik.className}>
					<Navbar />
					<Aside />
					<main className='container'>
						{auth}
						{children}
					</main>
				</body>
			</html>
		</Providers>
	)
}
