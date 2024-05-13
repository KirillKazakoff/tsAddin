import React from 'react';
import { observer } from 'mobx-react-lite';
import FileInput from '../../components/FileInput';

export const DTRoute = observer(() => {
    return (
        <div>
            <h1>DT Route</h1>
            <FileInput onChange={(e) => console.log(e.target.files)} />
        </div>
    );
});
