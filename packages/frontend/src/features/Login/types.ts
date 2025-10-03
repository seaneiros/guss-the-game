import type { FormFields } from './enums'

export type LoginFormValues = {
  [FormFields.Name]: string;
  [FormFields.Password]: string;
}