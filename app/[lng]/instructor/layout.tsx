import { ChildProps } from '@/types'
import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'

function Layout({ children }: ChildProps) {
	return (
		<>
			<Navbar />
			<Sidebar />
			<main className='p-4 w-full pl-[320px] pt-[12vh]'>
				<div className='size-full rounded-md bg-secondary px-4 pb-4'>
					{children}
				</div>
			</main>
		</>
	)
}

export default Layout
