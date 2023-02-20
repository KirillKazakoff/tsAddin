import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import { getBody } from './letter/getBody';
import { getFooter } from './letter/getFooter';
import { getHeaderLetter } from './letter/getHeader';
import { getHref } from './letter/getHref';
import { getSubject } from './letter/getSubject';

export default function App() {
    const [href, setHref] = useState('');
    const [dateArrival, setDateArrival] = useState('');
    const [port, setPort] = useState('');
    const [datePayment, setDatePayment] = useState('');

    const getLetter = async () => {
        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem('Коносаменты');
            const table = sheet.tables.getItem('Коносаменты');
            const range = table.getRange();

            table.load(['values', 'items', 'columns']);
            range.load('values');

            const vessels = table.columns.getItem('Судно');
            const transport = table.columns.getItem('Транспорт');
            vessels.load('values');
            transport.load('values');

            await context.sync();
            const subjectLetter = getSubject(range.values, transport.values);
            const headerLetter = getHeaderLetter(vessels.values, transport.values);
            const bodyLetter = getBody(range.values, vessels.values);
            const footerLetter = getFooter(dateArrival, datePayment, port);

            setHref(getHref(subjectLetter, headerLetter, bodyLetter, footerLetter));
        });
    };

    useEffect(() => {
        getLetter();
    });

    return (
        <div>
            <form className='form form-letter'>
                <Input
                    placeholder='Дата прибытия'
                    setter={setDateArrival}
                    value={dateArrival}
                />
                <Input
                    placeholder='Порт' setter={setPort}
                    value={port}
                />
                <Input
                    placeholder='Дата оплаты'
                    setter={setDatePayment}
                    value={datePayment}
                />

                <button type='submit' className='btn'>
                    <a href={href}>Создать письмо</a>
                </button>
            </form>
        </div>
    );
}
