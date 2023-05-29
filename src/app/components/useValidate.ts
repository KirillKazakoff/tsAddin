import { useState } from 'react';

export type ValidationErrorT = 'required' | '';

export const useValidate = () => {
    const [error, setError] = useState<ValidationErrorT>('');

    const validate = (value: any) => {
        if (!value) {
            setError('required');
        }
    };

    return [error, validate];
};
