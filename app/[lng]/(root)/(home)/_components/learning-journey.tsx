'use client'

import JourneyCard from '@/components/cards/journey-card'
import { learningJourney } from '@/constants'
import useTranslate from '@/hooks/use-translate'

function LearningJourney() {
	const t = useTranslate()

	return (
		<div className='container mx-auto max-w-6xl py-24'>
			<h1 className='text-center font-space-grotesk text-2xl font-bold'>
				{t('learningJourney')}
			</h1>
			<p className='mx-auto max-w-4xl text-center text-sm text-muted-foreground'>
				{t('learningJourneyDescription')}
			</p>

			<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{learningJourney.map((journey) => (
					<JourneyCard key={journey.title} {...journey} />
				))}
			</div>
		</div>
	)
}

export default LearningJourney
