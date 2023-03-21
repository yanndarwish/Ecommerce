import { Box, Typography, TextField } from "@mui/material"
import { FormikErrors, FormikTouched } from "formik"
import { Form } from "./Checkout"
import { FocusEvent, ChangeEvent } from "react"

export interface IPaymentProps {
	values: Form
	errors: FormikErrors<Form>
	touched: FormikTouched<Form>
	handleBlur: (e: FocusEvent<any, Element>) => void
	handleChange: (e: ChangeEvent<any>) => void
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void
}

const Payment = (props: IPaymentProps) => {
	return (
		<Box m="30px 0">
			{/* CONTACT INFO */}
			<Box>
				<Typography sx={{ mb: "15px" }} fontSize="18px">
					Contact Info
				</Typography>
				<TextField
					fullWidth
					type="text"
					label="Email"
					onBlur={props.handleBlur}
					onChange={props.handleChange}
					value={props.values.email}
					name="email"
					error={!!props.touched.email && !!props.errors.email}
					helperText={props.touched.email && props.errors.email}
					sx={{ gridColumn: "span 4", mb: "15px" }}
				/>
				<TextField
					fullWidth
					type="text"
					label="Phone Number"
					onBlur={props.handleBlur}
					onChange={props.handleChange}
					value={props.values.phoneNumber}
					name="phoneNumber"
					error={!!props.touched.phoneNumber && !!props.errors.phoneNumber}
					helperText={props.touched.phoneNumber && props.errors.phoneNumber}
					sx={{ gridColumn: "span 4", mb: "15px" }}
				/>
			</Box>
		</Box>
	)
}

export default Payment
