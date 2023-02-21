import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import { getTransport } from './getTransport';
import { getUniqueVessels } from './getUniqueVessels';
import { getBody } from './letter/getBody';
import { getFooter } from './letter/getFooter';
import { getHeaderLetter } from './letter/getHeader';
import { getHref } from './letter/getHref';
import { getSubject } from './letter/getSubject';
import { transformTable } from './transformTable';

export default function App() {
    const [href, setHref] = useState('');
    const [dateArrival, setDateArrival] = useState('');
    const [port, setPort] = useState('');
    const [datePayment, setDatePayment] = useState('');

    const getLetter = async () => {
        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem('Коносаменты');
            const tableSrc = sheet.tables.getItem('Коносаменты');
            const range = tableSrc.getRange();

            tableSrc.load(['values', 'items', 'columns']);
            range.load('values');

            const transportSrc = tableSrc.columns.getItem('Транспорт');
            transportSrc.load('values');

            await context.sync();

            const table = transformTable(range.values);
            const vessels = getUniqueVessels(table);
            const transport = getTransport(transportSrc.values);

            const subjectLetter = getSubject(table, transport);
            const headerLetter = getHeaderLetter(vessels, transport);
            const bodyLetter = getBody(table, vessels);
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
