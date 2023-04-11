export type SelectT = {
    current: string;
    setter: (newCurrent: string) => void;
    options: string[];
    title: string;
};

export type SelectSpecificT = Omit<SelectT, 'options' | 'title'>;
