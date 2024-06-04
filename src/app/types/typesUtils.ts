import { FormikHelpers } from 'formik';

declare module 'react' {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        // extends React's HTMLAttributes
        directory?: string;
        webkitdirectory?: string;
    }
}

export type InputEventT = React.SyntheticEvent<HTMLInputElement>;

// RequestType
export type RequestObjT = {
    url?: string;
    settings?: RequestInit;
};

export type OnSubmitT<T> = (values: T, actions?: FormikHelpers<T>) => Promise<void>;

export type FormValuesT<T> = {
    [P in keyof T]: T[P] extends boolean ? boolean : string;
};

export type Dictionary<T> = { [key: string]: T };

export type Paths<T> = T extends Array<infer U>
    ? `${Paths<U>}`
    : T extends object
        ? {
            [K in keyof T & (string | number)]: K extends string
                ? `${K}` | `${Paths<T[K]>}`
                : never;
        }[keyof T & (string | number)]
        : never;

export type CellDeclarationT<CellT> = {
    common: CellT[];
    [key: string]: CellT[] | CellDeclarationT<CellT>;
};
