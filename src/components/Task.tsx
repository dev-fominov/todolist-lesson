import { ChangeEvent, memo, useCallback } from "react"
import { Button } from "./Button"
import { EditableSpan } from "./EditableSpan"

type TaskType = {
	id: string
	isDone: boolean
	title: string
	removeTaskHandler: (taskID: string)=>void
	onChangeCheckedHandler: (id: string, eventCurrentTarget: boolean)=>void
	updateTask: (newTitle: string, taskID: string)=>void
}

export const Task = memo((props: TaskType) => {

	const onClickHandler = useCallback(() => {
		props.removeTaskHandler(props.id)
	}, [])
	const updateTaskHandler = useCallback(() => {
		props.updateTask(props.title, props.id)
	}, [])

	return (
		<>
			<li key={props.id} className={props.isDone ? 'opacity' : ''} >
				<Button className={''} name={"x"} callBack={onClickHandler} />
				<input type="checkbox" checked={props.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChangeCheckedHandler(props.id, e.currentTarget.checked)} />
				<EditableSpan title={props.title} callBack={updateTaskHandler} />
			</li></>
	)
})