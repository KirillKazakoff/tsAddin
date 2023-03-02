import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { ExportFields } from './ExportFields';
import { getHref } from '../../letter/getHref';
import { useInitLetter } from '../../letter/init/useInitLetter';
import { MainFields } from './MainFields';

export const LetterRoute = observer(() => {
    const initLetter = useInitLetter();

    useEffect(() => {
        const str = '2134532';
        console.log(str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        const func = async () => {
            await initLetter();
        };
        func();
    });

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
