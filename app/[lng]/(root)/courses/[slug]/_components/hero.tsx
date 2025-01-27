'use client'

import { instructors } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import Image from 'next/image'
import ReactStars from 'react-stars'
import { PiStudentBold } from 'react-icons/pi'
import { Clock3 } from 'lucide-react'

function Hero() {
	const t = useTranslate()

	return (
		<>
			<h1 className='font-space-grotesk text-4xl font-bold'>
				ReactJS full course
			</h1>

			<p className='mt-4 text-muted-foreground'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ducimus
				nesciunt sint corporis quaerat repellendus nulla laudantium, aliquid
				maiores magni ipsam nostrum veritatis labore delectus earum doloremque
				tempore ipsa optio.
			</p>

			<div className='mt-4 flex flex-wrap items-center gap-6'>
				<Image
					width={50}
					height={50}
					alt='author'
					src={'/assets/author/chris-impey.jpg'}
					className='rounded-full'
				/>
				<p className='font-space-grotesk font-bold'>Chirs Empley</p>

				<div className='flex items-center gap-2 font-space-grotesk'>
					<p className='font-bold text-[#E59819]'>4.5</p>
					<ReactStars value={4.5} edit={false} color2='#E59819' />
					<p className='font-bold'>(199)</p>
				</div>

				<div className='flex items-center gap-2'>
					<PiStudentBold className='size-6 ' />
					<p className='font-space-grotesk font-bold'>80 {t('students')}</p> 
				</div>

				<div className='flex items-center gap-2'>
					<Clock3 className='size-6' />
					<p className='font-space-grotesk font-bold'>
						{t('lastUpdated')} 11/2023
					</p>
				</div>
			</div>

			<Image
				src={
					'https://www.sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2FmMbSyFqocdYGoyWHUeXA7npSGrhZX9NcIHO3JgUjB16z02ER&w=1200&q=75'
				}
				alt='course'
				width={1920}
				height={1080}
				className='mt-4 rounded-md object-cover'
			/>
		</>
	)
}

export default Hero
