import React from 'react';
import Select from './Select';

export default function SelectPersonDischarge() {
    const options = ['Афанасьева В.В.'];

    return (
        <Select
            name='personDischarge' title='Выставлять на'
            options={options}
        />
    );
}
