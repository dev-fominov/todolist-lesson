import { ErrorType, setErrorAC, setStatusAC } from "../app/appReducer"
import { useAppDispatch, useAppSelector } from "../state/store"

export const ErrorInfo = () => {

	const dispatch = useAppDispatch()
	const error = useAppSelector<ErrorType>(state => state.app.error)

	const closeHandler = () => {
		dispatch(setErrorAC(null))
		dispatch(setStatusAC('succeeded'))
	}

	return (
		<div>
			<div
				style={{
					position: 'fixed',
					left: '50px',
					bottom: '50px',
					display: 'flex'
				}}>
				<span>{error}</span>
				<span onClick={closeHandler}>x</span>
			</div>
		</div>
	)
}