import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"

export type TitleTodolistType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (id: string) => void
	addTask: (title: string) => void
	checkBoxChange: (id: string, checkedValue: boolean) => void
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type filterValueType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: TitleTodolistType) => {

	let [filterTasks, setFilterTasks] = useState<filterValueType>('All')
	let [inputValue, setInputValue] = useState<string>('')
	let [error, setError] = useState<string|null>('')
	let [btnActive, setBtnActive] = useState<string>('All')

	const taskFilter = (filterValue: filterValueType) => {
		setFilterTasks(filterValue)
		setBtnActive(filterValue)
	}

	let filteredTasks = props.tasks
	if (filterTasks === 'Active') {
		filteredTasks = props.tasks.filter(el => !el.isDone)
	}
	if (filterTasks === 'Completed') {
		filteredTasks = props.tasks.filter(el => el.isDone)
	}

	const onChangeInput = (value: any) => {
		setInputValue(value)
	}

	const addTaskHandler = () => {
		if (inputValue.trim()) {
			props.addTask(inputValue.trim())
			setInputValue('')
		} else {
			setError('Title is required')
		}

	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null)
		onChangeInput(e.currentTarget.value)
	}

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') addTaskHandler()
	}
	const removeTaskHandler = (id: string) => {
		props.removeTask(id)
	}

	const onChangeCheckedHandler = (id: string, eventCurrentTarget: boolean) => {
		props.checkBoxChange(id, eventCurrentTarget)
	}

	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input value={inputValue}
					onChange={onChangeHandler}
					onKeyDown={onKeyDownHandler}
					className={error ? 'error' : ''} />
				<Button className={''} name={"+"} callBack={addTaskHandler} />
			</div>
			{ error && <div className={"error-message"}>{error}</div> }
			
			<ul>
				{
					filteredTasks.map((task) => {

						const onClickHandler = () => removeTaskHandler(task.id)

						return (
							<li key={task.id} className={task.isDone ? 'opacity' : ''} >
								<Button className={''} name={"x"} callBack={onClickHandler} />
								<input type="checkbox" checked={task.isDone} onChange={(e:ChangeEvent<HTMLInputElement>)=>onChangeCheckedHandler(task.id, e.currentTarget.checked)} />
								<span>{task.title}</span>
							</li>
						)
					})
				}
			</ul>
			<div>
				<Button className={btnActive==='All' ? 'btn-active' : ''} name={"All"} callBack={() => taskFilter('All')} />
				<Button className={btnActive==='Active' ? 'btn-active' : ''}name={"Active"} callBack={() => taskFilter('Active')} />
				<Button className={btnActive==='Completed' ? 'btn-active' : ''}name={"Completed"} callBack={() => taskFilter('Completed')} />
			</div>
		</div>
	)
}