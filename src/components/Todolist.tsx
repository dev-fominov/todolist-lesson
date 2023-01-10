import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"
import { EditableSpan } from "./EditableSpan"

export type TitleTodolistType = {
	title: string
	todolistID: string
	filter: FilterValueType
	tasks: Array<TaskType>
	removeTask: (todolistID: string, taskID: string) => void
	removeTodolist: (todolistID: string) => void
	changeFilter: (id: string, filterValue: FilterValueType) => void
	addTask: (todolistID: string, title: string) => void
	changeStatus: (todolistID: string, newId: string, checkedValue: boolean) => void
	updateTask: (todolistID: string, taskID: string, newTitle: string) => void
	updateTodolist: (todolistID: string, newTitle: string) => void
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

export const Todolist = (props: TitleTodolistType) => {

	let [btnActive, setBtnActive] = useState<FilterValueType>('all')

	const removeTaskHandler = (todolistID: string, taskID: string) => {
		props.removeTask(todolistID, taskID)
	}

	const onChangeCheckedHandler = (id: string, eventCurrentTarget: boolean) => {
		props.changeStatus(props.todolistID, id, eventCurrentTarget)
	}

	const removeTodolistHandler = () => {
		props.removeTodolist(props.todolistID)
	}

	const addTaskHandler = (newTitle: string) => {
		props.addTask(props.todolistID, newTitle)
	}

	const updateTodolistHandler = (newTitle: string) => {
		props.updateTodolist(props.todolistID, newTitle)
	}

	return (
		<div>
			<h3>
				<EditableSpan title={props.title} callBack={updateTodolistHandler} />
				<Button className={''} name={"x"} callBack={removeTodolistHandler} />
			</h3>

			<Input callBack={addTaskHandler} />
			<ul>
				{
					props.tasks.map((task) => {

						const onClickHandler = () => removeTaskHandler(props.todolistID, task.id)
						const updateTaskHandler = (newTitle: string) => {
							props.updateTask(props.todolistID, task.id, newTitle)
						}
						return (
							<li key={task.id} className={task.isDone ? 'opacity' : ''} >
								<Button className={''} name={"x"} callBack={onClickHandler} />
								<input type="checkbox" checked={task.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeCheckedHandler(task.id, e.currentTarget.checked)} />
								<EditableSpan title={task.title} callBack={updateTaskHandler} />
							</li>
						)
					})
				}
			</ul>
			<div>
				<Button
					className={btnActive === 'all' ? 'btn-active' : ''}
					name={"all"}
					callBack={() => props.changeFilter(props.todolistID, 'all')} />
				<Button
					className={btnActive === 'active' ? 'btn-active' : ''}
					name={"active"}
					callBack={() => props.changeFilter(props.todolistID, 'active')} />
				<Button
					className={btnActive === 'completed' ? 'btn-active' : ''}
					name={"completed"}
					callBack={() => props.changeFilter(props.todolistID, 'completed')} />
			</div>
		</div>
	)
}