"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form"

import { field, labelText, input, errorText } from "./styles"

type FormInputProps = {
  name: string
  label: string
  type?: string
  autoComplete?: string
  rules?: RegisterOptions
  register: UseFormRegister<any>
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export function FormInput({
  name,
  label,
  type = "text",
  autoComplete,
  rules,
  register,
  error,
  ...rest
}: FormInputProps) {
  return (
    <div className={field}>
      <label>
        <span className={labelText}>{label}</span>
        <input
          type={type}
          autoComplete={autoComplete}
          className={input}
          {...register(name, rules)}
          {...rest}
        />
      </label>
      {error && <p className={errorText}>{error}</p>}
    </div>
  )
}
