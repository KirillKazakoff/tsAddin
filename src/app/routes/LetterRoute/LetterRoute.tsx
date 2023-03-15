import { observer } from 'mobx-react-lite';
import React from 'react';
import { useInitLetter } from '../../logic/letter/useInitLetter';
import { ExportFields } from './ExportFields';

import { MainFields } from './MainFields';

export const LetterRoute = observer(() => {
    const onLetterSubmit = useInitLetter();

    return (
        <div className='letter'>
            <form className='form letter__form'>
                <div className='letter__fields-wrapper'>
                    <MainFields />
                    <ExportFields />
                </div>

                <button
                    type='button'
                    onClick={onLetterSubmit}
                    className='btn letter__btn'
                >
                    Создать письмо
                </button>
            </form>
        </div>
    );
});
