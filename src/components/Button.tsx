type PropsType = {
	name: string
	className: string
	callBack: () => void
}

export const Button = (props: PropsType) => {
	const onClickHandler = () => {
		props.callBack()
	}
	return (
		<button className={props.className} onClick={onClickHandler}>{props.name}</button>
	)
}