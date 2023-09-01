import { useEffect } from 'react';
import pageStatusStore from '../../stores/pageStatusStore.ts/pageStatusStore';

export const useRevalidate = (formRef: any) => {
    const { isValidation } = pageStatusStore;

    useEffect(() => {
        if (!formRef?.current) return;
        formRef.current.validateForm(formRef.current.values);
    }, [isValidation, formRef]);
};
