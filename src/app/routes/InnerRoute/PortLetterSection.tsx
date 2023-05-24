import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInitPortLetter } from '../../logic/docs/innerContract/useInitPortLetter';
import { SelectPortRu } from '../../components/Select/SelectPortRu';
import { SelectPodpisant } from '../../components/Select/SelectPodpisant';
import Input from '../../components/Input';
import CheckBox from '../../components/CheckBox';
import { SelectCargo } from '../../components/Select/SelectCargo';
import { Doc } from '../../components/Doc';
import DocsDownloadBtn from '../../components/DocsDownloadBtn';

export const PortLetterSection = observer(() => {
    const initObj = useInitPortLetter();
    if (!initObj) return null;
    const {
        contracts, onLoad, onLoadAll, setField, store, toggle,
    } = initObj;

    const letterList = contracts.map((contract) => {
        const { buyer, contractNo } = contract.record;
        const onClick = () => onLoad(contract);

        return (
            <Doc
                onClick={onClick}
                title={`${buyer.codeName}`}
                key={contractNo}
                cls='port-letter'
            />
        );
    });

    return (
        <form className='docs__form port-letter-form'>
            <h2 className='title port-letter-title'>Письма в порт</h2>
            <h3>Письмо:</h3>
            <div className='fields-wrapper'>
                <SelectPortRu current={store.port.codeName} setter={setField.port} />
                <SelectPodpisant
                    current={store.podpisant.codeName}
                    setter={setField.podpisant}
                />
                <CheckBox
                    checked={store.isPicturesActive}
                    setter={toggle.pictures}
                    title={'Включить картинки:'}
                />
                <Input
                    title='Дата письма:'
                    placeholder='Дата письма'
                    setter={setField.dateLetter}
                    value={store.dateLetter}
                />
                <SelectCargo
                    current={store.cargoTo.auto}
                    title='Грузовые работы склад-авто'
                    setter={setField.cargoTo.auto}
                />
                <SelectCargo
                    current={store.cargoTo.storage}
                    title='Грузовые работы борт-склад'
                    setter={setField.cargoTo.storage}
                />
                <CheckBox
                    checked={store.isCFR}
                    title={'Передача с борта'}
                    setter={toggle.CFR}
                />
                {!store.isCFR ? (
                    <>
                        <Input
                            title='Хранение продавца с:'
                            placeholder='Хранение с'
                            setter={setField.storage.from}
                            value={store.storage.from}
                        />
                        <Input
                            title='Хранение продавца до:'
                            placeholder='Хранение до'
                            setter={setField.storage.to}
                            value={store.storage.to}
                        />
                    </>
                ) : null}
            </div>

            <h3 className='title port-letter-title'>Загрузить письма в порт</h3>
            <ul className='docs port-letter-docs'>{letterList}</ul>
            <DocsDownloadBtn title='Загрузить все письма' onClick={onLoadAll} />
        </form>
    );
});
