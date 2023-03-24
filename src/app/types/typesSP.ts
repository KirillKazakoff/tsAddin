export type TransportT = {
    name: string;
    nameEng: string;
    id: string;
};

// Vessels
export type VesselT = {
    name: string;
    nameEng: string;
    id: string;
};

export type VesselsT = {
    [key: string]: VesselT;
};

// Production
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

// PortZarubezh
export type PortZarubezhT = {
    name: string;
    nameEng: string;
    country: string;
    countryEng: string;
};

export type PortsZarubezhT = {
    [key: string]: PortZarubezhT;
};

// PortTamozhnyaT
export type PortTamozhnyaT = {
    name: string;
    nameEng: string;
    fullName: string;
};

export type PortsTamozhnyaT = {
    [key: string]: PortTamozhnyaT;
};

// ContractsT
export type ContractT = {
    contractNo: string;
    date: string;
    code: string;
    seller: string;
    buyerFull: string;
    buyer: string;
    bankSeller: string;
    timeEnd: string;
    status: string;
};

export type ContractsT = {
    [key: string]: ContractT;
};
