import React from 'react'
import type { FieldErrors, FieldValues } from 'react-hook-form/dist/types'

type Props = {
    inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    errors?:string;
    label:string;
} & React.HTMLAttributes<HTMLElement>

const InputComponent: React.FC<Props> = ({inputProps,errors,label}) => {
    return (
        <div className="mb-4">
            <label htmlFor={inputProps.id}>{label}</label>
            <input 
                {...inputProps}
            />
            {errors && (
                <div className="text-red-500">{errors.toString()}</div>
            )}
        </div>
    )
}

export default InputComponent