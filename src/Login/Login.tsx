import { useFormik } from "formik"
import { Button } from "../components/Button"
import s from "./Login.module.css"

type FormikErrorType = {
	Email?: string
	Password?: string
}

export const Login = () => {

	const formik = useFormik({
		initialValues: {
			Email: '',
			Password: '',
			rememberMe: false,
		},
		validate: (values) => {
			
			const errors: FormikErrorType = {};
			if (!values.Email) {
				errors.Email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email)) {
				errors.Email = 'Invalid email address';
			}

			if (!values.Password) {
				errors.Password = 'Required';
			} else if (values.Password.length < 4) {
				errors.Password = 'От 4 символов';
			}
			
			return errors;
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2))
		}
	})

	const sendHandler = () => {

	}

	console.log(formik.errors)
	return (
		<div>
			<p>Чтобы войти в систему, пройдите регистрацию
				<a href={'https://social-network.samuraijs.com/'}
					target={'_blank'}> здесь
				</a>
			</p>
			<p>or use common test account credentials:</p>
			<p>Email: free@samuraijs.com</p>
			<p>Password: free</p>
			<form className={s.formBox} action="">
				<input
					type="text"
					name="Email"
					onChange={formik.handleChange}
					value={formik.values.Email}
				/>
				<input
					type="password"
					name="Password"
					onChange={formik.handleChange}
					value={formik.values.Password}
				/>
				<input
					type="checkbox"
					name="rememberMe"
					onChange={formik.handleChange}
					checked={formik.values.rememberMe}
				/>
				<Button className={''} key={'1'} name={'Send'} callBack={sendHandler} />
			</form>
		</div>

	)
}