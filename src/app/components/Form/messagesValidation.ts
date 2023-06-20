type ValidationMsg = {
    valueMissing?: string;
};
type MessagesT = { [key: string]: ValidationMsg };

export const messages: MessagesT = {
    dischargeDate: {
        valueMissing: 'Введите дату прибытия в порт',
    },
    podpisant: {
        valueMissing: 'Выберите подписанта',
    },
    terms: {
        valueMissing: 'Выберите условия доставки',
    },
    termsPort: {
        valueMissing: 'Выберите условия доставки',
    },
    portTamozhnya: {
        valueMissing: 'Выберите город-порт',
    },
    portRu: {
        valueMissing: 'Выберите конкретный порт',
    },
    dateLetter: {
        valueMissing: 'Введите дату письма',
    },
    storageFrom: {
        valueMissing: 'Введите дату хранения продавца с',
    },
    storageTo: {
        valueMissing: 'Введите дату хранения продавца до',
    },
    arrivalVld: {
        valueMissing: 'Введите дату прибытия во Владивосток',
    },
    payment: {
        valueMissing: 'Введите дату оплаты',
    },
    arrivalForeign: {
        valueMissing: 'Введите дату прибытия в зарубежный порт',
    },
    ground: {
        valueMissing: 'Введите фишинг-землю',
    },
    port: {
        valueMissing: 'Выберите порт',
    },
    personDischarge: {
        valueMissing: 'Выберите ответственного за диспетчеризацию',
    },
    declaration: {
        valueMissing: 'Введите номер ВТД декларации',
    },
};
