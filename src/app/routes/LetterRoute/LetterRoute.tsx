import { observer } from 'mobx-react-lite';
import React from 'react';
import { getHref } from '../../logic/letter/getHref';
import { useInitLetter } from '../../logic/letter/useInitLetter';
import { ExportFields } from './ExportFields';

import { MainFields } from './MainFields';

export const LetterRoute = observer(() => {
    const initLetter = useInitLetter();

    const onClick = async () => {
        await initLetter();
        const href = getHref();
        document.location.href = href;
    };

    return (
        <div className='letter'>
            <form className='form letter__form'>
                <div className='letter__fields-wrapper'>
                    <MainFields />
                    <ExportFields />
                </div>

                <button
                    type='button' onClick={onClick}
                    className='btn letter__btn'
                >
                    Создать письмо
                </button>
            </form>
        </div>
    );
});
