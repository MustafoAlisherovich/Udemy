'use client'

import { ICourse } from '@/app.types'
import { Button } from '@/components/ui/button'
import React from 'react'

function Actions(course: ICourse) {
	return (
		<div className='flex gap-2 self-end'>
			<Button>
				{course.published ? "Draft" : "Publish"}
			</Button>
			<Button variant={'destructive'}>
				Delete
			</Button>
		</div>
	)
}

export default Actions
