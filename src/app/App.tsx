import { useCallback, useEffect } from 'react';
import './App.css';
import s from './App.module.css';
import { Todolist, FilterValueType } from '../components/Todolist';
import { Input } from '../components/Input';
import { addTaskTC, removeTasksTC, updateTaskAC, updateTaskTC } from '../state/tasksReducer';
import { addTodosTC, changeFilterAC, getTodosTC, removeTodoTC, updateTodoTC } from '../state/todolistsReducer';
import { useAppDispatch, useAppSelector } from '../state/store';
import { GetTaskType, GetTodolistType } from '../api/api';
import { Preloader } from '../components/Preloader';
import { ErrorType, RequestStatusType } from './appReducer';
import { ErrorInfo } from '../components/ErrorsInfo';

export type TodolistsType = GetTodolistType & {
	filter: FilterValueType
}

export type TasksTodolistsType = {
	[key: string]: Array<GetTaskType>
}

function App() {

	useEffect(() => {
		dispatch(getTodosTC())
	}, [])

	const todolists = useAppSelector<Array<TodolistsType>>(state => state.todolists)
	const tasks = useAppSelector<TasksTodolistsType>(state => state.tasks)
	const status = useAppSelector<RequestStatusType>(state => state.app.status)
	const error = useAppSelector<ErrorType>(state => state.app.error)

	const dispatch = useAppDispatch()

	const addTodolist = useCallback((title: string) => {
		dispatch(addTodosTC(title))
		// dispatch(addTaskTodolistAC(todolistID))
	}, [dispatch])


	const removeTodolist = useCallback((todolistID: string) => {
		dispatch(removeTodoTC(todolistID))
		// dispatch(deleteTaskTodolistAC(todolistID))
	}, [dispatch])
	const changeFilter = useCallback((todolistID: string, filterValue: FilterValueType) => {
		dispatch(changeFilterAC(todolistID, filterValue))
	}, [dispatch])
	const updateTodolist = useCallback((todolistID: string, newTitle: string) => {
		dispatch(updateTodoTC(todolistID, newTitle))
	}, [dispatch])

	const removeTask = useCallback((todolistID: string, taskID: string) => {
		dispatch(removeTasksTC(todolistID, taskID))
	}, [dispatch])
	const addTask = useCallback((todolistID: string, title: string) => {
		dispatch(addTaskTC(todolistID, title))
	}, [dispatch])
	const changeStatus = useCallback((todolistID: string, taskID: string, checkedValue: boolean) => {
		let status = checkedValue ? 2 : 0
		dispatch(updateTaskTC(todolistID, taskID, status))
	}, [dispatch])
	const updateTask = useCallback((todolistID: string, taskID: string, newTitle: string) => {
		dispatch(updateTaskAC(todolistID, taskID, newTitle))
	}, [dispatch])

	return (
		<div className="App">
			<div className={s.appBar}>
				<div className={s.menuBox}>

				</div>
				{status === 'loading' && <Preloader />}

			</div>
			<div className={s.content}>
				<Input callBack={addTodolist} />
				<div className={s.todocontent}>
					{todolists.map(todolist => {
						return (
							<Todolist
								key={todolist.id}
								todolistID={todolist.id}
								title={todolist.title}
								tasks={tasks[todolist.id]}
								removeTask={removeTask}
								removeTodolist={removeTodolist}
								changeFilter={changeFilter}
								addTask={addTask}
								updateTask={updateTask}
								updateTodolist={updateTodolist}
								changeStatus={changeStatus}
								filter={todolist.filter}
							/>
						)
					})}
				</div>
			</div>
			{error !== null && <ErrorInfo />}
		</div>
	);
}

export default App;
