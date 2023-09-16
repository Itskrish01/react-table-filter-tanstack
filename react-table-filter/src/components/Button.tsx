import React from "react";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes {
    color?: "primary" | "secondary" | "default";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { color = "default", onClick, ...rest } = props;
    const className = "relative disabled:opacity-40 space-x-5 inline-flex items-center rounded-md px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"

    return (
        <button className={className} onClick={onClick} {...rest}>
            {props.children}
        </button>
    );
};
