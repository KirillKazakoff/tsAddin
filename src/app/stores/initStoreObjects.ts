import {
    PodpisantT, PortRuT, PortTamozhnyaT, TransportT,
} from '../types/typesSP';

export const initTransport = (): TransportT => ({
    eng: { name: '' },
    ru: { name: '' },
    id: '',
});

export const initPortRu = (): PortRuT => ({
    codeName: '',
    director: '',
    mail: '',
    name: '',
    phone: '',
});

export const initPortTamozhnya = (): PortTamozhnyaT => ({
    codeName: '',
    eng: { name: '' },
    ru: { name: '' },
});

export const initPodpisant = (): PodpisantT => ({
    codeName: '',
    ru: {
        name: '',
        comment: '',
    },
    eng: {
        name: '',
        comment: '',
    },
    declination: '',
});
