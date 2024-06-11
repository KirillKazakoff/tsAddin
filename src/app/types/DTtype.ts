/* eslint-disable no-use-before-define */

export type DTReportT = {
    ED_Container: EDContainer;
};

export type EDContainer = {
    DocumentID: string;
    ContainerDoc: ContainerDoc;
};

export type ContainerDoc = {
    DocBody: DocBody;
};

export type DocBody = {
    ESADout_CU: ESADoutCU;
};

export type ESADoutCU = {
    DocumentID: string;
    EECEDocHeaderAddInfo: EECEDocHeaderAddInfo;
    CustomsProcedure: string;
    CustomsModeCode: string;
    ElectronicDocumentSign: string;
    DeclarationKind: string;
    RecipientCountryCode: string;
    ESADout_CUGoodsShipment: ESADoutCUGoodsShipment;
    FilledPerson: FilledPerson;
};

export type EECEDocHeaderAddInfo = {
    EDocCode: string;
    EDocDateTime: Date;
    LanguageCode: string;
    SourceCountryCode: string;
    DestinationCountryCode: string;
};

export type ESADoutCUGoodsShipment = {
    OriginCountryName: string;
    OriginCountryCode: string;
    TotalGoodsNumber: string;
    TotalPackageNumber: string;
    TotalSheetNumber: string;
    TotalCustCost: string;
    CustCostCurrencyCode: string;
    ESADout_CUConsignor: ESADoutCUConsignor;
    ESADout_CUConsignee: ESADoutCUConsignee;
    ESADout_CUDeclarant: ESADoutCUDeclarant;
    ESADout_CUGoodsLocation: ESADoutCUGoodsLocation;
    ESADout_CUConsigment: ESADoutCUConsigment;
    ESADout_CUMainContractTerms: ESADoutCUMainContractTerms;
    ESADout_CUGoods: ESADoutCUGoodsT[];
    ESADout_CUPayments: ESADoutCUPayments;
};

export type ESADoutCUConsigment = {
    ContainerIndicator: string;
    DispatchCountryCode: string;
    DispatchCountryName: string;
    DestinationCountryCode: string;
    DestinationCountryName: string;
    ESADout_CUDepartureArrivalTransport: ESADoutCUDepartureArrivalTransport;
    ESADout_CUBorderTransport: ESADoutCUBorderTransport;
};

export type ESADoutCUBorderTransport = {
    TransportModeCode: string;
    TransportNationalityCode: string;
    TransportMeansQuantity: string;
    RUTransportMeans: RUTransportMeans;
};

export type RUTransportMeans = {
    TransportIdentifier: string;
    TransportMeansNationalityCode: string;
};

export type ESADoutCUDepartureArrivalTransport = {
    TransportModeCode: string;
};

export type ESADoutCUConsignee = {
    OrganizationName: string;
    SubjectAddressDetails: ESADoutCUConsigneeSubjectAddressDetails;
};

export type ESADoutCUConsigneeSubjectAddressDetails = {
    CountryCode: string;
    CounryName: string;
    City: string;
    StreetHouse: string;
};

export type ESADoutCUConsignor = {
    SubjectAddressDetails: ESADoutCUConsignorSubjectAddressDetails;
    EqualIndicator: string;
};

export type ESADoutCUConsignorSubjectAddressDetails = {
    CountryCode: string;
    CounryName: string;
};

export type ESADoutCUDeclarant = {
    OrganizationName: string;
    RFOrganizationFeatures: { [key: string]: string };
    SubjectAddressDetails: ESADoutCUDeclarantSubjectAddressDetails;
};

export type ESADoutCUDeclarantSubjectAddressDetails = {
    PostalCode: string;
    CountryCode: string;
    CounryName: string;
    Region: string;
    City: string;
    StreetHouse: string;
};

export type ESADoutCUGoodsT = {
    GoodsNumeric: string;
    GoodsDescription: string;
    GrossWeightQuantity: string;
    NetWeightQuantity: string;
    CustomsCost: string;
    GoodsTNVEDCode: string;
    BeginPeriodDate: Date;
    EndPeriodDate: Date;
    OriginCountryCode: string;
    CustomsCostCorrectMethod: string;
    DeliveryTime: Date;
    DeliveryTimeEND: Date;
    ESADout_CUPrecedingDocument?: {
        PrecedingDocumentCustomsCode: string;
        PrecedingDocumentDate: string;
        PrecedingDocumentGoodsNumeric: string;
        PrecedingDocumentModeCode: string;
        PrecedingDocumentName: string;
        PrecedingDocumentNumber: string;
    };
    AdditionalSheetCount: string;
    GoodsGroupDescription: GoodsGroupDescription;
    Preferencii: Preferencii;
    LanguageGoods: string;
    ESADout_CUPresentedDocument: EADocumentT[];
    ESADout_CUCustomsPaymentCalculation: ESADoutCUCustomsPaymentCalculation[];
    ESADGoodsPackaging: ESADGoodsPackaging;
    ESADCustomsProcedure: ESADCustomsProcedure;
};

export type ESADCustomsProcedure = {
    MainCustomsModeCode: string;
    PrecedingCustomsModeCode: string;
    GoodsTransferFeature: string;
};

export type ESADGoodsPackaging = {
    PakageQuantity: string;
    PakageTypeCode: string;
    PackagePalleteInformation: PackagePalleteInformation;
};

export type PackagePalleteInformation = {
    InfoKindCode: string;
    PalleteCode: string;
    PalleteQuantity: string;
};

export type ESADoutCUCustomsPaymentCalculation = {
    PaymentModeCode: string;
    PaymentAmount: string;
    PaymentCurrencyCode: string;
    Rate: string;
    RateTypeCode: string;
    RateCurrencyCode?: string;
    RateUseDate: Date;
    PaymentCode: string;
    TaxBase?: string;
    TaxBaseCurrencyCode?: string;
};

export type EADocumentT = {
    PrDocumentName: string;
    PrDocumentNumber: string | string;
    PresentedDocumentModeCode: string;
    RecordID: string;
    RFG44PresentedDocId?: DocArchIDDetails;
    DocumentPresentingDetails: DocumentPresentingDetails;
    PrDocumentDate?: Date;
};

export type DocumentPresentingDetails = {
    DocPresentKindCode: string;
    PresentedDocumentModeCode: string;
    CustomsDocIdDetails?: CustomsDocIDDetails;
};

export type CustomsDocIDDetails = {
    CustomsCode: string;
    RegistrationDate: Date;
    GTDNumber: string;
};

export type DocArchIDDetails = {
    ElectronicDocumentID: string;
    ElectronicArchID: string;
    DocumentModeID: string;
};

export type GoodsGroupDescription = {
    GoodsDescription: string;
    GoodsGroupInformation: GoodsGroupInformation;
    GroupNum: string;
};

export type GoodsGroupInformation = {
    Manufacturer: string;
    ManufacturerINN: string;
    ManufacturerOKATO: string;
    TradeMark: string;
};

export type Preferencii = {
    CustomsTax: string;
    CustomsDuty: string;
    Excise: string;
    Rate: string;
};

export type ESADoutCUGoodsLocation = {
    InformationTypeCode: string;
    CustomsOffice: string;
    CustomsCountryCode: string;
};

export type ESADoutCUMainContractTerms = {
    ContractCurrencyCode: string;
    ContractCurrencyRate: string;
    TotalInvoiceAmount: string;
    TradeCountryCode: string;
    DealFeatureCode: string;
    DealNatureCode: string;
    CUESADDeliveryTerms: CUESADDeliveryTerms;
};

export type CUESADDeliveryTerms = {
    DeliveryPlace: string;
    DeliveryTermsStringCode: string;
};

export type ESADoutCUPayments = {
    ESADout_CUCustomsPayment: ESADoutCUCustomsPayment[];
};

export type ESADoutCUCustomsPayment = {
    PaymentModeCode: string;
    PaymentAmount: string;
    PaymentCurrencyCode: string;
    CurrencyRate: string;
    RFOrganizationFeatures: RFOrganizationFeatures;
};

export type RFOrganizationFeatures = {
    INN: string;
};

export type FilledPerson = {
    SigningDetails: SigningDetails;
    SignatoryPersonIdentityDetails: SignatoryPersonIdentityDetails;
    PowerOfAttorneyDetails: PowerOfAttorneyDetails;
};

export type PowerOfAttorneyDetails = {
    PrDocumentName: string;
    PrDocumentNumber: string;
    PrDocumentDate: Date;
    DocStartDate: Date;
    DocValidityDate: Date;
    DocKindCode: string;
    DocArchIdDetails: DocArchIDDetails;
};

export type SignatoryPersonIdentityDetails = {
    IdentityCardCode: string;
    IdentityCardName: string;
    IdentityCardSeries: string;
    IdentityCardNumber: string;
    IdentityCardDate: Date;
    OrganizationName: string;
    DocArchIdDetails: DocArchIDDetails;
};

export type SigningDetails = {
    PersonSurname: string;
    PersonName: string;
    PersonMiddleName: string;
    PersonPost: string;
    CommunicationDetails: CommunicationDetails;
    SigningDate: Date;
};

export type CommunicationDetails = {
    Phone: string;
};
