import { ChangeEvent, KeyboardEvent, memo, useCallback, useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"
import { EditableSpan } from "./EditableSpan"
import { Task } from "./Task"

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

export const Todolist = memo((props: TitleTodolistType) => {

	let [btnActive, setBtnActive] = useState<FilterValueType>('all')

	const removeTaskHandler = useCallback((taskID: string) => {
		props.removeTask(props.todolistID, taskID)
	}, [])
	const onChangeCheckedHandler = useCallback((id: string, eventCurrentTarget: boolean) => {
		props.changeStatus(props.todolistID, id, eventCurrentTarget)
	}, [])
	const updateTask = useCallback((newTitle: string, taskID: string) => {
		props.updateTask(props.todolistID, taskID, newTitle)
	}, [])
	const removeTodolistHandler = useCallback(() => {
		props.removeTodolist(props.todolistID)
	}, [])
	const addTaskHandler = useCallback((newTitle: string) => {
		props.addTask(props.todolistID, newTitle)
	}, [])
	const updateTodolistHandler = useCallback((newTitle: string) => {
		props.updateTodolist(props.todolistID, newTitle)
	}, [])

	let filteredTasks = props.tasks
	if (props.filter === 'active') {
		filteredTasks = props.tasks.filter(el => !el.isDone)
	}
	if (props.filter === 'completed') {
		filteredTasks = props.tasks.filter(el => el.isDone)
	}

	const changeFilterHandler = useCallback((filterValue: FilterValueType) => {
		props.changeFilter(props.todolistID, filterValue)
	}, [])


	return (
		<div>
			<h3>
				<EditableSpan title={props.title} callBack={updateTodolistHandler} />
				<Button className={''} name={"x"} callBack={removeTodolistHandler} />
			</h3>

			<Input callBack={addTaskHandler} />
			<ul>
				{
					filteredTasks.map((task) => {

						return (
							<Task
								key={task.id}
								isDone={task.isDone}
								title={task.title}
								id={task.id}
								removeTaskHandler={removeTaskHandler}
								onChangeCheckedHandler={onChangeCheckedHandler}
								updateTask={updateTask}
							/>
						)
					})
				}
			</ul>
			<div>
				<Button
					className={btnActive === 'all' ? 'btn-active' : ''}
					name={"all"}
					callBack={() => changeFilterHandler('all')} />
				<Button
					className={btnActive === 'active' ? 'btn-active' : ''}
					name={"active"}
					callBack={() => changeFilterHandler('active')} />
				<Button
					className={btnActive === 'completed' ? 'btn-active' : ''}
					name={"completed"}
					callBack={() => changeFilterHandler('completed')} />
			</div>
		</div>
	)
})