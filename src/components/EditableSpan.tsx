import { ChangeEvent, useState } from "react"

type TitleSpan = {
	title: string
	callBack: (newTitle: string) => void
}

export const EditableSpan = (props: TitleSpan) => {
	let [edit, setEdit] = useState<boolean>(false)
	let [error, setError] = useState<string | null>('')
	let [newTitle, setNewTitle] = useState<string>(props.title)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null)
		setNewTitle(e.currentTarget.value)
	}

	const editHandler = () => {
		setEdit(!edit)
		props.callBack(newTitle)
	}
	return (
		edit
			? <input value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler} className={error ? 'error' : ''} />
			: <span onDoubleClick={editHandler}>{props.title}</span>
	)
}