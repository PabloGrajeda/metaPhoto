import { IconLibraryPhoto, IconUser } from '@tabler/icons-react'
import Image from 'next/image'

interface CardProps {
	title: string
	image: string
	albumTitle: string
	userEmail: string
}
const Card = ({ title, image, albumTitle, userEmail }: CardProps) => {
	return (
		<div className='max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden'>
			<Image
				className='object-fill flex-3 w-full'
				src={image}
				width={150}
				height={150}
				alt=''
			/>
			<div className='p-3 flex flex-col gap-1 overflow-ellipsis whitespace-nowrap'>
				<h1 className='font-bold truncate'>{title}</h1>
				<span className='text-slate-500 inline-flex'>
					<IconLibraryPhoto className='mr-2' />
					{albumTitle}
				</span>
				<span className='text-slate-500 inline-flex'>
					<IconUser className='mr-2' />
					{userEmail}
				</span>
			</div>
		</div>
	)
}

export default Card
