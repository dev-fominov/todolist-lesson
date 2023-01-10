import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"

type InputType = {
	callBack: (title: string) => void
}

export const Input = (props: InputType) => {

	let [inputValue, setInputValue] = useState<string>('')
	let [error, setError] = useState<string | null>('')

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null)
		setInputValue(e.currentTarget.value)
	}

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') addTaskHandler()
	}

	const addTaskHandler = () => {
		if (inputValue.trim()) {
			props.callBack(inputValue.trim())
			setInputValue('')
		} else {
			setError('Title is required')
		}
	}

	return (
		<div>
			<div>
				<input value={inputValue}
					onChange={onChangeHandler}
					onKeyDown={onKeyDownHandler}
					className={error ? 'error' : ''} />
				<Button className={''} name={"+"} callBack={addTaskHandler} />
			</div>
			{error && <div className={"error-message"}>{error}</div>}
		</div>
	)
}