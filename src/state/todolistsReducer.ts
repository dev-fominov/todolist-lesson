import { TodolistsType } from "../App"
import { FilterValueType } from "../components/Todolist"

const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state = initialState, action: AllType): Array<TodolistsType> => {
	switch (action.type) {
		case 'ADD-TODOLIST': {
			return [{ id: action.payload.todolistID, title: action.payload.title, filter: 'all' }, ...state]
		}
		case 'REMOVE-TODOLIST': {
			return state.filter((el: any) => el.id !== action.payload.todolistID)
		}
		case 'CHANGE-FILTER': {
			return state.map((el: any) => el.id === action.payload.todolistID ? { ...el, filter: action.payload.filterValue } : el)
		}
		case 'UPDATE-TODOLIST': {
			return state.map((el: any) => el.id === action.payload.todolistID ? { ...el, title: action.payload.newTitle } : el)
		}
		default: return state
	}

}

export const addTodolistAC = (todolistID: string, title: string) =>
	({ type: 'ADD-TODOLIST', payload: { todolistID, title } } as const)

export const removeTodolistAC = (todolistID: string) =>
	({ type: 'REMOVE-TODOLIST', payload: { todolistID } } as const)

export const changeFilterAC = (todolistID: string, filterValue: FilterValueType) =>
	({ type: 'CHANGE-FILTER', payload: { todolistID, filterValue } } as const)

export const updateTodolistAC = (todolistID: string, newTitle: string) =>
	({ type: 'UPDATE-TODOLIST', payload: { todolistID, newTitle } } as const)





export type AllType = addTodolistType
	| removeTodolistType
	| changeFilterType
	| updateTodolistType

type addTodolistType = ReturnType<typeof addTodolistAC>
type removeTodolistType = ReturnType<typeof removeTodolistAC>
type changeFilterType = ReturnType<typeof changeFilterAC>
type updateTodolistType = ReturnType<typeof updateTodolistAC>