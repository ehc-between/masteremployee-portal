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


/**
 *
 * Endpoint definitions
 * COR-TMP
 * Templates
 *
 */

export interface TemplateResponse {
  template_id: number;
  template_name: string;
  description: string;
  private: boolean;
  questions: QuestionResponse[];
  access_relations: TemplateAccessRelationResponse[];
  created_by: UserResponse | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface TemplateAccessRelationResponse {
  relation_id: number;
  user_id: string;
  template_id: number;
  access_level: AssistantAccessLevelResponse;
}

export interface QuestionResponse {
  question_id: number;
  template_id: string;
  question: string;
  context: string;
  question_answer_type_id: number;
  question_answer_type_name: string[];
  index: number;
  display_name: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface QuestionAnswerTypeResponse {
  question_answer_type_id: string;
  question_answer_type_name: string;
}

export interface AssistantResponse {
  assistant_id: string;
  assistant_name: string;
  qna: Boolean;
  assistant_type_id: string;
  assistant_type_name: string;
  assistant_model_id: string;
  instructions: string;
  model_id: string;
  model: string
  reference: string;
  assistant_group_description: string;
  assistant_group_id: number;
  files: FileResponse[];
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface AssistantGroupResponse {

  assistant_group_id: string;
  assistant_group_name: string;
  reference: string;
  assistant_group_description: string;
  assistants: AssistantResponse[];
  access_relations: AssistantAccessRelationResponse[];
  private: boolean;
  template_missing_data_fields: TemplateMissingDataFieldResponse[];
  created_by: UserResponse | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface AssistantAccessRelationResponse {
  relation_id: number;
  user_id: string;
  assistant_group_id: number;
  access_level: AssistantAccessLevelResponse;
}

export interface AssistantAccessLevelResponse {
  access_level_id: number;
  access_level_name: string;
  access_level_description: string;
}

export interface QnaAssistantResponse {
  assistant_id: string;
  assistant_name: string;
  qna: Boolean;
  assistant_type_id: string;
  assistant_type_name: string;
  instructions: string;
  model_id: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface AssistantTypeResponse {
  assistant_type_id: string;
  assistant_type_name: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface AssistantModelResponse {
  assistant_model_id: string;
  assistant_type_id: string;
  assistant_type_name: string;
  instructions: string;
  model: string;
  temperature: string;
  top_p: string;
  web_search: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface ThreadResponse {
  thread_id: string;
  template_id: string;
  template_name: string;
  assistant_id: string;
  topic: string;
  assistant: AssistantResponse;
  messages: MessageResponse[];
  vector_store: VectorStoreResponse;
  thread_instructions: string;
  rag: number;
  model: string;
  web_search: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface VectorStoreResponse {
  vector_store_id: string;
  assistant_id: string;
  files: FileResponse[];
  created_by: UserResponse | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface MessageResponse {
  message_id?: string;
  thread_id?: string;
  assistant_id?: string;
  content: string;
  role: string;
  citations?: CitationResponse[];
  groupedCitations?: GroupedCitation[];
  attachment?: FileResponse;
  display_message: number
  question_id?: number;
  question?: QuestionResponse;
  created_at?: Date;
}

export interface GroupedCitation {
  cited_file_name: string;
  cited_file_id: string;
  indexes: number[];
}

export interface CitationResponse {
  citation_id: number;
  message_id: string;
  index: number;
  chunks: chunkResponse[];
  cited_file_id: string;
  cited_file_name: string;
  created_at: Date;
  deleted_at: Date | null;
}

export interface chunkResponse {
  chunk_id: number;
  text: string;
  score: number;
  created_at: Date;
  deleted_at: Date | null;
}

export interface FileResponse {
  file_id: number;
  ai_file_id: string;
  file_name: string;
  file_extension: string;
  file_size: number;
  ocr: boolean;
  s3: boolean;
  supplementary_data: boolean;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  sync_status?: string;
}

export interface RunResponse {
  run_id: string;
  thread_id: string;
  assistant_id: string;
  status: string;
  created_at: Date;
  completed_at: Date | null;
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

export interface PersonalAssistantThreadResponse {
  user_id: string;
  personal_assistant_thread_id: string;
  topic: string;
  messages: MessageResponse[];
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface InvitationTokenVerificationResponse {
  status_id: number;
  status_name: string;
}

export interface fileObjectResponse {
  file_url: string;
}

export interface ImproveQuestionResponse {
  improved_question: string;
}

export interface MessagesStatsResponse {
  total_num_questions: number;
  total_num_questions_last_7_days: number;
  total_num_questions_last_30_days: number;
}

export interface UserAssistantGroupFavoriteResponse {
  entity_id: string
  assistant_group: AssistantGroupResponse
}

export interface WordBankResponse {
  entry_id: string;
  description: string;
  word: string;
  explanation: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface TokenStatsResponse {
  total_token_usage: number;
  total_input_token_usage: number;
  total_response_token_usage: number;
  total_token_usage_last_7_days: number;
  total_input_token_usage_last_7_days: number;
  total_response_token_usage_last_7_days: number;
  total_token_usage_last_30_days: number;
  total_input_token_usage_last_30_days: number;
  total_response_token_usage_last_30_days: number;
}


export interface ReportResponse {
  report_id: string;
  report_name: string;
  assistant_id: string;
  thread_id: string;
  template_id: string;
  status: number;
  progress_percentage: number;
  // thread: ThreadResponse;
  assistant: AssistantResponse;
  template_name: string;
  created_by: UserResponse | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface DefaultFileResponse {
  file_id: number;
  file_name: string;
  file_extension: string;
  file_size: number;
  created_by: UserResponse | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  loading?: boolean;
}

export interface DefaultFileGroupResponse {
  default_file_group_id: string;
  default_file_group_name: string;
  default_file_group_description: string;
  files: DefaultFileResponse[];
  created_by: UserResponse | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface TemplateMissingDataFieldResponse {
  field_id: number;
  question: QuestionResponse;
  value: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface TemplateMissingDataFieldTestResponse {
  value: string;
}
