import { getCourseById } from '@/actions/course.action'
import Header from '../../_components/header'
import Actions from './_components/actions'
import { Separator } from '@/components/ui/separator'
import { Images, LayoutPanelLeft, Settings } from 'lucide-react'
import CourseFields from './_components/course-fields'
import Description from './_components/description'
import Information from './_components/inforamtion'
import SelectFields from './_components/select-fields'
import Sections from './_components/sections'
import Price from './_components/price'
import PreviewImage from './_components/preview-image'
import { getSections } from '@/actions/section.action'

async function Page({ params }: { params: { courseId: string } }) {
	const courseJSON = await getCourseById(params.courseId)
	const sectionsJSON = await getSections(params.courseId)

	const course = JSON.parse(JSON.stringify(courseJSON))
	const sections = JSON.parse(JSON.stringify(sectionsJSON))

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

			<div className='mt-6 grid grid-cols-2 gap-4'>
				<div className='flex flex-col space-y-2'>
					<div className='flex items-center gap-2'>
						<span className='font-space-grotesk text-3xl font-medium'>
							Course Fields
						</span>{' '}
						<Settings />
					</div>
					<CourseFields {...course} />
					<Description {...course} />
					<Information {...course} />
					<SelectFields {...course} />
					<Price {...course} />
				</div>
				<div className='flex flex-col space-y-2'>
					{/* Sections */}
					<div className='flex items-center gap-2'>
						<span className='font-space-grotesk text-3xl font-medium'>
							Course Sections
						</span>{' '}
						<LayoutPanelLeft />
					</div>
					<Sections course={course} sections={sections} />
					
					{/* Preview image */}
					<div className='flex items-center gap-2'>
						<span className='font-space-grotesk text-3xl font-medium'>
							Preview Image
						</span>
						{''}
						<Images />
					</div>
					<PreviewImage {...course} />
				</div>
			</div>
		</>
	)
}

export default Page
