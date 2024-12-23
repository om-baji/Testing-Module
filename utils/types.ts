export type dropDownProps = {
    id: string,
    label: string,
    options?: options[],
    placeholder: string,
    onChange?: () => Promise<void>,
    value?: string
}

export type options = {
    label: string,
    value: string
}

export enum OPTION {
    Teacher = "teacher",
    Student = "student",
}

export interface ToggleGroupProps {
    id: string;
    label: string;
    selectedValue?: OPTION;
    onChange?: (value: OPTION) => void;
}