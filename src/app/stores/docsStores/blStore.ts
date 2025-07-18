import { makeAutoObservable } from 'mobx';
import { FormValuesT } from '../../types/typesUtils';

const initFields = () => ({
    catchZone: '',
    vatsAmount: '',
    isSortable: false,
});
type FormFieldsT = FormValuesT<ReturnType<typeof initFields>>;

class BlStore {
    name = 'blStore';
    fields = initFields();

    constructor() {
        makeAutoObservable(this);
    }

    setFields(values: FormFieldsT) {
        this.fields.catchZone = values.catchZone.toUpperCase();
        this.fields.isSortable = values.isSortable;
        this.fields.vatsAmount = values.vatsAmount;
    }
    // setSortable(value: boolean) {
    //     this.isSortable = value;
    // }

    // setCatchZone() {
    //     return (value: string) => {
    //         this.catchZone = value.toUpperCase();
    //     };
    // }

    // setVatsAmount() {
    //     return (value: string) => {
    //         this.vatsAmount = value;
    //     };
    // }
}

const blStore = new BlStore();
export default blStore;
