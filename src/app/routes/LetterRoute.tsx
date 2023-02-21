import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useLetter } from '../letter/useLetter';
import letterStore from '../stores/letterStore';

export const LetterRoute = observer(() => {
    // useLetter();
    console.log(letterStore.letter);
    return <div>LetterRoute</div>;
});
