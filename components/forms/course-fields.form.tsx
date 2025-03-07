'use client'

import { createCourse } from '@/actions/course.action'
import { courseCategory, courseLanguage, courseLevels } from '@/constants'
import { useUploadThing } from '@/lib/uploadthing'
import { courseSchema } from '@/lib/validation'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageDown } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

function CourseFieldsForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [open, setOpen] = useState(false)

	const router = useRouter()
	const { user } = useUser()

	const { startUpload } = useUploadThing('imageUploader')

	const form = useForm<z.infer<typeof courseSchema>>({
		resolver: zodResolver(courseSchema),
		defaultValues: defaultVal,
	})

	function onUpload(e: ChangeEvent<HTMLInputElement>) {
		const files = e.target.files
		if (!files || files.length === 0) return

		setSelectedFile(files[0])

		const reader = new FileReader()
		reader.onload = e => {
			setPreviewImage(e.target?.result as string)
		}
		reader.readAsDataURL(files[0])
	}

	async function onSubmit(values: z.infer<typeof courseSchema>) {
		if (!previewImage) {
			return toast.error('Please upload a preview image')
		}

		setIsLoading(true)

		let imageUrl = ''

		if (selectedFile) {
			const uploadedFiles = await startUpload([selectedFile])
			if (uploadedFiles && uploadedFiles[0]?.url) {
				imageUrl = uploadedFiles[0].url
			}
		}

		const promise = createCourse(
			{
				...values,
				oldPrice: +values.oldPrice,
				currentPrice: +values.currentPrice,
				previewImage: imageUrl,
			},
			user?.id as string
		)
			.then(() => {
				form.reset()
				router.push('/en/instructor/my-courses')
			})
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully created!',
			error: 'Something went wrong',
		})
	}

	return (
		<>
			<Form {...form}>
				<form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Course title<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-secondary'
										placeholder='Learn ReactJS - from 0 to hero'
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Short description<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										className='h-44 bg-secondary'
										placeholder='Description'
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='learning'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										What will students learn in your course?
										<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className='bg-secondary'
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='requirements'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Requirements
										<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className='bg-secondary'
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='grid grid-cols-3 gap-4'>
						<FormField
							control={form.control}
							name='level'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Level<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}
											disabled={isLoading}
										>
											<SelectTrigger className='w-full bg-secondary'>
												<SelectValue placeholder={'Select'} />
											</SelectTrigger>
											<SelectContent>
												{courseLevels.map(item => (
													<SelectItem key={item} value={item}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Category<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}
											disabled={isLoading}
										>
											<SelectTrigger className='w-full bg-secondary'>
												<SelectValue placeholder={'Select'} />
											</SelectTrigger>
											<SelectContent>
												{courseCategory.map(item => (
													<SelectItem key={item} value={item}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='language'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Language<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}
											disabled={isLoading}
										>
											<SelectTrigger className='w-full bg-secondary'>
												<SelectValue placeholder={'Select'} />
											</SelectTrigger>
											<SelectContent>
												{courseLanguage.map(item => (
													<SelectItem key={item} value={item}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='oldPrice'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Old price<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											className='bg-secondary'
											type='number'
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='currentPrice'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Current Price<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											className='bg-secondary'
											type='number'
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormItem>
							<FormLabel>
								Preview image<span className='text-red-500'>*</span>
							</FormLabel>
							<Input
								className='bg-secondary'
								type='file'
								disabled={isLoading}
								onChange={onUpload}
							/>
						</FormItem>
					</div>

					<div className='flex justify-end gap-4'>
						<Button
							type='button'
							variant={'destructive'}
							onClick={() => form.reset()}
							disabled={isLoading}
						>
							Clear
						</Button>
						<Button type='submit' disabled={isLoading}>
							Submit
						</Button>
						{previewImage && (
							<Button
								type='button'
								variant={'outline'}
								onClick={() => setOpen(true)}
							>
								<span>Image</span>
								<ImageDown className='ml-2 size-4' />
							</Button>
						)}
					</div>
				</form>
			</Form>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<div className='relative h-72'>
						<Image
							src={previewImage}
							alt='preview-image'
							fill
							className='object-cover'
						/>
					</div>
					<Button
						className='w-fit'
						variant={'destructive'}
						onClick={() => {
							setPreviewImage('')
							setOpen(false)
						}}
					>
						Remove
					</Button>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default CourseFieldsForm

const defaultVal = {
	title: '',
	description: '',
	learning: '',
	requirements: '',
	level: '',
	category: '',
	language: '',
	oldPrice: '',
	currentPrice: '',
}
