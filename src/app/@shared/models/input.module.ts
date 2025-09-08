import {TemplateMissingDataFieldResponse} from "./response.module";

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

export interface COR_COY_6 {
  company_id: string;
  description: string;
  word: string;
  explanation: string;
}
export interface _COR_COY_6 extends Omit<COR_COY_6, 'company_id'> {}

export interface COR_COY_7 {
  company_id: string;
  entry_id: string
  description: string;
  word: string;
  explanation: string;
}
export interface _COR_COY_7 extends Omit<COR_COY_7, 'company_id'> {}

export interface COR_COY_8 {
  company_id: string;
  entry_id: string
}
export interface _COR_COY_8 extends Omit<COR_COY_8, 'company_id'> {}


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

export interface COR_TMP_0 {
  company_id: string;
  template_id: string;
}

export interface COR_TMP_1 {
  company_id: string;
  template_name: string;
  template_description: string;
}
export interface _COR_TMP_1 extends Omit<COR_TMP_1, 'company_id'> {}


export interface COR_TMP_2 {
  company_id: string;
  template_id: number;
  template_name: string;
  template_description: string;
  private: boolean;
}
export interface _COR_TMP_2 extends Omit<COR_TMP_2, 'company_id'> {}


export interface COR_TMP_4 {
  company_id: string;
  template_id: number;
  display_name: string;
  question: string;
  context?: string;
  question_answer_type_id: number;
  index: number;
}
export interface _COR_TMP_4 extends Omit<COR_TMP_4, 'company_id'> {}


export interface COR_TMP_5 {
  company_id: string;
  question_id: number;
  display_name: string;
  question: string;
  context?: string;
  question_answer_type_id: number;
  index: number;
}
export interface _COR_TMP_5 extends Omit<COR_TMP_5, 'company_id'> {}


export interface COR_TMP_6 extends pagination_input, search_input, sorting_input {
  company_id: string;
}
export interface _COR_TMP_6 extends Omit<COR_TMP_6, 'company_id'> {}


export interface COR_TMP_7 {
  company_id: string;
}


export interface COR_TMP_8 {
  company_id: string;
  template_id: number;
}
export interface _COR_TMP_8 extends Omit<COR_TMP_8, 'company_id'> {}


export interface COR_TMP_9 {
  company_id: string;
  question_id: number;
}
export interface _COR_TMP_9 extends Omit<COR_TMP_9, 'company_id'> {}



export interface COR_AII_0 {
  company_id: string;
  assistant_id?: string;
}
export interface _COR_AII_0 extends Omit<COR_AII_0, 'company_id'> {}

export interface COR_AII_1 {
  company_id: string;
  assistant_name: string;
  assistant_type_id: string;
}
export interface _COR_AII_1 extends Omit<COR_AII_1, 'company_id'> {}

export interface COR_AII_2 {
  company_id: string;
  assistant_id: string;
  assistant_name: string;
  assistant_type_id: number;
}
export interface _COR_AII_2 extends Omit<COR_AII_2, 'company_id'> {}

export interface COR_AII_3 {
  company_id: string;
  assistant_id: string;
}
export interface _COR_AII_3 extends Omit<COR_AII_3, 'company_id'> {}


export interface COR_AII_4 {
  company_id: string;
}

export interface COR_AII_5 extends pagination_input, search_input, sorting_input {
  company_id: string;
  thread_id?: string;
  assistant_id?: string;
  assistant_model_id?: string;
  assistant_group_id?: string;
  qna?: number;
  report?: number;
}
export interface _COR_AII_5 extends Omit<COR_AII_5, 'company_id'> {}

export interface COR_AII_6 {
  company_id: string;
  template_id?: string;
  assistant_id: string;
  qna?: number;
  topic?: string;
  file_ids?: string[];
}
export interface _COR_AII_6 extends Omit<COR_AII_6, 'company_id'> {}

export interface COR_AII_7 {
  company_id: string;
  thread_id: string;
  template_id: string;
  topic?: string;
  file_ids?: string[];
}
export interface _COR_AII_7 extends Omit<COR_AII_7, 'company_id'> {}

export interface COR_AII_8 {
  company_id: string;
  thread_id: string;
}
export interface _COR_AII_8 extends Omit<COR_AII_8, 'company_id'> {}

export interface COR_AII_9 {
  company_id: string;
  file_id?: number;
  assistant_id?: string;
}
export interface _COR_AII_9 extends Omit<COR_AII_9, 'company_id'> {}

export interface COR_AII_10 {
  company_id: string;
  assistant_id?: string;
  assistant_group_id?: string;
  file: File;
  default_file_id?: number;
  default_file_sync?: boolean;
  supplementary_data?: number;
}
export interface _COR_AII_10 extends Omit<COR_AII_10, 'company_id'> {}

export interface COR_AII_11 {
  company_id: string;
  file_id: number;
}
export interface _COR_AII_11 extends Omit<COR_AII_11, 'company_id'> {}


export interface COR_AII_12 {
  company_id: string;
  thread_id: string;
}
export interface _COR_AII_12 extends Omit<COR_AII_12, 'company_id'> {}

export interface COR_AII_13 {
  company_id: string;
  thread_id: string;
  message_id?: string;
}
export interface _COR_AII_13 extends Omit<COR_AII_13, 'company_id'> {}

export interface COR_AII_14 {
  company_id: string;
  thread_id: string;
  file_id: string | null;
  input: string;
  display_message?: number;
  question_id?: number;
}
export interface _COR_AII_14 extends Omit<COR_AII_14, 'company_id'> {}

export interface COR_AII_15 {
  company_id: string;
  message_id: string;
}
export interface _COR_AII_15 extends Omit<COR_AII_15, 'company_id'> {}

export interface COR_AII_16 {
  company_id: string;
  qna_assistant_id?: string;
}
export interface _COR_AII_16 extends Omit<COR_AII_16, 'company_id'> {}


export interface COR_AII_17 extends pagination_input, search_input, sorting_input {
  company_id: string;
  assistant_group_id?: string;
}
export interface _COR_AII_17 extends Omit<COR_AII_17, 'company_id'> {}

export interface COR_AII_18 {
  company_id: string;
  assistant_group_name: string;
  reference?: string;
  assistant_group_description?: string;
  private: boolean;
}
export interface _COR_AII_18 extends Omit<COR_AII_18, 'company_id'> {}

export interface COR_AII_19 {
  company_id: string;
  assistant_group_id: string;
  assistant_group_name: string;
  reference?: string;
  assistant_group_description?: string;
  private: boolean;
}
export interface _COR_AII_19 extends Omit<COR_AII_19, 'company_id'> {}

export interface COR_AII_20 {
  company_id: string;
  assistant_group_id: string;
}
export interface _COR_AII_20 extends Omit<COR_AII_20, 'company_id'> {}

export interface COR_AII_21 {
  company_id: string;
  assistant_group_id: string;
  user_id: string;
  access_level_id: number;
}
export interface _COR_AII_21 extends Omit<COR_AII_21, 'company_id'> {}

export interface COR_AII_22 {
  relation_id: number;
  company_id: string;
  assistant_group_id: string;
  user_id: string;
  access_level_id: number;
}
export interface _COR_AII_22 extends Omit<COR_AII_22, 'company_id'> {}

export interface COR_AII_23 {
  company_id: string;
  relation_id: number;
}
export interface _COR_AII_23 extends Omit<COR_AII_23, 'company_id'> {}


export interface COR_AII_24 {
  company_id: string;
  file_id: string;
  org: number;
  default?: number; // 0 for false, 1 for true
}
export interface _COR_AII_24 extends Omit<COR_AII_24, 'company_id'> {}


export interface COR_AII_25 {
  company_id: string;
  assistant_model_id?: number;
}
export interface _COR_AII_25 extends Omit<COR_AII_25, 'company_id'> {}

export interface COR_AII_26 {
  company_id: string;
  assistant_type_id: string;
  assistant_type_name: string;
  instructions: string;
  model: string;
  temperature: string;
  top_p: string;
  web_search: number;
}
export interface _COR_AII_26 extends Omit<COR_AII_26, 'company_id'> {}

export interface COR_AII_27 {
  company_id: string;
  assistant_model_id: string;
  assistant_type_id: string;
  assistant_type_name: string;
  instructions: string;
  model: string;
  temperature: string;
  top_p: string;
  web_search: number;
}
export interface _COR_AII_27 extends Omit<COR_AII_27, 'company_id'> {}

export interface COR_AII_28 {
  company_id: string;
  assistant_model_id: string;
}
export interface _COR_AII_28 extends Omit<COR_AII_28, 'company_id'> {}

export interface COR_AII_29 {
  company_id: string;
  question: string;
}

export interface COR_AII_30 {}


export interface COR_AII_31 {}

export interface COR_AII_32 {
  topic: string;
}

export interface COR_AII_33 {
  topic: string;
}

export interface COR_AII_34 {
  personal_assistant_thread_id: string;
  input: string;
  display_message: number;
}

export interface COR_AII_35 {
  personal_assistant_thread_id: string;
}

export interface COR_AII_36 {
  personal_assistant_thread_id: string;
}

export interface COR_AII_37 {
  personal_assistant_thread_id: string;
  input: string;
  display_message: number;
}

export interface COR_AII_38 {
  company_id: string;
  thread_id: string;
}
export interface _COR_AII_38 extends Omit<COR_AII_38, 'company_id'> {}

export interface COR_AII_39 {
  company_id: string;
  report_id?: string;
  assistant_group_id: string;
}
export interface _COR_AII_39 extends Omit<COR_AII_39, 'company_id'> {}

export interface COR_AII_40 {
  company_id: string;
  report_name: string;
  assistant_id: string;
  template_id: string;
  file_ids: string[];
}
export interface _COR_AII_40 extends Omit<COR_AII_40, 'company_id'> {}

export interface COR_AII_42 {
  company_id: string;
  report_id: string;
}
export interface _COR_AII_42 extends Omit<COR_AII_42, 'company_id'> {}

export interface COR_AII_43 {
  company_id: string;
  default_file_group_id?: string;
}
export interface _COR_AII_43 extends Omit<COR_AII_43, 'company_id'> {}

export interface COR_AII_44 {
  company_id: string;
  default_file_group_name: string;
  default_file_group_description: string;
}
export interface _COR_AII_44 extends Omit<COR_AII_44, 'company_id'> {}

export interface COR_AII_45 {
  company_id: string;
  default_file_group_id: string;
  default_file_group_name: string;
  default_file_group_description: string;
}
export interface _COR_AII_45 extends Omit<COR_AII_45, 'company_id'> {}

export interface COR_AII_46 {
  company_id: string;
  default_file_group_id: string;
}
export interface _COR_AII_46 extends Omit<COR_AII_46, 'company_id'> {}

export interface COR_AII_47 {
  company_id: string;
  default_file_group_id: string;
  file: File;
}
export interface _COR_AII_47 extends Omit<COR_AII_47, 'company_id'> {}

export interface COR_AII_48 {
  company_id: string;
  default_file_id: number;
}
export interface _COR_AII_48 extends Omit<COR_AII_48, 'company_id'> {}

export interface COR_AII_49 {
  company_id: string;
  thread_id: string;
  file_ids: string[];
}
export interface _COR_AII_49 extends Omit<COR_AII_49, 'company_id'> {}

export interface COR_AII_50 {
  company_id: string;
  thread_id: string;
  ai_file_id: string;
}
export interface _COR_AII_50 extends Omit<COR_AII_50, 'company_id'> {}

export interface data_fields_put_input {
  field_id: number;
  question_id: number;
  value: string;
}

export interface data_fields_post_input {
  question_display_name: string;
  question_question: string;
  value: string;
}

export interface COR_AII_51 {
  company_id: string;
  data_fields: TemplateMissingDataFieldResponse[];
}
export interface _COR_AII_51 extends Omit<COR_AII_51, 'company_id'> {}

export interface COR_AII_52 {
  company_id: string;
  assistant_group_id: string;
  data_fields: data_fields_post_input[];
}
export interface _COR_AII_52 extends Omit<COR_AII_52, 'company_id'> {}

export interface COR_AII_53 {
  company_id: string;
  template_missing_data_field_id: number;
}
export interface _COR_AII_53 extends Omit<COR_AII_53, 'company_id'> {}

export interface COR_AII_54 {
  company_id: string;
  template_name: string
  template_description: string
  ai_instruction: string
}
export interface _COR_AII_54 extends Omit<COR_AII_54, 'company_id'> {}

export interface COR_AII_55 {
  company_id: string;
  assistant_group_id: string;
}
export interface _COR_AII_55 extends Omit<COR_AII_55, 'company_id'> {}

export interface COR_AII_56 {
  company_id: string;
  assistant_id: string;
  template_missing_data_field: number;
  file_ids: string[];
}
export interface _COR_AII_56 extends Omit<COR_AII_56, 'company_id'> {}

export interface COR_AII_57 {
  company_id: string;
  thread_id: string;
  instructions: string;
  rag: number
  model: string;
  web_search: number;
}
export interface _COR_AII_57 extends Omit<COR_AII_57, 'company_id'> {}

export interface COR_TMP_10 {
  company_id: string;
  template_id: number;
  user_id: string;
  access_level_id: number;
}
export interface _COR_TMP_10 extends Omit<COR_TMP_10, 'company_id'> {}

export interface COR_TMP_11 {
  relation_id: number;
  company_id: string;
  template_id: string;
  user_id: string;
  access_level_id: number;
}
export interface _COR_TMP_11 extends Omit<COR_TMP_11, 'company_id'> {}

export interface COR_TMP_12 {
  company_id: string;
  relation_id: number;
}
export interface _COR_TMP_12 extends Omit<COR_TMP_12, 'company_id'> {}


export interface COR_SER_1 {
  company_id?: string;
}
