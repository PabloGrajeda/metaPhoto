import Card from '@/components/Card'
import Pagination from '@/components/Pagination'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { ChangeEvent, useEffect, useState } from 'react'
import { Filters, PhotoResponse } from '../../types'
import {
	IconLibraryPhoto,
	IconPhoto,
	IconSearch,
	IconUser,
	IconX,
} from '@tabler/icons-react'
import SearchInput from '@/components/SearchInput'

export default function Home(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	// const [currentPage, setCurrentPage] = useState(1)
	const [pageLimit, setPageLimit] = useState('25')
	const [offset, setOffset] = useState(0)
	const [photos, setPhotos] = useState(props.photos)
	// const [pages, setPages] = useState(props.pages)
	const [totalRecords, setTotalRecords] = useState(props.total)
	const [filters, setFilters] = useState<Filters>({
		photoTitle: '',
		albumTitle: '',
		userEmail: '',
	})

	const [formFilters, setFormFilters] = useState<Filters>({
		photoTitle: '',
		albumTitle: '',
		userEmail: '',
	})

	const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setFormFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}))
	}

	const handlePageLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const pageLimit = e.target.value
		setPageLimit(pageLimit)

		// fetch limit
		fetchPhotos(offset, +pageLimit)
	}

	const handleNext = () => {
		const newOffset =
			offset + photos.length <= totalRecords
				? offset + photos.length
				: totalRecords
		setOffset(newOffset)
		fetchPhotos(newOffset, +pageLimit)
	}

	const handlePrevious = () => {
		const newOffset =
			offset - photos.length >= 0 ? offset - photos.length : 0
		setOffset(newOffset)
		fetchPhotos(newOffset, +pageLimit)
	}

	const handleApplyFilters = () => {
		setFilters({
			photoTitle: formFilters.photoTitle.trim(),
			albumTitle: formFilters.albumTitle.trim(),
			userEmail: formFilters.userEmail.trim(),
		})
	}

	const handleClearFilter = () => {
		setFormFilters({
			photoTitle: '',
			albumTitle: '',
			userEmail: '',
		})

		setFilters({
			photoTitle: '',
			albumTitle: '',
			userEmail: '',
		})
	}
	const fetchPhotos = async (offset: number, limit: number) => {
		console.log('fetching')
		const photosResponse: PhotoResponse = await fetch(
			`http://localhost:8080/api/photos?offset=${offset}&limit=${limit}&title=${filters.photoTitle}&album.title=${filters.albumTitle}&album.user.email=${filters.userEmail}`
		).then((photos) => photos.json())

		setPhotos(photosResponse.photos)
		// setOffset(offset)
		// setPages(photosResponse.pages)
		setTotalRecords(photosResponse.total)
	}

	useEffect(() => {
		fetchPhotos(offset, +pageLimit)
	}, [filters])

	return (
		<main
			className={`flex flex-col gap-10 justify-center mx-10 py-10 items-center`}
		>
			<div className='flex flex-col md:flex-row gap-2 self-center'>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-col md:flex-row gap-2 self-center'>
						<SearchInput
							name='photoTitle'
							value={formFilters.photoTitle}
							placeholder='Photo Title'
							icon={<IconPhoto />}
							onChange={handleFilterChange}
						/>

						<SearchInput
							name='albumTitle'
							value={formFilters.albumTitle}
							placeholder='Album Title'
							icon={<IconLibraryPhoto />}
							onChange={handleFilterChange}
						/>

						<SearchInput
							name='userEmail'
							value={formFilters.userEmail}
							placeholder='User email'
							icon={<IconUser />}
							onChange={handleFilterChange}
						/>
					</div>

					{(formFilters.photoTitle ||
						formFilters.albumTitle ||
						formFilters.userEmail) && (
						<button
							className='text-xs self-end'
							type='button'
							onClick={handleClearFilter}
						>
							Clear filters
						</button>
					)}
				</div>

				<button
					type='button'
					className='flex justify-between gap-2 items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
					onClick={handleApplyFilters}
				>
					Apply Filters
					<IconSearch />
				</button>
			</div>

			<div className='flex flex-col gap-2'>
				<div className='flex gap-2 self-end items-center'>
					<div>Page Size&nbsp;</div>
					<select
						className='p-2 rounded'
						value={pageLimit}
						onChange={handlePageLimitChange}
					>
						<option>5</option>
						<option>10</option>
						<option>15</option>
						<option>25</option>
						<option>50</option>
						<option>100</option>
					</select>
				</div>
				<div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 overflow-hidden'>
					{photos.map((photo) => (
						<Card
							key={photo.id}
							title={photo.title}
							image={photo.thumbnailUrl}
							albumTitle={photo.album.title}
							userEmail={photo.album.user.email}
						/>
					))}
				</div>
			</div>

			<div className=''>
				<Pagination
					from={offset + 1}
					to={photos.length + offset}
					total={totalRecords}
					onNext={handleNext}
					onPrevious={handlePrevious}
				/>
			</div>
		</main>
	)
}

export const getServerSideProps = (async () => {
	const photosResponse: PhotoResponse = await fetch(
		'http://localhost:8080/api/photos'
	).then((photos) => photos.json())

	return {
		props: { ...photosResponse },
	}
}) satisfies GetServerSideProps<PhotoResponse>
