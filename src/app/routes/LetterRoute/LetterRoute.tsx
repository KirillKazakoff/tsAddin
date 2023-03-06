import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExportFields } from './ExportFields';
import { getHref } from '../../letter/getHref';
import { useInitLetter } from '../../letter/init/useInitLetter';
import { MainFields } from './MainFields';
import pageStatusStore from '../../stores/pageStatusStore';

export const LetterRoute = observer(() => {
    const initLetter = useInitLetter();
    const { isLetterError } = pageStatusStore;
    const navigate = useNavigate();

    useEffect(() => {
        if (isLetterError) {
            navigate('/errorLetter');
            return;
        }
        const func = async () => {
            await initLetter();
            getHref();
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
