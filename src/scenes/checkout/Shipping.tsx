import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import AddressForm from "./AddressForm"
import { FocusEvent, ChangeEvent } from "react"
import { Form } from "./Checkout"

export interface IShippingProps {
	values: Form
	errors: {}
	touched: {}
	handleBlur: (e: FocusEvent<any, Element>) => void
	handleChange: (e: ChangeEvent<any>) => void
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void
}

const Shipping = (props: IShippingProps) => {
	return (
		<Box m="30px auto">
			<Box>
				<Typography sx={{ mb: "15px" }} fontSize="18px">
					Billing Information
				</Typography>
				<AddressForm
					type="billingAddress"
					values={props.values.billingAddress}
					errors={props.errors}
					touched={props.touched}
					handleBlur={props.handleBlur}
					handleChange={props.handleChange}
					setFieldValue={props.setFieldValue}
				/>
			</Box>

			<Box mb="20px">
				<FormControlLabel
					label="Same for Shipping Address"
					control={
						<Checkbox
							defaultChecked
							value={props.values.shippingAddress.isSameAddress}
							onChange={() =>
								props.setFieldValue(
									"shippingAddress.isSameAddress",
									!props.values.shippingAddress.isSameAddress
								)
							}
						/>
					}
				/>
			</Box>

			{/* SHIPPING FORM */}
			{!props.values.shippingAddress.isSameAddress && (
				<Box>
					<Typography sx={{ mb: "15px" }} fontSize="18px">
						Shipping Information
					</Typography>
					<AddressForm
						type="shippingAddress"
						values={props.values.shippingAddress}
						errors={props.errors}
						touched={props.touched}
						handleBlur={props.handleBlur}
						handleChange={props.handleChange}
						setFieldValue={props.setFieldValue}
					/>
				</Box>
			)}
		</Box>
	)
}

export default Shipping
