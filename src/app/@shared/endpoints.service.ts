import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { JwtService } from "../@core/services/jwt.service";
import { environment } from "../../environments/environment";
import {Injectable, Injector, NgZone} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { convertPayloadDatetime } from "../@core/utils/utils.service";
import { convertResponseDatetime } from "../@core/utils/utils.service";
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, take } from 'rxjs/operators';
import {jwtDecode} from "jwt-decode";
import {AuthService} from "../@core/services/auth.service";
import {
  COR_AII_0,
  COR_AII_1,
  COR_AII_10,
  COR_AII_11,
  COR_AII_12,
  COR_AII_13,
  COR_AII_14,
  COR_AII_15,
  COR_AII_16,
  COR_AII_17,
  COR_AII_18,
  COR_AII_19,
  COR_AII_2,
  COR_AII_20,
  COR_AII_21,
  COR_AII_22,
  COR_AII_23,
  COR_AII_24,
  COR_AII_25,
  COR_AII_29,
  COR_AII_3, COR_AII_31, COR_AII_32, COR_AII_33, COR_AII_34, COR_AII_35, COR_AII_36, COR_AII_37, COR_AII_38, COR_AII_39,
  COR_AII_4, COR_AII_40, COR_AII_42, COR_AII_43, COR_AII_44, COR_AII_45, COR_AII_46, COR_AII_47, COR_AII_48, COR_AII_49,
  COR_AII_5, COR_AII_50, COR_AII_51, COR_AII_52, COR_AII_53, COR_AII_54, COR_AII_55, COR_AII_56, COR_AII_57,
  COR_AII_6,
  COR_AII_7,
  COR_AII_8,
  COR_AII_9,
  COR_COY_0,
  COR_COY_1,
  COR_COY_2,
  COR_COY_3,
  COR_COY_4, COR_COY_5, COR_COY_6, COR_COY_7, COR_COY_8,
  COR_SER_1,
  COR_TMP_0,
  COR_TMP_1,
  COR_TMP_10,
  COR_TMP_11,
  COR_TMP_12,
  COR_TMP_2,
  COR_TMP_4,
  COR_TMP_5,
  COR_TMP_6,
  COR_TMP_7,
  COR_TMP_8,
  COR_TMP_9,
  USM_ENT_0,
  USM_ENT_2,
  USM_ENT_3,
  USM_USR_0,
  USM_USR_1,
  USM_USR_13,
  USM_USR_14,
  USM_USR_16,
  USM_USR_18,
  USM_USR_19,
  USM_USR_22,
  USM_USR_25,
  USM_USR_26, USM_USR_27,
  USM_USR_3,
  USM_USR_6
} from "./models/input.module";
import {
  DeleteResponse,
  GetResponse,
  PaginationResponse,
  PostResponse,
  PutResponse
} from "./models/global/response-wrapper.service";
import {
  AssistantAccessRelationResponse,
  AssistantGroupResponse, AssistantModelResponse,
  AssistantResponse,
  CompanyResponse, DefaultFileGroupResponse, DefaultFileResponse,
  fileObjectResponse,
  FileResponse, ImproveQuestionResponse,
  InvitationTokenVerificationResponse,
  LoginResponse,
  MessageResponse, MessagesStatsResponse, PersonalAssistantThreadResponse,
  QnaAssistantResponse,
  QuestionAnswerTypeResponse, ReportResponse,
  RunResponse, TemplateAccessRelationResponse, TemplateMissingDataFieldResponse, TemplateMissingDataFieldTestResponse,
  TemplateResponse,
  ThreadResponse, TokenStatsResponse, UserAssistantGroupFavoriteResponse,
  UserEntityRelationWithoutUserDataResponse,
  UserEntityRelationWithUserDataResponse,
  UserOptionsResponse,
  UserResponse, WordBankResponse
} from "./models/response.module";
export interface EndpointOptions {
  auth?: boolean,
  content_type?: string | null,
  platform?: boolean,
  raiseErrorToast?: boolean
}

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  constructor(private http: HttpClient,
              private jwtService: JwtService,
              private translateService: TranslateService,
              private injector: Injector,
              private zone: NgZone
  ) {}


  private refreshTokenSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private refreshTokenInProgress = false;

  refreshToken(): Observable<string> {
    const authService = this.injector.get(AuthService);

    if (this.refreshTokenInProgress) {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1)
      );
    }

    this.refreshTokenInProgress = true;
    this.refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((data) => {
        const newToken = data.access_token;
        this.refreshTokenSubject.next(newToken);
        return of(newToken); // Return the new token
      }),
      catchError((error) => {
        // Handle token refresh error here
        return throwError(error);
      }),
      finalize(() => {
        this.refreshTokenInProgress = false;
      })
    );
  }

  /**
  *
  * Default HTTP functions
  *
  */

  private handleResponse<T>(observable: Observable<T>): Observable<T> {
  return observable.pipe(
    map((res) => {
      if (res) {
        convertResponseDatetime(res);
      }
      return res;
    })
  )};

  private handlePayload(data: any): any {
    if (data) {
      data = convertPayloadDatetime(data);
    }
    return data;
  }

  getDefaultHeaders(auth: boolean = true, content_type: string | null = 'application/json', platform: boolean = false): Observable<HttpHeaders> {
    // Accept-Language
    let headers = new HttpHeaders({
      'Accept-Language': this.translateService.currentLang ? this.translateService.currentLang : 'en',
    });

    // Content-Type
    if (content_type != null) {
      headers = headers.append('Content-Type', content_type);
    }

    // Platform
    if (platform) {
      headers = headers.append('Platform', 'core');
    }

    // Authorization
    if (auth) {
      if (this.jwtService.getAccessToken() == null || this.jwtService.getAccessToken() == undefined || this.jwtService.getAccessToken() == '') {
        throw new Error('No access token found')
      }
      const decodedToken: {[key: string]: string | number} = jwtDecode(this.jwtService.getAccessToken());
      const currentTimestamp = Math.floor(Date.now() / 1000); // Get current Unix timestamp in seconds
      const tokenExpiration = decodedToken["exp"];

      if (tokenExpiration && tokenExpiration < currentTimestamp.toString()) {
        return this.refreshToken().pipe(
          switchMap((newToken) => {
            headers = headers.append('Authorization', 'Bearer ' + newToken);
            return of(headers);
          })
        );
      } else {
        headers = headers.append('Authorization', 'Bearer ' + this.jwtService.getAccessToken());
        return of(headers);
      }
    } else {
      return of(headers);
    }
  }

  // post<R>(url: string, payload: any, auth = true, content_type?: string | null, platform: boolean = false, raiseErrorToast: boolean = true): Observable<R> {
  post<R>(url: string, payload: any, options: EndpointOptions): Observable<R> {
    return this.getDefaultHeaders(options.auth, options.content_type, options.platform).pipe(
      switchMap((headers) => {
        payload = this.handlePayload(payload);
        return this.http.post<R>(url, payload, {headers: headers}).pipe(
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse && options.raiseErrorToast) {
              // this.toastService.errorToast(error.error.asset_id);
            }
            return throwError(error);
          }),
          switchMap((response: R) => {
            return this.handleResponse<R>(of(response));
          })
        );
      })
    );
  }

  put<R>(url: string, payload: any, options: EndpointOptions): Observable<R> {
    return this.getDefaultHeaders(options.auth, options.content_type, options.platform).pipe(
      switchMap((headers) => {
        payload = this.handlePayload(payload);
        return this.http.put<R>(url, payload, {headers: headers}).pipe(
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse && options.raiseErrorToast) {
              // this.toastService.errorToast(error.error.asset_id);
            }
            return throwError(error);
          }),
          switchMap((response: R) => {
            return this.handleResponse<R>(of(response));
          })
        );
      })
    );
  }

  patch<R>(url: string, payload: any, options: EndpointOptions): Observable<R> {
    return this.getDefaultHeaders(options.auth, options.content_type, options.platform).pipe(
      switchMap((headers) => {
        payload = this.handlePayload(payload);
        return this.http.patch<R>(url, payload, {headers: headers}).pipe(
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse && options.raiseErrorToast) {
              // this.toastService.errorToast(error.error.asset_id);
            }
            return throwError(error);
          }),
          switchMap((response: R) => {
            return this.handleResponse<R>(of(response));
          })
        );
      })
    );
  }

  get<R>(url: string, queryParams: { [key: string]: any } | undefined, options: EndpointOptions): Observable<R> {
    return this.getDefaultHeaders(options.auth, options.content_type, options.platform).pipe(
      switchMap((headers) => {
        queryParams = this.handlePayload(queryParams);
        let httpParams = new HttpParams();
        if (queryParams) {
          Object.keys(queryParams).forEach(key => {
            const value = queryParams?.[key];
            if (value !== undefined && value !== null) {
              httpParams = httpParams.set(key, value);
            }
          });
        }

        return this.http.get<R>(url, { headers: headers, params: httpParams }).pipe(
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse && options.raiseErrorToast) {
              // this.toastService.errorToast(error.error.asset_id);
            }
            return throwError(error);
          }),
          switchMap((response: R) => {
            return this.handleResponse<R>(of(response));
          })
        );
      })
    );
  }

  delete<R>(url: string, queryParams: { [key: string]: any } | undefined, options: EndpointOptions): Observable<R> {
    return this.getDefaultHeaders(options.auth, options.content_type, options.platform).pipe(
      switchMap((headers) => {
        queryParams = this.handlePayload(queryParams);
        let httpParams = new HttpParams();
        if (queryParams) {
          Object.keys(queryParams).forEach(key => {
            const value = queryParams?.[key];
            if (value !== undefined && value !== null) {
              httpParams = httpParams.set(key, value);
            }
          });
        }
        return this.http.delete<R>(url, { headers: headers, params: httpParams }).pipe(
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse && options.raiseErrorToast) {
              // this.toastService.errorToast(error.error.asset_id);
            }
            return throwError(error);
          }),
          switchMap((response: R) => {
            return this.handleResponse<R>(of(response));
          })
        );
      })
    );
  }


  /**
  *
  * Endpoint definitions
   * USM
   * Users
  *
  */

  usm_aut_0(payload: USM_USR_0, raiseErrorToast: boolean = true): Observable<LoginResponse> {
    let options: EndpointOptions = {
      auth: false,
      content_type: null,
      platform: true,
      raiseErrorToast: raiseErrorToast
    }
    return this.post(environment.coreApiUrl + 'users/login', payload, options)
  }

  usm_aut_1(raiseErrorToast: boolean = true): Observable<LoginResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': this.translateService.currentLang,
      'Authorization': 'Bearer ' + this.jwtService.getRefreshToken(),
      'Platform': 'core'
    })
    let options = {headers: headers}
    return this.http.post<LoginResponse>(environment.coreApiUrl + 'users/refresh-token', {}, options).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && raiseErrorToast) {
          // this.toastService.errorToast(error.error.asset_id);
        }
        return throwError(error);
      }),
    );
  }

  usm_usr_1(raiseErrorToast: boolean = true): Observable<GetResponse<UserResponse>>  {
    return this.get(environment.coreApiUrl + 'users/', undefined, {raiseErrorToast: raiseErrorToast})
  }

  usm_usr_3(payload: USM_USR_3, raiseErrorToast: boolean = true): Observable<PutResponse<UserResponse>> {
    return this.put(environment.coreApiUrl + 'users/', payload, {raiseErrorToast: raiseErrorToast})
  }

  usm_usr_6(payload: USM_USR_6, raiseErrorToast: boolean = true): Observable<PostResponse<UserEntityRelationWithUserDataResponse>> {
    return this.post(environment.coreApiUrl + 'users/invite/to-entity', payload, {raiseErrorToast: raiseErrorToast})
  }

  usm_usr_13(payload: USM_USR_13, raiseErrorToast: boolean = true): Observable<GetResponse<null>> {
    let options: EndpointOptions = {
      auth: false,
      raiseErrorToast: raiseErrorToast
    }
    return this.post(environment.coreApiUrl + 'users/reset-password/initiate', payload, options)
  }

  usm_usr_14(payload: USM_USR_14, raiseErrorToast: boolean = true): Observable<PostResponse<null>> {
    let options: EndpointOptions = {
      auth: false,
      raiseErrorToast: raiseErrorToast
    }
    return this.post(environment.coreApiUrl + 'users/reset-password/token', payload, options)
  }

  usm_usr_16(payload: USM_USR_16, raiseErrorToast: boolean = true): Observable<PutResponse<UserResponse>> {
    return this.getDefaultHeaders(true, null).pipe(
      switchMap((headers) => {
        // Initialize HttpParams with company_id
        let httpParams = new HttpParams()
        // FormData instance
        let formData = new FormData();
        formData.append('image', payload.image);

        // Update headers to be compatible with FormData
        const options = { headers: headers, params: httpParams };

        return this.http.put<PutResponse<UserResponse>>(environment.coreApiUrl + 'users/profile-image', formData, options).pipe(
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse && raiseErrorToast) {
            }
            return throwError(error);
          }),
        );
      })
    );
  }

  usm_usr_21(payload: any, raiseErrorToast: boolean = true): Observable<GetResponse<UserOptionsResponse>> {
    return this.get(environment.coreApiUrl + 'users/options', payload, {raiseErrorToast: raiseErrorToast})
  }

  usm_usr_18(payload: USM_USR_18, raiseErrorToast: boolean = true): Observable<PostResponse<null>> {
    return this.post(environment.coreApiUrl + 'users/reset-password', payload, {raiseErrorToast: raiseErrorToast})
  }

  usm_usr_19(payload: USM_USR_19, raiseErrorToast: boolean = true): Observable<LoginResponse> {
    let options: EndpointOptions = {
      auth: false,
      raiseErrorToast: raiseErrorToast
    }
    return this.post(environment.coreApiUrl + 'users/register/invitation-token', payload, options)
  }

  usm_usr_22(payload: USM_USR_22, raiseErrorToast: boolean = true): Observable<PutResponse<UserOptionsResponse>> {
    return this.put(environment.coreApiUrl + 'users/options', payload, {raiseErrorToast: raiseErrorToast})
  }

  usm_usr_25(payload: USM_USR_25, raiseErrorToast: boolean = true): Observable<PostResponse<InvitationTokenVerificationResponse>> {
    let options: EndpointOptions = {
      auth: false,
      raiseErrorToast: raiseErrorToast
    }
    return this.post(environment.coreApiUrl + 'users/register/invitation-token/verify', payload, options)
  }

  usm_usr_26(payload: USM_USR_26, raiseErrorToast: boolean = true): Observable<GetResponse<UserAssistantGroupFavoriteResponse[]>> {
    return this.get(environment.coreApiUrl + 'users/user/assistant/favourite', payload, {raiseErrorToast: raiseErrorToast})
  }

  usm_usr_27(payload: USM_USR_27, raiseErrorToast: boolean = true): Observable<PostResponse<UserAssistantGroupFavoriteResponse>> {
    return this.post(environment.coreApiUrl + 'users/user/assistant/favourite', payload, {raiseErrorToast: raiseErrorToast})
  }

  usm_usr_28(payload: USM_USR_27, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'users/user/assistant/favourite', payload, {raiseErrorToast: raiseErrorToast})
  }

  usm_ent_0(payload: USM_ENT_0, raiseErrorToast: boolean = true): Observable<GetResponse<UserEntityRelationWithoutUserDataResponse[]>> {
    return this.get(environment.coreApiUrl + 'users/access', payload, {raiseErrorToast: raiseErrorToast})
  }

  usm_ent_2(payload: USM_ENT_2, raiseErrorToast: boolean = true): Observable<PutResponse<UserEntityRelationWithUserDataResponse>> {
    return this.patch(environment.coreApiUrl + 'users/access', payload, {raiseErrorToast: raiseErrorToast})
  }

  usm_ent_3(payload: USM_ENT_3, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'users/access', payload, {raiseErrorToast: raiseErrorToast})
  }
  // usm_usr_2(payload: USM_USR_2, raiseErrorToast: boolean = true): Observable<PostResponse<UserResponse>> {
  //   return this.post(environment.coreApiUrl + 'users/', payload, {raiseErrorToast: raiseErrorToast})
  // }
  //
  // usm_usr_3(raiseErrorToast: boolean = true): Observable<PostResponse<UserResponse>>  {
  //   return this.get(environment.coreApiUrl + 'users/', undefined, {raiseErrorToast: raiseErrorToast})
  // }


  cor_coy_0(payload: COR_COY_0, raiseErrorToast: boolean = true): Observable<GetResponse<CompanyResponse>> {
    return this.get(environment.coreApiUrl + 'companies/', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_coy_1(payload: COR_COY_1, raiseErrorToast: boolean = true): Observable<PostResponse<CompanyResponse>> {
    return this.post(environment.coreApiUrl + 'companies/', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_coy_2(payload: COR_COY_2, raiseErrorToast: boolean = true): Observable<PutResponse<CompanyResponse>> {
    return this.put(environment.coreApiUrl + 'companies/', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_coy_3(payload: COR_COY_3, raiseErrorToast: boolean = true): Observable<GetResponse<UserEntityRelationWithUserDataResponse[]>> {
    return this.get(environment.coreApiUrl + 'companies/employees', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_coy_4(payload: COR_COY_4, raiseErrorToast: boolean = true): Observable<PaginationResponse<CompanyResponse[]>> {
    return this.get(environment.coreApiUrl + 'companies/all', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_coy_5(payload: COR_COY_5, raiseErrorToast: boolean = true): Observable<GetResponse<WordBankResponse[]>> {
    return this.get(environment.coreApiUrl + 'companies/word-bank', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_coy_6(payload: COR_COY_6, raiseErrorToast: boolean = true): Observable<PostResponse<WordBankResponse[]>> {
    return this.post(environment.coreApiUrl + 'companies/word-bank', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_coy_7(payload: COR_COY_7, raiseErrorToast: boolean = true): Observable<PutResponse<WordBankResponse[]>> {
    return this.put(environment.coreApiUrl + 'companies/word-bank', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_coy_8(payload: COR_COY_8, raiseErrorToast: boolean = true): Observable<GetResponse<WordBankResponse[]>> {
    return this.delete(environment.coreApiUrl + 'companies/word-bank', payload, {raiseErrorToast: raiseErrorToast})
  }


  /**
   *
   * Endpoint definitions
   * COR-TMP
   * Templates
   *
   */

  cor_tmp_0(payload: COR_TMP_0, raiseErrorToast: boolean = true): Observable<GetResponse<TemplateResponse>>  {
    return this.get(environment.coreApiUrl + 'templates/', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_tmp_1(payload: COR_TMP_1, raiseErrorToast: boolean = true): Observable<PostResponse<TemplateResponse>> {
    return this.post(environment.coreApiUrl + 'templates/', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_tmp_2(payload: COR_TMP_2, raiseErrorToast: boolean = true): Observable<PutResponse<TemplateResponse>>  {
    return this.put(environment.coreApiUrl + 'templates/', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_tmp_4(payload: COR_TMP_4, raiseErrorToast: boolean = true): Observable<PostResponse<TemplateResponse>> {
    return this.post(environment.coreApiUrl + 'templates/questions', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_tmp_5(payload: COR_TMP_5, raiseErrorToast: boolean = true): Observable<PutResponse<TemplateResponse>> {
    return this.put(environment.coreApiUrl + 'templates/questions', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_tmp_6(payload: COR_TMP_6, raiseErrorToast: boolean = true): Observable<PaginationResponse<TemplateResponse[]>> {
    return this.get(environment.coreApiUrl + 'templates/all', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_tmp_7(payload: COR_TMP_7, raiseErrorToast: boolean = true): Observable<GetResponse<QuestionAnswerTypeResponse[]>> {
    return this.get(environment.coreApiUrl + 'templates/questions/answer', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_tmp_8(payload: COR_TMP_8, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'templates/', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_tmp_9(payload: COR_TMP_9, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'templates/questions', payload, {raiseErrorToast: raiseErrorToast})
  }


  /**
   *
   * Endpoint definitions
   * COR-AII
   * AI Assistants
   *
   */
  cor_aii_0(payload: COR_AII_0, raiseErrorToast: boolean = true): Observable<GetResponse<AssistantResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/assistants', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_1(payload: COR_AII_1, raiseErrorToast: boolean = true): Observable<PostResponse<AssistantResponse>> {
    return this.post(environment.coreApiUrl + 'ai/assistants', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_2(payload: COR_AII_2, raiseErrorToast: boolean = true): Observable<PutResponse<AssistantResponse>> {
    return this.put(environment.coreApiUrl + 'ai/assistants', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_3(payload: COR_AII_3, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/assistants', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_4(payload: COR_AII_4, raiseErrorToast: boolean = true): Observable<GetResponse<AssistantModelResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/assistants/models', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_5(payload: COR_AII_5, raiseErrorToast: boolean = true): Observable<PaginationResponse<ThreadResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/threads', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_6(payload: COR_AII_6, raiseErrorToast: boolean = true): Observable<PostResponse<ThreadResponse>> {
    return this.post(environment.coreApiUrl + 'ai/threads', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_7(payload: COR_AII_7, raiseErrorToast: boolean = true): Observable<PutResponse<ThreadResponse>> {
    return this.put(environment.coreApiUrl + 'ai/threads', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_8(payload: COR_AII_8, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/threads', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_9(payload: COR_AII_9, raiseErrorToast: boolean = true): Observable<GetResponse<FileResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/files', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_10(payload: COR_AII_10, raiseErrorToast: boolean = true): Observable<PostResponse<FileResponse>> {
    return this.getDefaultHeaders(true, null).pipe(
      switchMap((headers) => {
        // Initialize HttpParams with company_id
        let httpParams = new HttpParams().set('company_id', payload.company_id);

        // Conditionally add assistant_id if it exists
        if (payload.assistant_id) {
          httpParams = httpParams.set('assistant_id', payload.assistant_id);
        }

        // FormData instance
        let formData = new FormData();
        formData.append('file', payload.file);
        formData.append('company_id', payload.company_id); // Append additional fields if needed
        if (payload.assistant_id) {
          formData.append('assistant_id', payload.assistant_id); // Append additional fields if needed
        }
        if (payload.assistant_group_id) {
          formData.append('assistant_group_id', payload.assistant_group_id); // Append additional fields if needed
        }
        if (payload.supplementary_data) {
          formData.append('supplementary_data', payload.supplementary_data.toString()); // Append additional fields if needed
        }

        // Update headers to be compatible with FormData
        const options = { headers: headers, params: httpParams };

        return this.http.post<PostResponse<FileResponse>>(environment.coreApiUrl + 'ai/files', formData, options).pipe(
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse && raiseErrorToast) {
            }
            return throwError(error);
          }),
        );
      })
    );
  }

  cor_aii_11(payload: COR_AII_11, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/files', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_12(payload: COR_AII_12, raiseErrorToast: boolean = true): Observable<GetResponse<RunResponse>> {
    return this.post(environment.coreApiUrl + 'ai/runs', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_13(payload: COR_AII_13, raiseErrorToast: boolean = true): Observable<GetResponse<MessageResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/messages', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_14(payload: COR_AII_14, raiseErrorToast: boolean = true): Observable<PostResponse<MessageResponse>> {
    return this.post(environment.coreApiUrl + 'ai/messages', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_15(payload: COR_AII_15, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/messages', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_16(payload: COR_AII_16, raiseErrorToast: boolean = true): Observable<GetResponse<AssistantResponse>> {
    return this.get(environment.coreApiUrl + 'ai/qna/assistants', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_17(payload: COR_AII_17, raiseErrorToast: boolean = true): Observable<PaginationResponse<AssistantGroupResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/assistants/groups', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_18(payload: COR_AII_18, raiseErrorToast: boolean = true): Observable<PostResponse<AssistantGroupResponse>> {
    return this.post(environment.coreApiUrl + 'ai/assistants/groups', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_19(payload: COR_AII_19, raiseErrorToast: boolean = true): Observable<PutResponse<AssistantGroupResponse>> {
    return this.put(environment.coreApiUrl + 'ai/assistants/groups', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_20(payload: COR_AII_20, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/assistants/groups', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_21(payload: COR_AII_21, raiseErrorToast: boolean = true): Observable<PostResponse<AssistantAccessRelationResponse>> {
    return this.post(environment.coreApiUrl + 'ai/assistants/groups/access', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_22(payload: COR_AII_22, raiseErrorToast: boolean = true): Observable<PutResponse<AssistantAccessRelationResponse>> {
    return this.put(environment.coreApiUrl + 'ai/assistants/groups/access', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_23(payload: COR_AII_23, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/assistants/groups/access', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_24(payload: COR_AII_24, raiseErrorToast: boolean = true): Observable<GetResponse<fileObjectResponse>> {
    return this.get(environment.coreApiUrl + 'ai/files/download', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_25(payload: COR_AII_25, raiseErrorToast: boolean = true): Observable<GetResponse<AssistantModelResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/assistant/models', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_26(payload: any, raiseErrorToast: boolean = true): Observable<PostResponse<AssistantModelResponse>> {
    return this.post(environment.coreApiUrl + 'ai/assistant/models', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_27(payload: any, raiseErrorToast: boolean = true): Observable<PutResponse<AssistantModelResponse>> {
    return this.put(environment.coreApiUrl + 'ai/assistant/models', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_28(payload: any, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/assistant/models', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_29(payload: COR_AII_29, raiseErrorToast: boolean = true): Observable<GetResponse<ImproveQuestionResponse>> {
    return this.get(environment.coreApiUrl + 'ai/improve/question', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_30(raiseErrorToast: boolean = true): Observable<GetResponse<AssistantModelResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/assistants/types', undefined, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_31(payload: COR_AII_31, raiseErrorToast: boolean = true): Observable<GetResponse<PersonalAssistantThreadResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/personal-assistant', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_32(payload: COR_AII_32, raiseErrorToast: boolean = true): Observable<PostResponse<PersonalAssistantThreadResponse>> {
    return this.post(environment.coreApiUrl + 'ai/personal-assistant', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_33(payload: COR_AII_33, raiseErrorToast: boolean = true): Observable<PutResponse<PersonalAssistantThreadResponse>> {
    return this.put(environment.coreApiUrl + 'ai/personal-assistant', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_34(payload: COR_AII_34, raiseErrorToast: boolean = true): Observable<PostResponse<MessageResponse>> {
    return this.post(environment.coreApiUrl + 'ai/personal-assistant/message', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_35(payload: COR_AII_35, raiseErrorToast: boolean = true): Observable<any> {
    // return this.get(environment.coreApiUrl + 'ai/personal-assistant/run', payload, {raiseErrorToast: raiseErrorToast})
    return this.getPATStreamedResponse(payload)
  }

  cor_aii_36(payload: COR_AII_36, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/personal-assistant', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_37(payload: COR_AII_37, raiseErrorToast: boolean = true): Observable<PostResponse<MessageResponse>> {
    return this.post(environment.coreApiUrl + 'ai/personal-assistant/assistant-message', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_39(payload: COR_AII_39, raiseErrorToast: boolean = true): Observable<GetResponse<ReportResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/reports', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_40(payload: COR_AII_40, raiseErrorToast: boolean = true): any {
    return this.post(environment.coreApiUrl + 'ai/reports', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_42(payload: COR_AII_42, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/reports', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_43(payload: COR_AII_43, raiseErrorToast: boolean = true): Observable<GetResponse<DefaultFileGroupResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/default/file/groups', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_44(payload: COR_AII_44, raiseErrorToast: boolean = true): Observable<PostResponse<DefaultFileGroupResponse>> {
    return this.post(environment.coreApiUrl + 'ai/default/file/groups', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_45(payload: COR_AII_45, raiseErrorToast: boolean = true): Observable<PutResponse<DefaultFileGroupResponse>> {
    return this.put(environment.coreApiUrl + 'ai/default/file/groups', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_46(payload: COR_AII_46, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/default/file/groups', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_47(payload: COR_AII_47, raiseErrorToast: boolean = true): Observable<PostResponse<DefaultFileResponse>> {
    return this.getDefaultHeaders(true, null).pipe(
      switchMap((headers) => {
        // Initialize HttpParams with company_id
        let httpParams = new HttpParams().set('company_id', payload.company_id);

        // Conditionally add assistant_id if it exists
        if (payload.default_file_group_id) {
          httpParams = httpParams.set('default_file_group_id', payload.default_file_group_id);
        }

        // FormData instance
        let formData = new FormData();
        formData.append('file', payload.file);
        formData.append('company_id', payload.company_id); // Append additional fields if needed
        if (payload.default_file_group_id) {
          formData.append('default_file_group_id', payload.default_file_group_id); // Append additional fields if needed
        }

        // Update headers to be compatible with FormData
        const options = { headers: headers, params: httpParams };

        return this.http.post<PostResponse<DefaultFileResponse>>(environment.coreApiUrl + 'ai/default/file', formData, options).pipe(
          catchError((error: any) => {
            if (error instanceof HttpErrorResponse && raiseErrorToast) {
            }
            return throwError(error);
          }),
        );
      })
    );
  }

  cor_aii_48(payload: COR_AII_48, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/default/file', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_49(payload: COR_AII_49, raiseErrorToast: boolean = true): Observable<PostResponse<ThreadResponse>> {
    return this.post(environment.coreApiUrl + 'ai/threads/files', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_50(payload: COR_AII_50, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/threads/files', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_51(payload: COR_AII_51, raiseErrorToast: boolean = true): Observable<PutResponse<TemplateMissingDataFieldResponse[]>> {
    return this.put(environment.coreApiUrl + 'ai/templates/missing/data/fields', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_52(payload: COR_AII_52, raiseErrorToast: boolean = true): Observable<PostResponse<TemplateMissingDataFieldResponse[]>> {
    return this.post(environment.coreApiUrl + 'ai/templates/missing/data/fields', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_53(payload: COR_AII_53, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'ai/templates/missing/data/fields', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_54(payload: COR_AII_54, raiseErrorToast: boolean = true): Observable<PostResponse<TemplateResponse>> {
    return this.post(environment.coreApiUrl + 'ai/templates/ai/auto/generate', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_55(payload: COR_AII_55, raiseErrorToast: boolean = true): Observable<GetResponse<TemplateMissingDataFieldResponse[]>> {
    return this.get(environment.coreApiUrl + 'ai/templates/missing/data/fields', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_56(payload: COR_AII_56, raiseErrorToast: boolean = true): Observable<PostResponse<TemplateMissingDataFieldTestResponse>> {
    return this.post(environment.coreApiUrl + 'ai/templates/missing/data/fields/test', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_aii_57(payload: COR_AII_57, raiseErrorToast: boolean = true): Observable<PutResponse<ThreadResponse>> {
    return this.put(environment.coreApiUrl + 'ai/threads/settings', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_tmp_10(payload: COR_TMP_10, raiseErrorToast: boolean = true): Observable<PostResponse<TemplateAccessRelationResponse>> {
    return this.post(environment.coreApiUrl + 'templates/access', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_tmp_11(payload: COR_TMP_11, raiseErrorToast: boolean = true): Observable<PutResponse<TemplateAccessRelationResponse>> {
    return this.put(environment.coreApiUrl + 'templates/access', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_tmp_12(payload: COR_TMP_12, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'templates/access', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_ser_1(payload: COR_SER_1, raiseErrorToast: boolean = true): Observable<GetResponse<MessagesStatsResponse>> {
    return this.get(environment.coreApiUrl + 'services/questions/stats', payload, {raiseErrorToast: raiseErrorToast})
  }

  cor_ser_2(raiseErrorToast: boolean = true): Observable<GetResponse<TokenStatsResponse>> {
    return this.get(environment.coreApiUrl + 'services/token/stats', undefined, {raiseErrorToast: raiseErrorToast})
  }

  getPATStreamedResponse(payload: COR_AII_35): Observable<string> {
    // Get the authorization token
    const token = this.jwtService.getAccessToken();

    // Construct the full URL without passing token in the URL
    const eventSourceUrl = `${environment.coreApiUrl + 'ai/personal-assistant/run'}?personal_assistant_thread_id=${payload.personal_assistant_thread_id}`;

    return new Observable(observer => {
      fetch(eventSourceUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'text/event-stream'
        }
      })
        .then(response => {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder("utf-8");

          const readStream: any = () => {
            return reader?.read().then(({ done, value }) => {
              if (done) {
                observer.complete();
                return;
              }
              this.zone.run(() => {
                // Log the size of the value
                console.log('Read value size:', value?.length);
                // Decode and emit the data chunk
                const chunk = decoder.decode(value, { stream: true });
                observer.next(chunk);
                console.log('Received chunk', chunk);
              });
              return readStream();
            });
          };

          readStream();
        })
        .catch(error => {
          this.zone.run(() => observer.error(error));
        });

      // Clean up on unsubscribe
      return () => {
        // If needed, abort the fetch request here
      };
    });
  }


  getAssistantStreamedResponse(payload: COR_AII_38): Observable<string> {
    // Get the authorization token
    const token = this.jwtService.getAccessToken();

    // Construct the full URL without passing token in the URL
    const eventSourceUrl = `${environment.coreApiUrl + 'ai/runs/stream'}`;

    return new Observable(observer => {
      fetch(eventSourceUrl,{
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'text/event-stream',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder("utf-8");

          const readStream: any = () => {
            return reader?.read().then(({ done, value }) => {
              if (done) {
                observer.complete();
                return;
              }
              this.zone.run(() => {
                // Log the size of the value
                console.log('Read value size:', value?.length);
                // Decode and emit the data chunk
                const chunk = decoder.decode(value, { stream: true });
                observer.next(chunk);
                console.log('Received chunk', chunk);
              });
              return readStream();
            });
          };

          readStream();
        })
        .catch(error => {
          this.zone.run(() => observer.error(error));
        });

      // Clean up on unsubscribe
      return () => {
        // If needed, abort the fetch request here
      };
    });
  }
}

