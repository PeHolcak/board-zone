"use client";

import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from "react-hook-form";
import { field, labelText, errorText, input } from "../styles";

type FormTextareaProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    placeholder?: string;
    rows?: number;
    register: UseFormRegister<T>;
    rules?: RegisterOptions<T, Path<T>>;
    error?: string;
};

export function FormTextarea<T extends FieldValues>({
    name,
    label,
    rows = 4,
    placeholder,
    register,
    rules,
    error,
}: FormTextareaProps<T>) {
    return (
        <div className={field}>
            <label className={labelText} htmlFor={name}>
                {label}
            </label>
            <textarea
                id={name}
                rows={rows}
                placeholder={placeholder}
                className={input}
                {...register(name, rules)}
            />
            {error && <p className={errorText}>{error}</p>}
        </div>
    );
}
