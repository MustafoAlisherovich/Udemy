import { min } from 'date-fns'
import { z } from 'zod'

export const contactSchema = z.object({
	message: z.string().min(10),
	email: z.string().email(),
	name: z.string().min(3),
})

export const courseSchema = z.object({
	title: z.string().min(3),
	description: z.string().min(10),
	learning: z.string(),
	requirements: z.string(),
	level: z.string(),
	language: z.string(),
	category: z.string(),
	oldPrice: z.string().min(0),
	currentPrice: z.string().min(0),
})

export const CourseFieldsSchema = z.object({
	title: z.string().min(3),
	slug: z.string().min(3),
})

export const descriptionSchema = z.object({
	description: z.string().min(10)
})

export const validationSchema = z.object({
	learning: z.string(),
	requirements: z.string(),
	tags: z.string()
})

export const selectFieldsSchema = z.object({
	language: z.string(),
	category: z.string(),
	level: z.string()
})

export const priceSchema = z.object({
	oldPrice: z.string(),
	currentPrice: z.string(),
})

export const sectionSchema = z.object({
	title: z.string().min(3),
})

export const LessonSchema = z.object({
	title: z.string().min(3),
	videoUrl: z.string().url(),
	content: z.string(),
	hours: z.string(),
	minutes: z.string(),
	seconds: z.string(),
})