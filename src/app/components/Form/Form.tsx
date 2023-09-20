import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Form as FormikForm, useFormikContext } from 'formik';

type Props = {
    children: React.ReactElement[] | React.ReactElement;
    className: string;
};

export const Form = observer(({ children, className }: Props) => {
    const { isValid } = useFormikContext();
    const ref = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const prevRef = ref.current;
        const submitHandler = (e: SubmitEvent) => {
            e.preventDefault();
            if (!isValid) {
                ref.current.classList.add('invalid-highlight');
                setTimeout(() => {
                    ref.current.classList.remove('invalid-highlight');
                }, 1000);
            }
        };

        ref.current.addEventListener('submit', submitHandler);
        return () => prevRef.removeEventListener('submit', submitHandler);
    }, [isValid]);

    return (
        <FormikForm ref={ref} className={className}>
            {children}
        </FormikForm>
    );
});
