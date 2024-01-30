import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react'
import { Photo } from '../../types'

interface PaginationProps {
	from: number
	to: number
	total: number
	onNext: () => void
	onPrevious: () => void
}
const Pagination = ({
	from,
	to,
	total,
	onNext,
	onPrevious,
}: PaginationProps) => {
	return (
		<div className='flex flex-col items-center'>
			<span className='text-sm text-gray-700 dark:text-gray-400'>
				Showing{' '}
				<span className='font-semibold text-gray-900 dark:text-white'>
					{from}
				</span>{' '}
				to{' '}
				<span className='font-semibold text-gray-900 dark:text-white'>
					{to}
				</span>{' '}
				of{' '}
				<span className='font-semibold text-gray-900 dark:text-white'>
					{total}
				</span>{' '}
				Entries
			</span>
			<div className='inline-flex mt-2 xs:mt-0'>
				<button
					className='flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:hover:opacity-50 disabled:hover:bg-gray-800'
					disabled={from === 1}
					onClick={onPrevious}
				>
					<IconArrowNarrowLeft />
					Prev
				</button>
				<button
					className='flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:hover:opacity-50 disabled:hover:bg-gray-800'
					disabled={to === total}
					onClick={onNext}
				>
					Next
					<IconArrowNarrowRight />
				</button>
			</div>
		</div>
	)
}

export default Pagination
