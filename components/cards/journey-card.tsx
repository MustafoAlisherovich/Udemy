import { IJourney } from '@/types'
import Image from 'next/image'

function JourneyCard(journey: IJourney) {
	return (
		<div className='flex flex-col items-center justify-center rounded-md bg-primary p-6 text-center'>
			<Image 
				src={journey.image}
				alt={journey.title}
				width={70}
				height={70}
			/>
			<h2 className='mt-2 line-clamp-1 font-space-grotesk text-lg font-bold text-secondary'>
				{journey.title}
			</h2>
			<p className='line-clamp-2 text-secondary'>
				{journey.excerpt}
			</p>
		</div>
	)
}

export default JourneyCard
