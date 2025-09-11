import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { EndpointService } from "../../@shared/endpoints.service";
import {GetResponse, PostResponse} from "../../@shared/models/global/response-wrapper.service";
import {UserResponse} from "../../@shared/models/response.module";
import {
  _USM_USR_27, _USM_USR_28,
  USM_ENT_0, USM_ENT_2, USM_ENT_3,
  USM_USR_1, USM_USR_13, USM_USR_14,
  USM_USR_16,
  USM_USR_18,
  USM_USR_22, USM_USR_26, USM_USR_27, USM_USR_28,
  USM_USR_3,
  USM_USR_6
} from "../../@shared/models/input.module";
import {StorageService} from "./storage.service";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<UserResponse | undefined>(undefined);
  public user = this.userSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private http: HttpClient,
              private jwtService: JwtService,
              private endpointService: EndpointService,
              private storageService: StorageService) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  init() {
    // If JWT is detected, attempt to get & store user's info
    if (this.jwtService.getAccessToken()) {
      // Request user data from a server
      this.getUser().subscribe({
        next: (res ) => {
          this.storageService.set('auth-user', JSON.stringify(res.data));
        },
        error: () => {
          this.destroy();
        },
      });
    } else {
      // Remove any potential remnants of previous user states
      this.destroy();
    }
  }

  destroy() {
    // Set current user to an empty object
    this.userSubject.next({} as UserResponse);
  }

  setUser(user: PostResponse<UserResponse>) {
    // Set current user data into observable
    this.userSubject.next(user.data);
  }

  getUser(): Observable<GetResponse<UserResponse>> {
    return this.endpointService.usm_usr_1().pipe(map((data => {
      this.setUser(data)
      return data;
    })))
  }

  getUserEntityRelation(){
    let params: USM_ENT_0 = {
      entity_tag: 'COY'
    };
    return this.endpointService.usm_ent_0(params).pipe(map((data) => {
      return data.data;
    }))
  }

  getUserOptions(){
    return this.endpointService.usm_usr_21({}).pipe(map((data) => {
      return data.data;
    }))
  }

  updateUserOptions(params: USM_USR_22) {
    return this.endpointService.usm_usr_22(params).pipe(map((data) => {
      return data.data;
    }))
  }

  resetUserPasswordWithOldPassword(params: USM_USR_18) {
    return this.endpointService.usm_usr_18(params).pipe(map((data) => {
      return data.data;
    }))
  }

  updateProfileImage(params: USM_USR_16) {
    return this.endpointService.usm_usr_16(params).pipe(map((data) => {
      this.storageService.set('auth-user', JSON.stringify(data.data));
      return data.data;
    }))
  }

  updateUser(oarams: USM_USR_3) {
    return this.endpointService.usm_usr_3(oarams).pipe(map((data) => {
      this.storageService.set('auth-user', JSON.stringify(data.data));
      return data.data;
    }))
  }

  inviteUserToEntity(params: USM_USR_6) {
    return this.endpointService.usm_usr_6(params).pipe(map((data) => {
      return data.data;
    }))
  }

  editEmployeeRole(params: USM_ENT_2) {
    return this.endpointService.usm_ent_2(params).pipe(map((data) => {
      return data.data;
    }))
  }

  initiatePasswordReset(payload: USM_USR_13): Observable<PostResponse<null>> {
    return this.endpointService.usm_usr_13(payload).pipe(
      map((data) => {
        return data;
      })
    );
  }

  setNewPassword(payload: USM_USR_14) {
    return this.endpointService.usm_usr_14(payload).pipe(
      map((data) => {
        return data;
      }));
  }

  removeUserFromEntity(params: USM_ENT_3) {
    return this.endpointService.usm_ent_3(params).pipe(map((data) => {
    }))
  }

  // getUserOptions () {
  //   let params: USM_USR_21 = {}
  //   return this.endpointService.usm_usr_21(params).pipe(map(data => {
  //     return data.data;
  //   }))
  // }
}
