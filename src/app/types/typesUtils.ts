import { FormikHelpers } from 'formik';

export type InputEventT = React.SyntheticEvent<HTMLInputElement>;

// RequestType
export type RequestObjT = {
    url?: string;
    settings?: RequestInit;
};

export type OnSubmitT<T> = (values: T, actions: FormikHelpers<T>) => Promise<void>;
