export type dropDownProps = {
  id: string;
  label: string;
  options?: options[];
  placeholder: string;
  onChange?: () => Promise<void>;
  value?: string;
};

export type options = {
  label: string;
  value: string;
};

export enum ROLES {
  Teacher = "teacher",
  Student = "student",
}

export interface ToggleGroupProps {
  id: string;
  label: string;
  selectedValue?: ROLES;
  onChange?: (value: ROLES) => void;
}

export enum Role {
  Teacher = "Teacher",
  Student = "Student",
}


