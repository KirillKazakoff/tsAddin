/* eslint-disable no-use-before-define */
export type DTReportT = {
    Signature: Signature;
};

type Signature = {
    SignedInfo: SignedInfo;
    SignatureValue: string;
    KeyInfo: KeyInfo;
    Object: ObjectT[];
};

type KeyInfo = {
    X509Data: X509Data;
    MCDId: string;
    INNPrincipal: number;
};

type X509Data = {
    X509Certificate: string;
};

type ObjectT = {
    ESADout_CU: ESADoutCU[];
};

type ESADoutCU = {
    DocumentID: string;
    EECEDocHeaderAddInfo: EECEDocHeaderAddInfo[];
    CustomsProcedure: string;
    CustomsModeCode: number;
    ElectronicDocumentSign: string;
    DeclarationKind: string;
    RecipientCountryCode: string;
    ESADout_CUGoodsShipment: ESADoutCUGoodsShipment[];
    FilledPerson: FilledPerson;
};

type EECEDocHeaderAddInfo = {
    EDocCode: string;
    EDocDateTime: Date[];
    LanguageCode: string;
    SourceCountryCode: string;
    DestinationCountryCode: string;
};

type ESADoutCUGoodsShipment = {
    OriginCountryName: string;
    OriginCountryCode: string;
    TotalGoodsNumber: number;
    TotalPackageNumber: number;
    TotalSheetNumber: number;
    TotalCustCost: number;
    CustCostCurrencyCode: string;
    ESADout_CUConsignor: ESADoutCUConsignor[];
    ESADout_CUConsignee: ESADoutCUConsignee[];
    ESADout_CUDeclarant: ESADoutCUDeclarant[];
    ESADout_CUGoodsLocation: ESADoutCUGoodsLocation[];
    ESADout_CUConsigment: ESADoutCUConsigment[];
    ESADout_CUMainContractTerms: ESADoutCUMainContractTerms[];
    ESADout_CUGoods: ESADoutCUGoods[];
    ESADout_CUPayments: ESADoutCUPayments[];
};

type ESADoutCUConsigment = {
    ContainerIndicator: number;
    DispatchCountryCode: string;
    DispatchCountryName: string;
    DestinationCountryCode: string;
    DestinationCountryName: string;
    ESADout_CUDepartureArrivalTransport: ESADoutCUDepartureArrivalTransport[];
    ESADout_CUBorderTransport: ESADoutCUBorderTransport[];
};

type ESADoutCUBorderTransport = {
    TransportModeCode: number;
    TransportNationalityCode: string;
    TransportMeansQuantity: number;
    RUTransportMeans: RUTransportMeans;
};

type RUTransportMeans = {
    TransportIdentifier: string;
    TransportMeansNationalityCode: string;
};

type ESADoutCUDepartureArrivalTransport = {
    TransportModeCode: number;
};

type ESADoutCUConsignee = {
    OrganizationName: string;
    SubjectAddressDetails: ESADoutCUConsigneeSubjectAddressDetails[];
};

type ESADoutCUConsigneeSubjectAddressDetails = {
    PostalCode: string;
    CountryCode: string;
    CounryName: string;
    Region: string;
    City: string;
    StreetHouse: string;
};

type ESADoutCUConsignor = {
    SubjectAddressDetails: ESADoutCUConsignorSubjectAddressDetails[];
    EqualIndicator: number;
};

type ESADoutCUConsignorSubjectAddressDetails = {
    CountryCode: string;
    CounryName: string;
};

type ESADoutCUDeclarant = {
    OrganizationName: string;
    RFOrganizationFeatures: { [key: string]: number };
    SubjectAddressDetails: ESADoutCUDeclarantSubjectAddressDetails[];
};

type ESADoutCUDeclarantSubjectAddressDetails = {
    PostalCode: number;
    CountryCode: string;
    CounryName: string;
    Region: string;
    City: string;
    StreetHouse: string;
};

type ESADoutCUGoods = {
    GoodsNumeric: number;
    GoodsDescription: string;
    GrossWeightQuantity: number;
    NetWeightQuantity: number;
    InvoicedCost: number;
    CustomsCost: number;
    GoodsTNVEDCode: number;
    BeginPeriodDate: Date[];
    EndPeriodDate: Date[];
    OriginCountryCode: string;
    CustomsCostCorrectMethod: number;
    DeliveryTime: Date[];
    DeliveryTimeEND: Date[];
    AdditionalSheetCount: number;
    GoodsGroupDescription: GoodsGroupDescription[];
    Preferencii: Preferencii[];
    LanguageGoods: string;
    ESADout_CUPresentedDocument: ESADoutCUPresentedDocument[];
    ESADout_CUCustomsPaymentCalculation: ESADoutCUCustomsPaymentCalculation[];
    ESADGoodsPackaging: ESADGoodsPackaging[];
    ESADCustomsProcedure: ESADCustomsProcedure[];
};

type ESADCustomsProcedure = {
    MainCustomsModeCode: number;
    PrecedingCustomsModeCode: number;
    GoodsTransferFeature: number;
};

type ESADGoodsPackaging = {
    PakageQuantity: number;
    PakageTypeCode: number;
    PackagePalleteInformation: PackagePalleteInformation[];
};

type PackagePalleteInformation = {
    InfoKindCode: number;
    PalleteCode: string;
    PalleteQuantity: number;
};

type ESADoutCUCustomsPaymentCalculation = {
    PaymentModeCode: number;
    PaymentAmount: number;
    PaymentCurrencyCode: number;
    Rate: number;
    RateTypeCode: string;
    RateCurrencyCode?: number;
    RateUseDate: Date[];
    PaymentCode: string;
    TaxBase?: number;
    TaxBaseCurrencyCode?: number;
};

type ESADoutCUPresentedDocument = {
    PrDocumentName: string;
    PrDocumentNumber: number | string;
    PrDocumentDate?: Date;
    PresentedDocumentModeCode: number;
    DocumentBeginActionsDate?: Date;
    DocumentEndActionsDate?: Date;
    RecordID: string;
    RFG44PresentedDocId?: DocArchIDDetails;
    DocumentPresentingDetails: DocumentPresentingDetails;
};

type DocumentPresentingDetails = {
    DocPresentKindCode: number;
    PresentedDocumentModeCode: number;
    CustomsDocIdDetails?: CustomsDocIDDetails;
};

type CustomsDocIDDetails = {
    CustomsCode: number;
    RegistrationDate: Date;
    GTDNumber: number;
};

type DocArchIDDetails = {
    ElectronicDocumentID: string;
    ElectronicArchID: string;
    DocumentModeID: string;
};

type GoodsGroupDescription = {
    GoodsDescription: string;
    GoodsGroupInformation: GoodsGroupInformation;
    GroupNum: number;
};

type GoodsGroupInformation = {
    Manufacturer: string;
    ManufacturerINN: number;
    ManufacturerOKATO: number;
    TradeMark: string;
};

type Preferencii = {
    CustomsTax: string;
    CustomsDuty: string;
    Excise: string;
    Rate: string;
};

type ESADoutCUGoodsLocation = {
    CustomsOffice: number;
    CustomsCountryCode: string;
};

type ESADoutCUMainContractTerms = {
    ContractCurrencyCode: string;
    ContractCurrencyRate: number;
    TotalInvoiceAmount: number;
    TradeCountryCode: string;
    DealFeatureCode: number;
    DealNatureCode: number;
    CUESADDeliveryTerms: CUESADDeliveryTerms;
};

type CUESADDeliveryTerms = {
    DeliveryPlace: string;
    DeliveryTermsStringCode: string;
};

type ESADoutCUPayments = {
    ESADout_CUCustomsPayment: ESADoutCUCustomsPayment[];
};

type ESADoutCUCustomsPayment = {
    PaymentModeCode: number;
    PaymentAmount: number;
    PaymentCurrencyCode: number;
    CurrencyRate: number;
    RFOrganizationFeatures: RFOrganizationFeatures;
};

type RFOrganizationFeatures = {
    INN: number;
};

type FilledPerson = {
    SigningDetails: SigningDetails;
    SignatoryPersonIdentityDetails: SignatoryPersonIdentityDetails;
    PowerOfAttorneyDetails: PowerOfAttorneyDetails;
};

type PowerOfAttorneyDetails = {
    PrDocumentName: string;
    PrDocumentNumber: number;
    PrDocumentDate: Date;
    DocStartDate: Date;
    DocValidityDate: Date;
    DocKindCode: number;
    DocArchIdDetails: DocArchIDDetails;
};

type SignatoryPersonIdentityDetails = {
    IdentityCardCode: string;
    IdentityCardName: string;
    IdentityCardSeries: string;
    IdentityCardNumber: number;
    IdentityCardDate: Date;
    OrganizationName: string;
    DocArchIdDetails: DocArchIDDetails;
};

type SigningDetails = {
    PersonSurname: string;
    PersonName: string;
    PersonMiddleName: string;
    PersonPost: string;
    CommunicationDetails: CommunicationDetails;
    SigningDate: Date;
};

type CommunicationDetails = {
    Phone: number;
};

type SignedInfo = {
    CanonicalizationMethod: string;
    SignatureMethod: string;
    Reference: Reference[];
};

type Reference = {
    Transforms: Transforms;
    DigestMethod: string;
    DigestValue: string;
};

type Transforms = {
    Transform: string;
};
