export type TransportT = {
    name: string;
    nameEng: string;
    id: string;
};

export type VesselT = {
    name: string;
    nameEng: string;
    id: string;
};

export type ProductDescriptionT = {
    name: string;
    fullName: string;
    nameEng: string;
    standart: string;
    expirationDate: string;
    pack: string;
    packEng: string;
};

export type ProductionNewT = {
    [key: string]: ProductDescriptionT;
};
