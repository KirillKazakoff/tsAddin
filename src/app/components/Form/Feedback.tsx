import { ErrorMessage } from 'formik';
import React from 'react';

type FeedbackProps = {
    name: string;
    cls?: string;
};

export default function Feedback(props: FeedbackProps) {
    const { name, cls } = props;

    return (
        <ErrorMessage
            name={name}
            render={(msg) => (
                <div className={`feedback feedback-${cls}`}>
                    <div className={`feedback-arrow feedback-arrow-${cls}`} />
                    <span className='feedback-content'>{msg}</span>
                </div>
            )}
        />
    );
}

Feedback.defaultProps = {
    cls: 'default',
};
