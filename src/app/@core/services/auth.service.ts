import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import { Router} from "@angular/router";
import { mergeMap, finalize } from 'rxjs/operators';
import { StorageService } from "./storage.service";
import {JwtService} from "./jwt.service";
import {EndpointService} from "../../@shared/endpoints.service";
import {UserService} from "./user.service";
import {AccessService} from "./access.service";
import {
  LoginResponse,
  UserEntityRelationWithoutUserDataResponse,
  UserOptionsResponse
} from "../../@shared/models/response.module";
import {USM_USR_0, USM_USR_19, USM_USR_25} from "../../@shared/models/input.module";
import {TranslateService} from "@ngx-translate/core";

export interface AccessTokenDecodeModel {
  fresh: boolean;
  iat: number;
  jti: string;
  type: 'access';
  sub: string;
  nbf: number;
  exp: number;
  user_id: string;
  email: string;
  first_name: null | string;
  last_name: null | string;
  phone: null | string;
  entity_access: object;
  role_access: {
    [key: string]: string[];
  };
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<AccessTokenDecodeModel>({} as AccessTokenDecodeModel);
  public token = this.tokenSubject.asObservable().pipe(distinctUntilChanged());
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  companies: UserEntityRelationWithoutUserDataResponse[] = [];
  constructor(private http: HttpClient,
              private jwtService: JwtService,
              private endpointService: EndpointService,
              private router: Router,
              private userService: UserService,
              private storageService: StorageService,
              private accessService: AccessService,
              private translate: TranslateService
      ) {}

  // Verify JWT in localstorage with server & load token's info.
  // This runs once on application startup.
  init() {
    // If JWT is detected, attempt to get & store token's info
    const accessToken = this.jwtService.getAccessToken();
    if (accessToken) {
      this.tokenSubject.next(jwtDecode(accessToken));
      this.isAuthenticatedSubject.next(true);
    } else {
      // Remove any potential remnants of previous auth states
      this.destroy();
    }
  }

  destroy() {
    // Remove JWT from localstorage
    this.jwtService.destroy();
    // Set token to an empty object
    this.tokenSubject.next({} as AccessTokenDecodeModel);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    // Empty local storage
    this.storageService.clean();
  }

  getToken(): AccessTokenDecodeModel {
    return this.tokenSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  setAuth(token: LoginResponse) {
    // Save JWT sent from server in localstorage
    this.jwtService.init(token.access_token, token.refresh_token);
    // Set token data into observable
    this.tokenSubject.next(jwtDecode(token.access_token));
    // Set isAuthenticated to true
    // this.isAuthenticatedSubject.next(true);
  }

  login(payload: USM_USR_0): Observable<unknown> {
    return this.endpointService.usm_aut_0(payload).pipe(
      mergeMap((response) => {
        this.setAuth(response);
        return this.userService.getUserEntityRelation().pipe(
          mergeMap((entities) => {
            this.companies = entities;
            if ( this.storageService.getSelectedCompany() && this.storageService.getSelectedCompany().entity_id && this.companies.find(
              (e) => e.entity_id == this.storageService.getSelectedCompany().entity_id
            )) {
              return of(undefined);
            }

            else {
              this.storageService.saveSelectedCompany(this.companies[0]);
              return of(undefined);
            }
          }),
          // Perform the final steps before completion
          finalize(() => {
            // Init user access data
            this.accessService.init();
            // Init user data
            this.userService.init();
            this.userService.getUserOptions().subscribe((res: UserOptionsResponse) => {
              this.translate.setDefaultLang(res.language);
            })
            // Init user profile image
            // this.userProfileImageService.init();
            // Redirect the user to the dashboard
            setTimeout(() => {
              this.isAuthenticatedSubject.next(true);
              this.router.navigate(['dashboards/recruiter']);
            }, 1000);
          })
        );

      })
    );
  }

  refreshToken(): Observable<LoginResponse> {
    return this.endpointService.usm_aut_1().pipe(
      catchError((error) => {
        this.destroy();
        this.router.navigateByUrl('/auth/login');
        return throwError(() => error);
      }),
        map((data) => {
          this.setAuth(data);
          this.isAuthenticatedSubject.next(true);
          return data;
        }), catchError((err) => {
          this.destroy()
          this.router.navigate(['auth/login']);
          throw err;
        })
      );
  }

  logout() {
    // this.endpointService.usm_usr_15(null).subscribe(
    //   () => {
    //     this.destroy();
    //     this.isAuthenticatedSubject.next(false);
    //     this.router.navigate(['auth/login']);
    //   }
    // );

    this.destroy();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['auth/login']);
  }

  // initiatePasswordReset(payload: USM_USR_13): Observable<PostResponse<null>> {
  //   return this.endpointService.usm_usr_13(payload).pipe(
  //     map((data) => {
  //       return data;
  //     })
  //   );
  // }
  //
  registerUser(payload: USM_USR_19) {
    return this.endpointService.usm_usr_19(payload).pipe(
      map((data) => {
        return data;
      }));
  }

  verifyInvitationToken(token: string) {
    let payload: USM_USR_25 = {
      invitation_token: token
    }
    return this.endpointService.usm_usr_25(payload, false).pipe(
      catchError((error) => {
        return of(error.error.data);
      }),
      map((data) => {
        return data.data;
      }));
  }
  //
  // setNewPassword(payload: USM_USR_14) {
  //   return this.endpointService.usm_usr_14(payload).pipe(
  //     map((data) => {
  //       return data;
  //     }));
  // }

  checkComponentAccess(componentId: string): boolean {
    return this.accessService.checkComponentAccess(componentId);
  }
}
