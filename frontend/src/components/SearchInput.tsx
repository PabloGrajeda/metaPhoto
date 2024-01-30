import { ChangeEvent } from 'react'

interface SearchInputProps {
	name: string
	value: string
	placeholder: string
	icon?: JSX.Element
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({
	name,
	value,
	placeholder,
	icon,
	onChange,
}: SearchInputProps) => {
	return (
		<div className='flex items-center'>
			<div className='border rounded-lg p-2 flex gap-2'>
				<input
					name={name}
					type='text'
					className='flex-1 outline-none'
					placeholder={placeholder}
					onChange={onChange}
					value={value}
				/>
				{icon || <></>}
			</div>
		</div>
	)
}

export default SearchInput
