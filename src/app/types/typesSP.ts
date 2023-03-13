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

// Sellers
export type SellerT = {
    name: string;
    fullName: string;
    addres: string;
    nameEng: string;
    addresEng: string;
    inn: string;
};

export type SellersT = {
    [key: string]: SellerT;
};

// Consignee
export type ConsigneeT = {
    fullName: string;
    name: string;
    adress: string;
};

export type ConsigneesT = {
    [key: string]: ConsigneeT;
};
