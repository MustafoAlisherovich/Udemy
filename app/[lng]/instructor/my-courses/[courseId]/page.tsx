import { getCourseById } from '@/actions/course.action'
import Header from '../../_components/header'
import Actions from './_components/actions'
import { Separator } from '@/components/ui/separator'

async function Page({ params }: { params: { courseId: string } }) {
	const courseJSON = await getCourseById(params.courseId)
	const course = JSON.parse(JSON.stringify(courseJSON))

	return (
		<>
			<div className='flex items-center justify-between'>
				<Header
					title={course.title}
					description='Manage Your course and see how it is performing.'
				/>
				<Actions {...course} />
			</div>
			<Separator className='my-3 bg-muted-foreground' />
		</>
	)
}

export default Page
