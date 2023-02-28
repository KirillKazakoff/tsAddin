export type TransportT = {
    name: string;
    translation: string;
    id: string;
};

export type VesselT = {
    name: string;
    translation: string;
    id: string;
};

export type ProductDescriptionNewT = {
    fullName: string;
    nameEng: string;
    standart: string;
    expirationDate: string;
    pack: string;
    packEng: string;
};

export type ProductionNewT = {
    [key: string]: ProductDescriptionNewT;
};
