/* eslint-disable no-use-before-define */

export type DTReportT = {
    ED_Container: EDContainer;
};

export type EDContainer = {
    DocumentID: DocumentID;
    RefDocumentID: DocumentID;
    ContainerDoc: ContainerDoc[];
};

export type ContainerDoc = {
    DocBody: DocBody;
};

export type DocBody = {
    Signature: Signature;
};

export type Signature = {
    SignatureValue: string;
    KeyInfo: any;
    Object: ObjectT;
};

export type ObjectT = {
    GTDoutCustomsMark?: GTDoutCustomsMark;
    _Id: any;
    KDTout_CU?: KDToutCU;
    ESADout_CU?: ESADoutCU;
    DTSout?: DTSout;
    GTDInCustomsMark?: GTDInCustomsMark;
    NotifGTDRegistration?: NotifGTDRegistration;
    RevealedRisks?: RevealedRisks;
    CompareRes?: CompareRes;
};

export type DTSout = {
    DocumentID: DocumentID;
    CustomsCostMethodCode: string;
    AdditionalSheetNumber: string;
    GTDDocumentID: string;
    CurrencyDate: Date;
    CurrencyCode: string;
    CurrencyRate: string;
    FormDTS: string;
    DTSoutSeller: DtSoutDeclarant;
    DTSoutBuyer: DTSoutBuyer;
    DTSInvoiceDocuments: DTSInvoiceDocument[];
    ReasonApplyMethod: ReasonApplyMethod;
    DTSGoodsCustomsCost: DTSGoodsCustomsCost;
    DTSoutFilledPerson: DTSoutFilledPerson;
    DTSoutDeclarant: DtSoutDeclarant;
    DeliveryTerms: DeliveryTerms;
    GTDNumber: GtdNumber;
    _DocumentModeID: string;
};

export type DTMainT = {
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

// ESADout
export type ESADoutCU = {
    DocumentID: DocumentID;
    RefDocumentID: DocumentID;
    EECEDocHeaderAddInfo: ESADoutCUEECEDocHeaderAddInfo;
    CustomsProcedure: string;
    CustomsModeCode: string;
    ElectronicDocumentSign: string;
    DeclarationKind: string;
    RecipientCountryCode: string;
    ESADout_CUGoodsShipment: ESADoutCUGoodsShipment;
    FilledPerson: ESADoutCUFilledPerson;
};

export type ESADoutCUEECEDocHeaderAddInfo = {
    EDocCode: DocumentID;
    EDocDateTime: DocumentID;
    LanguageCode: DocumentID;
    SourceCountryCode: DocumentID;
    DestinationCountryCode: DocumentID;
};

export type ESADoutCUFinancialAdjustingResponsiblePerson = {
    SubjectAddressDetails: ESADoutCUConsignorSubjectAddressDetails;
    DeclarantEqualFlag: string;
};

export type ESADoutCUGoods = {
    GoodsNumeric: DocumentID;
    GoodsDescription: DocumentID;
    GrossWeightQuantity: DocumentID;
    NetWeightQuantity: DocumentID;
    InvoicedCost: DocumentID;
    CustomsCost: DocumentID;
    StatisticalCost: DocumentID;
    GoodsTNVEDCode: DocumentID;
    BeginPeriodDate: DocumentID;
    EndPeriodDate: DocumentID;
    OriginCountryCode: DocumentID;
    CustomsCostCorrectMethod: DocumentID;
    DeliveryTime: DocumentID;
    DeliveryTimeEND: DocumentID;
    AdditionalSheetCount: DocumentID;
    GoodsGroupDescription: GoodsGroupDescription;
    Preferencii: Preferencii;
    LanguageGoods: string;
    ESADout_CUPresentedDocument: ESADoutCUPresentedDocument[];
    ESADout_CUPrecedingDocument: ESADoutCUPrecedingDocument;
    ESADout_CUCustomsPaymentCalculation: CustomsPaymentCalculation[];
    ESADGoodsPackaging: ESADGoodsPackaging;
    ESADCustomsProcedure: ESADCustomsProcedure;
};

export type ESADoutCUPrecedingDocument = {
    PrecedingDocumentCustomsCode: DocumentID;
    PrecedingDocumentDate: DocumentID;
    PrecedingDocumentNumber: DocumentID;
    PrecedingDocumentGoodsNumeric: DocumentID;
    PrecedingDocumentName: DocumentID;
    PrecedingDocumentModeCode: DocumentID;
};

export type ESADoutCUPresentedDocument = {
    PrDocumentName: DocumentID;
    PrDocumentNumber: DocumentID;
    PrDocumentDate?: DocumentID;
    PresentedDocumentModeCode: DocumentID;
    DocumentBeginActionsDate?: DocumentID;
    DocumentEndActionsDate?: DocumentID;
    RecordID: DocumentID;
    RFG44PresentedDocId?: RFG44PresentedDocID;
    DocumentPresentingDetails: DocumentPresentingDetails;
};

export type ESADoutCUCustomsPaymentRFOrganizationFeatures = {
    INN: DocumentID;
};

export type ESADoutCUFilledPerson = {
    SigningDetails: SigningDetails;
    SignatoryPersonIdentityDetails: SignatoryPersonIdentityDetails;
    PowerOfAttorneyDetails: PowerOfAttorneyDetails;
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

// KDTout
export type KDToutCU = {
    DocumentID: DocumentID;
    EECEDocHeaderAddInfo: KDToutCUEECEDocHeaderAddInfo;
    KDTNumber: string;
    CustomsProcedure: string;
    CustomsModeCode: string;
    DeclarationKind: string;
    ElectronicDocumentSign: string;
    KDToutGoodsShipment: KDToutGoodsShipment;
    GtdRegistryNumber: GtdNumber;
    LNPFilledPerson: string;
    CustomsCode: string;
    KDTFilledInfo: KDTFilledInfo;
    ChangeCode: ChangeCode;
};

export type KDTInfo = {
    KTDNumber: string;
    KDTGoodsInfo?: KDTGoodsInfo;
};

export type KDTGoodsInfo = {
    GoodsNumeric: string;
    DTGoodsNumeric: string;
    KDTPay: KDTPay[];
    K470Amount: string;
};

export type KDTPay = {
    PaymentModeCode: string;
    K470ModeCode: string;
};

export type KDToutCustomsPayment = {
    PaymentModeCode: DocumentID;
    PaymentAmount: DocumentID;
    PaymentCurrencyCode: DocumentID;
    PaymentPrevious: string;
    ChangeAmount: string;
    SumAmount: string;
    PaymentDocument?: PaymentDocument;
};

export type KDToutCUEECEDocHeaderAddInfo = {
    EDocCode: DocumentID;
    EDocDateTime: DocumentID;
};

export type KDTFilledInfo = {
    ExecutionDate: Date;
    FilledPerson: KDTFilledInfoFilledPerson;
};

export type KDTFilledInfoFilledPerson = {
    SigningDetails: SigningDetails;
};

export type KDToutGoodsShipment = {
    TotalGoodsNumber: DocumentID;
    TotalSheetNumber: DocumentID;
    TotalCustCost: DocumentID;
    CustCostCurrencyCode: DocumentID;
    KTDoutTotalGoodsNumber: string;
    PreviousTotalCustomsAmount: string;
    KTDoutDeclarant: DtSoutDeclarant;
    KDToutGoods: KDToutGoods;
    KDToutPayments: KDToutPayments;
};

export type KDToutGoods = {
    GoodsNumeric: DocumentID;
    GoodsDescription: DocumentID;
    GrossWeightQuantity: DocumentID;
    NetWeightQuantity: DocumentID;
    CustomsCost: DocumentID;
    StatisticalCost: DocumentID;
    GoodsTNVEDCode: DocumentID;
    OriginCountryCode: DocumentID;
    CustomsCostCorrectMethod: DocumentID;
    PreviousCustomsCost: string;
    KDTGoodsNumeric: string;
    KDToutCustomsPaymentCalculation: CustomsPaymentCalculation[];
    ChangeCode: ChangeCode;
};

export type KDToutPayments = {
    KDToutCustomsPayment: KDToutCustomsPayment[];
};

// inner properties
export type RUTransportMeans = {
    TransportIdentifier: string;
    TransportMeansNationalityCode: string;
};

export type PackagePalleteInformation = {
    InfoKindCode: string;
    PalleteCode: string;
    PalleteQuantity: string;
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
// end out declaration

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
export type CUESADDeliveryTerms = {
    DeliveryPlace: string;
    DeliveryTermsStringCode: string;
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

// GTD
export type GTD = {
    DTSout: {
        GTDNumber: {
            CustomsCode: string;
            GTDNumber: string;
            RegistrationDate: string;
        };
    };
};

export type CompareRes = {
    DocumentID: DocumentID;
    RefDocumentID: DocumentID;
    DocCompare: DocCompare[];
    SavedGoodLinks: SavedGoodLinks;
    Decision: string;
};

export type DocCompare = {
    NameDoc: string;
    NumberDoc: string;
    DocID: string;
    Group: GroupElement[] | PurpleGroup;
    Decision: string;
    BDRDID?: string;
};

export type GroupElement = {
    Name: string;
    Matching: MatchingElement[] | GroupMatchingClass;
};

export type MatchingElement = {
    Id: string;
    Name: string;
    ErrLevels: ErrLevels;
    ErrCode: string;
    ErrorName: string;
    CriterionGroup?: string;
    CriterionNum?: string;
    Result: string;
    Comment: string;
};

export type ErrLevels = {
    StageNum: string;
    ErrLevel: string;
};

export type XPathDocument = {
    PrDocumentName: DocumentID;
};

export type DocumentID = {
    _xmlns: any;
    __text: string;
};

export type GroupMatchingClass = {
    Id: string;
    Name: string;
    ErrLevels: ErrLevels;
    ErrCode: string;
    ErrorName: string;
    CriterionGroup?: string;
    CriterionNum?: string;
    Result: string;
    Comment: string;
};

export type PurpleGroup = {
    Name: string;
    Matching: GroupMatchingClass;
};

export type SavedGoodLinks = {
    GoodComplete: GoodComplete;
};

export type GoodComplete = {
    GoodNum: string;
    Complete: string;
};

export type DTSGoodsCustomsCost = {
    SheetNumber: DocumentID;
    SheetGoodsSerialNumber: DocumentID;
    MethodNumberCode: DocumentID;
    GTDGoodsNumber: DocumentID;
    GoodsTNVEDCode: DocumentID;
    NationalDeclaredCustomsCost: DocumentID;
    DollarDeclaredCustomsCost: DocumentID;
    CustomsCostCalculation: CustomsCostCalculation;
};

export type CustomsCostCalculation = {
    DTS4Method236: DTS4Method236;
};

export type DTS4Method236 = {
    Method2Basis: Method2Basis;
    Method2DealCorrect: Method2DealCorrect;
    DeclaratedGoodsQuantity: GoodsQuantity;
    IdenticalGoodsQuantity: GoodsQuantity;
};

export type GoodsQuantity = {
    GoodsQuantity: DocumentID;
    MeasureUnitQualifierName: DocumentID;
    MeasureUnitQualifierCode: DocumentID;
};

export type Method2Basis = {
    IdenticalDealNationalAmount: DocumentID;
};

export type Method2DealCorrect = {
    TotalDealCorrect: string;
};

export type DTSInvoiceDocument = {
    PrDocumentName: DocumentID;
    PrDocumentNumber: DocumentID;
    PrDocumentDate: DocumentID;
    PresentedDocumentModeCode: DocumentID;
    PositionNumber: DocumentID;
};

export type DTSoutBuyer = {
    OrganizationName: DocumentID;
    SubjectAddressDetails: DTSoutBuyerSubjectAddressDetails;
};

export type DTSoutBuyerSubjectAddressDetails = {
    CountryCode: string;
    CounryName: string;
    City: string;
    StreetHouse: string;
};

export type DtSoutDeclarant = {
    OrganizationName: DocumentID;
    RFOrganizationFeatures: DTSoutDeclarantRFOrganizationFeatures;
    SubjectAddressDetails: DTSoutDeclarantSubjectAddressDetails;
};

export type DTSoutDeclarantRFOrganizationFeatures = {
    OGRN: string;
    INN: string;
    KPP: string;
};

export type DTSoutDeclarantSubjectAddressDetails = {
    PostalCode: string;
    CountryCode: string;
    CounryName: string;
    Region: string;
    City: string;
    StreetHouse: string;
};

export type DTSoutFilledPerson = {
    PersonSurname: DocumentID;
    PersonName: DocumentID;
    PersonMiddleName: DocumentID;
    PersonPost: DocumentID;
    FilledDate: DocumentID;
    LNP: string;
    CustomsCode: string;
};

export type DeliveryTerms = {
    DeliveryPlace: DocumentID;
    DeliveryTermsStringCode: DocumentID;
};

export type GtdNumber = {
    CustomsCode: DocumentID;
    RegistrationDate: DocumentID;
    GTDNumber: DocumentID;
};

export type ReasonApplyMethod = {
    ReasonDescription: DocumentID[];
};

export type CustomsPaymentCalculation = {
    PaymentModeCode: DocumentID;
    PaymentAmount: DocumentID;
    PaymentCurrencyCode: DocumentID;
    Rate: DocumentID;
    RateTypeCode: DocumentID;
    RateCurrencyCode?: DocumentID;
    RateUseDate: DocumentID;
    PaymentCode: DocumentID;
    TaxBase?: DocumentID;
    TaxBaseCurrencyCode?: DocumentID;
};

export type RFG44PresentedDocID = {
    ElectronicDocumentID: string;
    ElectronicArchID: string;
    DocumentModeID: string;
};

export type GTDInCustomsMark = {
    DocumentID: DocumentID;
    GTDDocumentID: string;
    GTDInCommonMark: GTDInCommonMark[];
    GTDInGoodsResolution: GTDInGoodsResolution;
    GTDID: GtdNumber;
    TechMarks: TechMarks;
    ProcessID: string;
    KDTInfo: KDTInfo[];
};

export type GTDInCommonMark = {
    MarkIdentif: DocumentID;
    MarkStatus: DocumentID;
    GRNumber: DocumentID;
    StageMarkIdentifier: DocumentID;
    NoteMarkIdentifier: DocumentID;
    InformationTypeCode?: DocumentID;
    MarkDescription?: DocumentID;
    DateInf: DocumentID;
    TimeInf: DocumentID;
    PersonName: DocumentID;
    LNP: DocumentID;
    OutType?: string;
    Code?: DocumentID;
    RefMarkIdentif?: DocumentID;
    IdentifierDescription?: DocumentID;
    Amount?: Amount;
    aAutoCode?: AAutoCode;
    GoodsPresentDate?: Date;
    GoodsPresentTime?: string;
    LNPCustomsCode?: DocumentID;
    StageDescription?: DocumentID;
    Deadline?: DocumentID;
    DocumentInfo?: GTDInCommonMarkDocumentInfo;
};

export type Amount = {
    Amount: DocumentID;
    CurrencyCode: DocumentID;
};

export type GTDInCommonMarkDocumentInfo = {
    PrDocumentName?: DocumentID;
    PrDocumentNumber: DocumentID;
    PrDocumentDate?: DocumentID;
};

export type AAutoCode = {
    aAddCode: string;
    CriterionCode: string;
};

export type GTDInGoodsResolution = {
    GoodsNumeric: string;
    GTDInGoodsCustomsMark: GTDInGoodsCustomsMark[];
};

export type GTDInGoodsCustomsMark = {
    MarkIdentif: DocumentID;
    MarkStatus: DocumentID;
    GRNumber: DocumentID;
    StageMarkIdentifier: DocumentID;
    NoteMarkIdentifier: DocumentID;
    MarkDescription?: DocumentID;
    DateInf: DocumentID;
    TimeInf: DocumentID;
    PersonName: DocumentID;
    LNP: DocumentID;
    LNPCustomsCode?: DocumentID;
    DocumentIndicator?: DocumentID;
    StageDescription?: DocumentID;
    OutType: string;
    InformationTypeCode?: DocumentID;
    Deadline?: DocumentID;
    DeadlineReason?: DocumentID;
    DocumentInfo?: GTDInCommonMarkDocumentInfo;
    Amount?: Amount;
    PaymentTypeCode?: DocumentID;
    PaymentWayCode?: DocumentID;
};

export type TechMarks = {
    ModificationDate: Date;
    ModificationTime: string;
};

export type GTDoutCustomsMark = {
    DocumentID: DocumentID;
    GTDDocumentID: string;
    GTDOutResolution: GtdOut;
    GTDOutCommonMark: GTDOutCommonMark[];
    GTDOutGoodsResolution: GTDOutGoodsResolution;
    GTDID: GtdNumber;
};

export type GTDOutCommonMark = {
    MarkIdentif: DocumentID;
    MarkStatus: DocumentID;
    GRNumber: DocumentID;
    StageMarkIdentifier: DocumentID;
    NoteMarkIdentifier: DocumentID;
    MarkDescription: DocumentID;
    DateInf: DocumentID;
    TimeInf: DocumentID;
    PersonName: DocumentID;
    LNP: DocumentID;
    LNPCustomsCode: DocumentID;
    DocumentInfo?: GTDInCommonMarkDocumentInfo;
    InformationTypeCode?: DocumentID;
    StageDescription?: DocumentID;
};

export type GTDOutGoodsResolution = {
    GoodsNumeric: string;
    GTDOutGoodsResult: GtdOut;
    GTDOutGoodsMark: GTDOutGoodsMark[];
    CustCostMethod: CustCostMethod;
};

export type CustCostMethod = {
    CustomsCostCorrectMark: string;
    CustomsCostCorrectMethod: string;
};

export type GTDOutGoodsMark = {
    MarkIdentif: DocumentID;
    MarkStatus: DocumentID;
    GRNumber: DocumentID;
    StageMarkIdentifier: DocumentID;
    NoteMarkIdentifier: DocumentID;
    MarkDescription: DocumentID;
    DateInf: DocumentID;
    TimeInf: DocumentID;
    PersonName: DocumentID;
    LNP: DocumentID;
    LNPCustomsCode?: DocumentID;
    Deadline?: DocumentID;
    DeadlineReason?: DocumentID;
    InformationTypeCode?: DocumentID;
    Amount?: Amount;
    PaymentTypeCode?: DocumentID;
    PaymentWayCode?: DocumentID;
    DocumentInfo?: GTDOutGoodsMarkDocumentInfo;
};

export type GTDOutGoodsMarkDocumentInfo = {
    PrDocumentNumber: DocumentID;
};

export type GtdOut = {
    DecisionCode: DocumentID;
    DateInf: DocumentID;
    TimeInf: DocumentID;
    LNP: DocumentID;
    LNPCustomsCode: DocumentID;
    FoundationDes: FoundationDES;
    PersonName: string;
};

export type FoundationDES = {
    ResolutionDescription: string;
};

export type InventoryIn = {
    DocumentID: DocumentID;
    GTDPerson: GTDPerson;
    InventoryInstance: InventoryInstance;
    GTDNumber: GtdNumber;
};

export type GTDPerson = {
    OrganizationName: DocumentID;
    RFOrganizationFeatures: DTSoutDeclarantRFOrganizationFeatures;
};

export type InventoryInstance = {
    InventDocument: InventDocument[];
};

export type InventDocument = {
    DocId?: string;
    InvDocCode: string;
    InvDocName: string;
    InvDocNumber?: string;
    InvDocDate?: Date;
    DocumentFormSign: string;
    IndicatorPresent: string;
    IndicatorDecl?: string;
    RequestPositionID: string;
    ArchID?: string;
    ArchDocID?: string;
    RequestTime: Date;
    ReceiveTime?: Date;
};

export type ChangeCode = {
    PhaseChanges: string;
    BasisCompilation: string;
    QuantityChanges: string;
    CountryChanges: string;
    TNVEDChanges: string;
    CustCostChanges: string;
    CustomsPaymentChanges: string;
    OtherChanges: string;
};

export type PaymentDocument = {
    DocPaymentAmount: string;
    PaymentDocCurrencyCode: string;
    RFOrganizationFeatures: ESADoutCUCustomsPaymentRFOrganizationFeatures;
};

export type NotifGTDRegistration = {
    DocumentID: DocumentID;
    RefDocumentID: DocumentID;
    RegistrationDate: Date;
    RegistrationTime: string;
    DocSign: string;
    Customs: Customs;
    GTDID: GtdNumber;
    CustomsPersonSignature: CustomsPersonSignature;
};

export type Customs = {
    Code: DocumentID;
    OfficeName: DocumentID;
};

export type CustomsPersonSignature = {
    PersonName: DocumentID;
    LNP: DocumentID;
    IssueDate: Date;
};

export type ReportCloseControlDocument = {
    DocID: string;
    DocModeID: string;
    DocName: string;
};

type RevealedRisks = {
    DocumentID: DocumentID;
    GTDDocumentID: string;
    RevealledRisks: RevealledRisk[];
    AddResultRiskProfile: AddResultRiskProfile;
    DocID: DocID;
    CategoryObject: string;
    CategoryObject2: string;
};

export type AddResultRiskProfile = {
    TerrActionCode: string;
    CustomsActionCode: string;
    RiskProfileRegDate: Date;
    RiskProfileNumber: string;
    RiskProfileNumberVersion: string;
    KDTNumber: string;
    DTGoodsNumeric: string;
    NUM_OUP: string;
    ChangeAmount: string;
    ReturnAmount: string;
};

export type DocID = {
    DTRegNum: GtdNumber;
};

export type RevealledRisk = {
    Consigment?: string;
    GoodsNumeric: string;
    RiskProfileType: string;
    TerrActionCode: string;
    RiskProfileRegDate: Date;
    RiskProfileNumber: string;
    RiskProfileNumberVersion: string;
    CriteriionCode: string;
    ActivityCode: string;
    PointCode: string;
    PointDate: Date;
    PointTime: string;
    CustomsActionCode: string;
    SoftVersion?: string;
    FirstPointDate?: Date;
    EndVerDate?: Date;
    AddNonFormInfoRiskProfile?: AddNonFormInfoRiskProfile;
};

export type AddNonFormInfoRiskProfile = {
    InformationCode: string;
    LineNumber: string;
    TypicalName: string;
    PointCode: string;
};

export type ActionResult = {
    ActionResultCode: string;
};
