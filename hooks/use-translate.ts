import { useTranslation } from '@/i18n/client'
import { useParams } from 'next/navigation'
import React from 'react'

function useTranslate() {
		const {lng} = useParams()
		const {t} = useTranslation(lng as string)

		return t
}

export default useTranslate
