import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

export interface ILoginForm {
    lable: string;
    name?: string;
    option?: RegisterOptions;
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

export const LoginForm: ILoginForm[] = [
    {
        lable: "Email",
        name: "email",
        option: {
            required: "Please enter your email",
            pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Plase enter valid email"
            }
        },
        inputProps: {
            type: "email",
            autoFocus: true
        },
    },
    {
        lable: "Password",
        option: {
            required: "Please enter password",
            minLength: { value: 6, message: "password is more than 5 chars" }
        },
        inputProps: {
            type: "password",
            autoFocus: true
        },
    }
]