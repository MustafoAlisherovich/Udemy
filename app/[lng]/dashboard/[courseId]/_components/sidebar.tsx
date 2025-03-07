import { getDashboardCourse } from '@/actions/course.action'
import { ISection } from '@/app.types'
import { Progress } from '@/components/ui/progress'
import { translation } from '@/i18n/server'
import { auth } from '@clerk/nextjs'
import Sections from './sections'

interface Props {
	courseId: string
	lng: string
}

async function Sidebar({ lng, courseId }: Props) {
	const { t } = await translation(lng)
	const { userId } = auth()
	const { course, progressPercentage, sections } = await getDashboardCourse(
		userId!,
		courseId
	)

	return (
		<div className='sticky inset-y-0 left-0 z-50 hidden h-screen w-80 overflow-y-scroll border-r bg-gray-200 dark:bg-gray-900 lg:block'>
			<div className='flex flex-col space-y-2 p-2'>
				<h1 className='line-clamp-1 text-xl font-medium'>{course.title}</h1>
				<Progress value={progressPercentage} className='h-4' />
				<p className='text-sm'>
					{progressPercentage}% {t('completed')}
				</p>
			</div>

			<div className='mt-4'>
				<Sections sections={sections as ISection[]} />
			</div>
		</div>
	)
}

export default Sidebar
