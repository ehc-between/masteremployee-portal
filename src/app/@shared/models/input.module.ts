export interface pagination_input {
  page?: number | null;
  limit?: number | null;
  paginate?: number | null;
}

export interface sorting_input {
  order_by?: string | null;
  order_direction?: string | null;
}

export interface search_input {
  search_string?: string | number | null;
  search_string_columns?: string[] | null;
}

export interface date_input {
  date_from?: null | Date | string;
  date_to?: null | Date | string;
}

export interface USM_USR_0 {
  email: string;
  password: string;
}

export interface USM_USR_1 {
  user_id: string;
}

export interface USM_USR_3 {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface USM_USR_6 {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role_id: number;
  entity_id: string;
  skip_invitation: number;
  component_id: string;
}

export interface USM_USR_13 {
  email: number;
}

export interface USM_USR_14 {
  reset_token: string;
  new_password: string;
}

export interface USM_USR_16 {
  image: File;
}

export interface USM_USR_18 {
  old_password: string;
  new_password: string;
}

export interface USM_USR_19 {
  invitation_token: string;
  password: string;
  email: string;
}

export interface USM_USR_22 {
  language?: string;
  preferred_assistant_type_id?: string;
}

export interface USM_USR_25 {
  invitation_token: string;
}

export interface USM_USR_26 {
  company_id: string
}

export interface USM_USR_27 {
  company_id: string
  assistant_group_id: string
}
export interface _USM_USR_27 extends Omit<USM_USR_27, 'company_id'> {}

export interface USM_USR_28 {
  company_id: string
  assistant_group_id: string
}
export interface _USM_USR_28 extends Omit<USM_USR_27, 'company_id'> {}

export interface COR_COY_0 {
  company_id: string;
}
export interface _COR_COY_0 extends Omit<COR_COY_0, 'company_id'> {}

export interface COR_COY_1 {
  company_name: string;
  organisation_number: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
}

export interface COR_COY_2 {
  company_id: string;
  company_name: string;
  organisation_number: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
}
export interface _COR_COY_2 extends Omit<COR_COY_2, 'company_id'> {}

export interface COR_COY_3 {
  company_id: string;
}
export interface _COR_COY_3 extends Omit<COR_COY_3, 'company_id'> {}

export interface COR_COY_4 extends pagination_input, search_input, sorting_input {}

export interface COR_COY_5 {
  company_id: string;
}
export interface _COR_COY_5 extends Omit<COR_COY_5, 'company_id'> {}


export interface USM_ENT_0 {
  entity_tag: string;
  role_id_list?: number[];
}

export interface USM_ENT_2 {
  user_id: string;
  entity_id: string;
  role_id: number;
  component_id: string;
}

export interface USM_ENT_3 {
  entity_id: string;
  user_id: string;
}


// --------------------------- Application Input Models ---------------------------

export interface MEE_APP_0 {
  company_id: string;
}
export interface _MEE_APP_0 extends Omit<MEE_APP_0, 'company_id'> {}


export interface MEE_APP_1 {
  company_id: string;
  application_id: string;
}
export interface _MEE_APP_1 extends Omit<MEE_APP_1, 'company_id'> {}


export interface MEE_APP_2 {
  company_id: string;
  application_id?: string;
}
export interface _MEE_APP_2 extends Omit<MEE_APP_2, 'company_id'> {}


export interface MEE_APP_3 {
  company_id: string;
  application_id: string;
}
export interface _MEE_APP_3 extends Omit<MEE_APP_3, 'company_id'> {}


export interface MEE_APP_4 {}


// --------------------------- Integration Input Models ---------------------------

export interface MEE_INT_0 {
  company_id: string;
  api_key: string
}
export interface _MEE_INT_0 extends Omit<MEE_INT_0, 'company_id'> {}



