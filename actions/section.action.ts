'use server'

import { connectToDatabase } from '@/lib/mongoose'
import Section from '@/database/section.model'
import { IUpdateSection } from './types'
import { revalidatePath } from 'next/cache'

export const getSections = async (course: string) => {
	try {
		await connectToDatabase()
		return await Section.find({ course }).sort({ position: 1 })
	} catch (error) {
		throw new Error('Something went wrong')
	}
}

export const createSection = async (
	course: string,
	title: string,
	path: string
) => {
	try {
		await connectToDatabase()
		const sections = await Section.find({ course })
		const position = sections.length + 1
		revalidatePath(path)
		await Section.create({ course, title, position })
	} catch (error) {
		throw new Error('Something went wrong')
	}
}

export const updateSection = async (params: IUpdateSection) => {
	try {
		await connectToDatabase()
		const { lists, path } = params
		for (const item of lists) {
			await Section.findByIdAndUpdate(item._id, { position: item.position })
		}
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong')
	}
}
