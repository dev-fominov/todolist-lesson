import { v1 } from "uuid"
import { TasksTodolistsType } from "../App"

const initialState: TasksTodolistsType = {}

export const tasksReducer = (state = initialState, action: allType): TasksTodolistsType => {
	switch (action.type) {
		case 'REMOVE-TASKS': {
			return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskID) }
		}
		case 'ADD-TASK': {
			return { ...state, [action.payload.todolistID]: [{ id: v1(), title: action.payload.title, isDone: false }, ...state[action.payload.todolistID]] }
		}
		case 'ADD-TASK-TODOLIST': {
			return { ...state, [action.payload.todolistID]: [] }
		}
		case 'CHANGE-STATUS': {
			return {
				...state,
				[action.payload.todolistID]: state[action.payload.todolistID]
					.map(task => task.id === action.payload.taskID
						? { ...task, isDone: action.payload.checkedValue }
						: task
					)
			}
		}
		case 'UPDATE-TASK': {
			return {
				...state, [action.payload.todolistID]: state[action.payload.todolistID]
					.map(el => el.id === action.payload.taskID
						? { ...el, title: action.payload.newTitle }
						: el
					)
			}
		}
		case 'DELETE-TASK-TODOLIST': {
			delete state[action.payload.todolistID]
			return state
		}
		default: return state
	}
}

export const removeTaskAC = (todolistID: string, taskID: string) =>
	({ type: 'REMOVE-TASKS', payload: { todolistID, taskID } } as const)

export const addTaskAC = (todolistID: string, title: string) =>
	({ type: 'ADD-TASK', payload: { todolistID, title } } as const)

export const addTaskTodolistAC = (todolistID: string) =>
	({ type: 'ADD-TASK-TODOLIST', payload: { todolistID } } as const)

export const changeStatusAC = (todolistID: string, taskID: string, checkedValue: boolean) =>
	({ type: 'CHANGE-STATUS', payload: { todolistID, taskID, checkedValue } } as const)

export const updateTaskAC = (todolistID: string, taskID: string, newTitle: string) =>
	({ type: 'UPDATE-TASK', payload: { todolistID, taskID, newTitle } } as const)

export const deleteTaskTodolistAC = (todolistID: string) =>
	({ type: 'DELETE-TASK-TODOLIST', payload: { todolistID } } as const)


type allType = removeTaskType
	| addTaskType
	| addTaskTodolistType
	| changeStatusType
	| updateTaskType
	| deleteTaskTodolistType

type removeTaskType = ReturnType<typeof removeTaskAC>
type addTaskType = ReturnType<typeof addTaskAC>
type addTaskTodolistType = ReturnType<typeof addTaskTodolistAC>
type changeStatusType = ReturnType<typeof changeStatusAC>
type updateTaskType = ReturnType<typeof updateTaskAC>
type deleteTaskTodolistType = ReturnType<typeof deleteTaskTodolistAC>