import React from 'react';
import SelectFormik from './SelectFormik';

export default function SelectPersonDischarge() {
    const options = ['Афанасьева В.В.'];

    return (
        <SelectFormik
            name='personDischarge'
            title='Выставлять на'
            options={options}
        />
    );
}
