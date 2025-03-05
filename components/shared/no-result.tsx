interface Props {
	title: string
	description: string
}

function NoResult({ title, description }: Props) {
	return (
		<div className='mt-10 flex w-full flex-col items-center justify-center'>
			{/* <Image
			src='/assets/images/not-found.png'
			alt='No result'
			width={270}
			height={200}
			className='black object-contain'
		/> */}
			<h2 className='bold mt-8'>{title}</h2>
			<p className='body-regular my-3.5 max-w-md text-center'>{description}</p>
		</div>
	)
}

export default NoResult
