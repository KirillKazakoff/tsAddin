import { CargoT } from '../../docsStores/portLetterStore';
import { initPortRu, initPodpisant } from '../../initStoreObjects';

export const debugPortLetter = () => ({
    port: initPortRu(),
    podpisant: initPodpisant(),
    dateLetter: '12.12.23',
    isCFR: true,
    cargoTo: {
        storage: <CargoT>'Покупатель',
        auto: <CargoT>'Покупатель',
    },
    storage: {
        from: '14.12.23',
        to: '17.12.23',
    },
    isPicturesActive: true,
});
