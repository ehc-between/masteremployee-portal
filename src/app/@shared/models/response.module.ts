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


/**
 *
 * Endpoint definitions
 * MEE-REC
 * Recruiter
 *
 */

// ---------- Candidate Root ----------

export interface CandidateResponse {
  candidate_id: string
  company_id: string
  source: string
  external_id: string
  corporation_id: string | null

  first_name: string | null
  last_name: string | null
  title: string | null
  gender: string | null
  marital_status: string | null
  dob: string | null
  work_status: string | null
  description: string | null
  notes: string | null
  banned: number | null
  rating: number | null

  email: string | null
  office_email: string | null
  mobile_phone: string | null
  home_phone: string | null
  office_phone: string | null

  facebook: string | null
  linkedin: string | null
  twitter: string | null
  web: string | null

  created_remote: string | null
  updated_remote: string | null
  nationality: string | null
  language_id: string | null
  address1: string | null
  address2: string | null
  postal_code: string | null
  city: string | null
  country: string | null
  profile_picture: string | null
  employee: number | null

  terms_value: number | null
  terms_created: string | null
  terms_user_id: string | null

  educations: CandidateEducationResponse[]
  experiences: CandidateExperienceResponse[]
  project_experiences: CandidateProjectExperienceResponse[]
  skills: CandidateSkillResponse[]
  languages: CandidateLanguageResponse[]
  files: CandidateFileResponse[]
  interviews: CandidateInterviewResponse[]
  pipelines: CandidatePipelineResponse[]
  phones: CandidatePhoneResponse[]

  user_ids: string[]
  company_ids: string[]
  department_ids: string[]
  industry_ids: string[]

  created_at: string
  updated_at: string | null
}


export interface CandidateCompactResponse {
  candidate_id: string
  company_id: string
  source: string
  external_id: string
  corporation_id: string | null

  first_name: string | null
  last_name: string | null
  title: string | null
  gender: string | null
  marital_status: string | null
  dob: string | null
  work_status: string | null
  description: string | null
  notes: string | null
  banned: number | null
  rating: number | null

  email: string | null
  office_email: string | null
  mobile_phone: string | null
  home_phone: string | null
  office_phone: string | null

  facebook: string | null
  linkedin: string | null
  twitter: string | null
  web: string | null

  created_remote: string | null
  updated_remote: string | null
  nationality: string | null
  language_id: string | null
  address1: string | null
  address2: string | null
  postal_code: string | null
  city: string | null
  country: string | null
  profile_picture: string | null
  employee: number | null

  number_of_experiences: number | null
  number_of_educations: number | null

  // terms_value: number | null
  // terms_created: string | null
  // terms_user_id: string | null

  // educations: CandidateEducationResponse[]
  // experiences: CandidateExperienceResponse[]
  // project_experiences: CandidateProjectExperienceResponse[]
  // skills: CandidateSkillResponse[]
  // languages: CandidateLanguageResponse[]
  // files: CandidateFileResponse[]
  // interviews: CandidateInterviewResponse[]
  // pipelines: CandidatePipelineResponse[]
  // phones: CandidatePhoneResponse[]
  //
  // user_ids: string[]
  // company_ids: string[]
  // department_ids: string[]
  // industry_ids: string[]
  //
  // created_at: string
  // updated_at: string | null
}

// ---------- Nested ----------

export interface CandidateEducationResponse {
  education_id: string | null
  school_name: string | null
  type: string | null
  degree: string | null
  location: string | null
  start_date: string | null
  end_date: string | null
  description: string | null
}

export interface CandidateExperienceResponse {
  experience_id: string | null
  company_name: string | null
  title: string | null
  location: string | null
  start_date: string | null
  end_date: string | null
  current: number | null
  description: string | null
}

export interface CandidateProjectExperienceResponse {
  project_experience_id: string | null
  name: string | null
  description: string | null
  url: string | null
  from_date: string | null
  to_date: string | null
}

export interface CandidateSkillResponse {
  skill_id: string | null
  name: string | null
}

export interface CandidateLanguageResponse {
  language_id: string | null
  name: string | null
  level: string | null
}

export interface CandidateFileResponse {
  file_id: string | null
  name: string | null
  type: string | null
  created: string | null
}

export interface CandidateInterviewResponse {
  interview_id: string | null
  name: string | null
  notes: string | null
  rating: number | null
  start_datetime: string | null
  end_datetime: string | null
  created: string | null
  updated: string | null
  user_id: string | null
  files: CandidateInterviewFileResponse[]
}

export interface CandidateInterviewFileResponse {
  file_id: string | null
  name: string | null
}

export interface CandidatePipelineResponse {
  pipeline_id: string | null
  user_id: string | null
  category_id: string | null
  project_id: string | null
  created: string | null
  updated: string | null
}

export interface CandidatePhoneResponse {
  kind: string | null
  prefix: string | null
  number: string | null
}


