import { IconSearch } from '@tabler/icons-react'

const SearchBar = () => {
	return (
		<div className='border rounded-lg p-2 flex gap-2'>
			<input
				type='text'
				className='flex-1 outline-none'
				placeholder='Search...'
			/>
			<IconSearch />
		</div>
	)
}

export default SearchBar
