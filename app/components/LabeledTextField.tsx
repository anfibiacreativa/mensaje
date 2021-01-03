import React, { PropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting },
      errors,
    } = useFormContext()
    const error = Array.isArray(errors[props.name])
      ? errors[props.name].join(", ")
      : errors[props.name]?.message || errors[props.name]

    return (
      <div {...outerProps}>
        <label>
          {label}
          <input disabled={isSubmitting} {...props} ref={register} />
        </label>

        {error && (
          <div role="alert" style={{ color: "red" }}>
            {error}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
