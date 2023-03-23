import { useAppSelector } from "../../state/hooks"
import { useNavigate } from "react-router-dom"
import { Box, useTheme, Button, Stepper, Step, StepLabel } from "@mui/material"
import { Formik } from "formik"
import { useState } from "react"
import * as yup from "yup"
import { shades } from "../../theme"
import Shipping from "./Shipping"
import Payment from "./Payment"

export interface Form {
	billingAddress: {
		firstName: string
		lastName: string
		country: string
		street1: string
		street2: string
		city: string
		state: string
		zipCode: string
	}
	shippingAddress: {
		isSameAddress?: boolean
		firstName: string
		lastName: string
		country: string
		street1: string
		street2: string
		city: string
		state: string
		zipCode: string
	}
	email: string
	phoneNumber: string
}

const initialValues: Form = {
	billingAddress: {
		firstName: "",
		lastName: "",
		country: "",
		street1: "",
		street2: "",
		city: "",
		state: "",
		zipCode: "",
	},
	shippingAddress: {
		isSameAddress: true,
		firstName: "",
		lastName: "",
		country: "",
		street1: "",
		street2: "",
		city: "",
		state: "",
		zipCode: "",
	},
	email: "",
	phoneNumber: "",
}

const checkoutSchema = [
	yup.object<Form>().shape({
		billingAddress: yup.object().shape({
			firstName: yup.string().required("required"),
			lastName: yup.string().required("required"),
			country: yup.string().required("required"),
			street1: yup.string().required("required"),
			street2: yup.string(),
			city: yup.string().required("required"),
			state: yup.string().required("required"),
			zipCode: yup.string().required("required"),
		}),
		shippingAddress: yup.object().shape({
			isSameAddress: yup.boolean().required("required"),
			firstName: yup
				.string()
				.when("isSameAddress", ([isSameAddress], schema) => {
					return isSameAddress
						? schema.notRequired()
						: schema.required("required")
				}),
			lastName: yup
				.string()
				.when("isSameAddress", ([isSameAddress], schema) => {
					return isSameAddress
						? schema.notRequired()
						: schema.required("required")
				}),
			country: yup.string().when("isSameAddress", ([isSameAddress], schema) => {
				return isSameAddress
					? schema.notRequired()
					: schema.required("required")
			}),
			street1: yup.string().when("isSameAddress", ([isSameAddress], schema) => {
				return isSameAddress
					? schema.notRequired()
					: schema.required("required")
			}),
			street2: yup.string(),
			city: yup.string().when("isSameAddress", ([isSameAddress], schema) => {
				return isSameAddress
					? schema.notRequired()
					: schema.required("required")
			}),
			state: yup.string().when("isSameAddress", ([isSameAddress], schema) => {
				return isSameAddress
					? schema.notRequired()
					: schema.required("required")
			}),
			zipCode: yup.string().when("isSameAddress", ([isSameAddress], schema) => {
				return isSameAddress
					? schema.notRequired()
					: schema.required("required")
			}),
		}),
	}),
	yup.object().shape({
		email: yup.string().required("required"),
		phoneNumber: yup.string().required("required"),
	}),
]

const Checkout = () => {
    const navigate = useNavigate()
	const theme = useTheme()
	const colors = shades(theme.palette.mode)
	const [activeStep, setActiveStep] = useState(0)
	const cart = useAppSelector((state) => state.productsSlice.cart)
	const isFirstStep = activeStep === 0
	const isSecondStep = activeStep === 1

	const handleFormSubmit = async (values: Form, actions: any) => {
		setActiveStep(activeStep + 1)

		// copies the billing in the shipping address
		if (isFirstStep && values.shippingAddress.isSameAddress) {
			actions.setFieldValue("shippingAddress", {
				...values.billingAddress,
				isSameAddress: true,
			})
		}

		if (isSecondStep) {
			makePayment()
		}

		actions.setTouched({})
	}

	const makePayment = () => {
		// stripe checkout logic

        console.log(cart)
        navigate("/Ecommerce/checkout/success")
	}

	return (
		<Box width="80%" m="100px auto">
			<Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
				<Step>
					<StepLabel>Billing</StepLabel>
				</Step>
				<Step>
					<StepLabel>Payment</StepLabel>
				</Step>
			</Stepper>
			<Box>
				<Formik
					onSubmit={handleFormSubmit}
					initialValues={initialValues}
					validationSchema={checkoutSchema[activeStep]}
				>
					{({
						values,
						errors,
						touched,
						handleBlur,
						handleChange,
						handleSubmit,
						setFieldValue,
					}) => (
						<form onSubmit={handleSubmit}>
							{isFirstStep && (
								<Shipping
									values={values}
									errors={errors}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
									setFieldValue={setFieldValue}
								/>
							)}
							{isSecondStep && (
								<Payment
									values={values}
									errors={errors}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
									setFieldValue={setFieldValue}
								/>
							)}
							<Box display="flex" justifyContent="space-between" gap="50px">
								{isSecondStep && (
									<Button
										fullWidth
										color="primary"
										variant="contained"
										sx={{
											backgroundColor: colors.primary[500],
											boxShadow: "none",
											color: "white",
											padding: "15px 40px",
										}}
										onClick={() => setActiveStep(activeStep - 1)}
									>
										Back
									</Button>
								)}
								<Button
									fullWidth
									type="submit"
									color="primary"
									variant="contained"
									sx={{
										backgroundColor:
											theme.palette.mode === "dark"
												? colors.secondary[900]
												: "black",
										boxShadow: "none",
										color: "white",
										padding: "15px 40px",
									}}
								>
									{isFirstStep ? "Next" : "Place Order"}
								</Button>
							</Box>
						</form>
					)}
				</Formik>
			</Box>
		</Box>
	)
}

export default Checkout
