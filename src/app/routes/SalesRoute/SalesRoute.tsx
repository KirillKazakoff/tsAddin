import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitSalesSection } from './useInitSalesSection';

export const SalesRoute = observer(() => {
    const { formik, initObj } = useInitSalesSection();

    return (
        <div className='form-section'>
            <div className='form-section__choose'>
                <h2 className='mb0'>Выберите контракт:</h2>
            </div>
        </div>
    );
});
