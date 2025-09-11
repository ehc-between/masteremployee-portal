/**
 *
 * Endpoint definitions
 * COR-USM
 * Users
 *
 */
export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user_id: string;
  toc_accepted_at: Date;
  core_access: boolean;
  crew_access: boolean;
}

export interface UserResponse {
  user_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  toc_accepted_at: Date;
  active: number;
  profile_image_url: string;
  component_access_id: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface UserOptionsResponse {
  language: string;
  preferred_assistant_type_id: string;
}

export interface UserEntityRelationWithoutUserDataResponse {
  entity_id: string;
  entity_name: string;
  role_id: number;
  role_name: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}


export interface CompanyResponse {
  company_id: string;
  company_name: string;
  organisation_number: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  active: boolean
  updated_by: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;

}

export interface InvitationTokenVerificationResponse {
  status_id: number;
  status_name: string;
}

export interface UserEntityRelationWithUserDataResponse {
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  full_name?: string;
  phone: string | null;
  email: string | null;
  active: number;
  component_access_id: string;
  role_id: number;
  role_name: string;
  identificator: string;
  taskable: number;
  profile_image_url: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}


/**
 *
 * Endpoint definitions
 * MEE-APP
 * Applications
 *
 */

export interface ApplicationResponse {
  application_id: number
  application_name: string
  application_description: string
  application_type_id: number
  application_type_name: string
  icon_id: number | null
  icon_url: string | null
}

export interface ApplicationTypeResponse {
  application_type_id: number
  application_type_name: string
}


