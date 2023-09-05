import { FormikHelpers } from 'formik';

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

// type KeysTables = Array<keyof TablesStore>;
// type KeysObj = {[P in keyof typeof keysArray]: true}
// const propArr = Object.keys(tablesStore) as KeysTables;
// propArr

// const keysArray = ['mates', 'gates'] as const;
// type K1 = typeof keysArray[number]
