type ValidationMsg = {
    valueMissing?: string;
    formatMismatch?: string;
};
type MessagesT = { [key: string]: ValidationMsg };

export const messages: MessagesT = {
    dischargeDate: {
        valueMissing: 'Введите дату прибытия в порт',
    },
    podpisant: {
        valueMissing: 'Выберите подписанта',
    },
    dt: {
        valueMissing: 'Выберите тип ДТ',
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
    reiceNo: {
        valueMissing: 'Введите номер рейса',
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
    departureDate: {
        valueMissing: 'Введите дату отбытия Владивосток',
        formatMismatch: 'Неправильный формат даты (2 цифры. 2 цифры. 4 цифры)',
    },
    translator: {
        valueMissing: 'Выберите инициалы переводчика-исполнителя',
    },
    catchZone: {
        valueMissing: 'Выберите подзону вылова',
    },
    vatsAmount: {
        valueMissing: 'Введите кол-во чанов',
    },
};
