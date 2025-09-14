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
  COR_COY_0,
  COR_COY_1,
  COR_COY_2,
  COR_COY_3,
  COR_COY_4, MEE_APP_0, MEE_APP_1, MEE_APP_2, MEE_APP_3, MEE_APP_4, MEE_INT_0, MEE_REC_0, MEE_REC_1,
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
  ApplicationResponse, ApplicationTypeResponse, CandidateCompactResponse, CandidateResponse,
  CompanyResponse,
  InvitationTokenVerificationResponse,
  LoginResponse,
  UserEntityRelationWithoutUserDataResponse,
  UserEntityRelationWithUserDataResponse,
  UserOptionsResponse,
  UserResponse
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


  /**
   *
   * Endpoint definitions
   * MEE-APP
   * Applications
   *
   */

  mee_app_0(payload: MEE_APP_0, raiseErrorToast: boolean = true): Observable<GetResponse<ApplicationResponse[]>> {
    return this.get(environment.coreApiUrl + 'applications', payload, {raiseErrorToast: raiseErrorToast})
  }

  mee_app_1(payload: MEE_APP_1, raiseErrorToast: boolean = true): Observable<PostResponse<ApplicationResponse>> {
    return this.post(environment.coreApiUrl + 'applications/company', payload, {raiseErrorToast: raiseErrorToast})
  }

  mee_app_2(payload: MEE_APP_2, raiseErrorToast: boolean = true): Observable<GetResponse<ApplicationResponse[]>> {
    return this.get(environment.coreApiUrl + 'applications/company', payload, {raiseErrorToast: raiseErrorToast})
  }

  mee_app_3(payload: MEE_APP_3, raiseErrorToast: boolean = true): Observable<DeleteResponse> {
    return this.delete(environment.coreApiUrl + 'applications/company', payload, {raiseErrorToast: raiseErrorToast})
  }

  mee_app_4(payload: MEE_APP_4, raiseErrorToast: boolean = true): Observable<GetResponse<ApplicationTypeResponse>> {
    return this.get(environment.coreApiUrl + 'applications/types', payload, {raiseErrorToast: raiseErrorToast})
  }


  /**
   *
   * Endpoint definitions
   * MEE-INT
   * Integrations
   *
   */

  mee_int_0(payload: MEE_INT_0, raiseErrorToast: boolean = true): Observable<PutResponse<any>> {
    return this.put(environment.coreApiUrl + 'integrations/recruiting/recman', payload, {raiseErrorToast: raiseErrorToast})
  }



  /**
   *
   * Endpoint definitions
   * MEE-REC
   * Recruiter
   *
   */

  mee_rec_0(payload: MEE_REC_0, raiseErrorToast: boolean = true): Observable<PaginationResponse<CandidateCompactResponse[]>> {
    return this.get(environment.coreApiUrl + 'recruiter/candidates', payload, {raiseErrorToast: raiseErrorToast})
  }

  mee_rec_1(payload: MEE_REC_1, raiseErrorToast: boolean = true): Observable<GetResponse<CandidateResponse>> {
    return this.get(environment.coreApiUrl + 'recruiter/candidates/details', payload, {raiseErrorToast: raiseErrorToast})
  }
}

