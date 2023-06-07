import React from 'react';
import { useFormikContext } from 'formik';
import InputText from '../../components/Form/InputText';
import { TermsT } from '../../types/typesTables';
import { SelectCargo } from '../../components/Select/SelectCargo';
import SelectPersonDischarge from '../../components/Select/SelectPersonDischarge';

const TemplateCFR = () => (
    <>
        <SelectCargo title='Грузовые работы склад-авто' name='cargoToAuto' />
        <SelectCargo title='Грузовые работы борт-склад' name='cargoToStorage' />
    </>
);
const TemplateEXW = () => (
    <>
        <TemplateCFR />
        <InputText
            name='storageFrom'
            title='Хранение продавца с:'
            placeholder='Хранение с'
        />
        <InputText
            name='storageTo'
            title='Хранение продавца до:'
            placeholder='Хранение до'
        />
    </>
);
const TemplateFCA = () => <SelectPersonDischarge />;

export default function DischargeTerms() {
    const context = useFormikContext<{ termsPort: TermsT }>();
    const { termsPort } = context.values;

    let Output = null;
    if (termsPort === 'FCA') Output = TemplateFCA;
    if (termsPort === 'EXW') Output = TemplateEXW;
    if (termsPort.includes('CFR')) Output = TemplateCFR;
    if (!Output) return null;

    return (
        <div className='port-letter__discharge'>
            <Output />
        </div>
    );
}
