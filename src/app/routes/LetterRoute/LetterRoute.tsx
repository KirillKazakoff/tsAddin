import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { ExportFields } from './ExportFields';
import { getHref } from '../../letter/getHref';
import { useInitLetter } from '../../letter/init/useInitLetter';
import { MainFields } from './MainFields';

export const LetterRoute = observer(() => {
    const initLetter = useInitLetter();

    useEffect(() => {
        const func = async () => {
            await initLetter();
            const href = getHref();
            console.log(href);
        };
        func();
    });

    const onClick = async () => {
        await initLetter();
        const href = getHref();
        console.log(href);
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
                {/* <a href={testHref}>TEST</a> */}
            </form>
        </div>
    );
});
