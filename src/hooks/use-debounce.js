import { useEffect, useState } from 'react'

export const useDebounce = (initialValue, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(initialValue)

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedValue(initialValue)
		}, delay)

		return () => clearTimeout(timerId)
	}, [initialValue, delay])

	return debouncedValue
}