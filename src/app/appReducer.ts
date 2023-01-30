export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = null | string
const initialState = {
	status: 'idle' as RequestStatusType,
	error: null as ErrorType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return { ...state, status: action.payload.status }
		case 'APP/SET-ERROR':
			return { ...state, error: action.payload.error }
		default:
			return state
	}
}

export const setStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', payload: { status } } as const)
export const setErrorAC = (error: ErrorType) => ({ type: 'APP/SET-ERROR', payload: { error } } as const)

type AppActionsType = ReturnType<typeof setStatusAC> | ReturnType<typeof setErrorAC>