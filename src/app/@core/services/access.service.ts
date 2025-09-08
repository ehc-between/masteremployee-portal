import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {jwtDecode} from "jwt-decode";
import {JwtService} from "./jwt.service";


export interface UserAccessModel {
  entity_access: {
    [key: string]: string[];
  };
  role_access: {
    [key: string]: string[];
  };
}


@Injectable({ providedIn: 'root' })
export class AccessService {
  private userAccessSubject = new BehaviorSubject<UserAccessModel>(
    {} as UserAccessModel
  );

  public userAccess = this.userAccessSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  get userAccessValue(): UserAccessModel {
    return this.userAccessSubject.value;
  }

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  // Verify JWT in localstorage with server & load access info.
  // This runs once on application startup.
  init() {
    // If JWT is detected, attempt to get & store token's info
    if (this.jwtService.getAccessToken()) {
      // put authorization here
    } else {
      // Remove any potential remnants of previous access states
      this.destroy();
    }
  }

  destroy() {
    // Set user to an empty object
    this.userAccessSubject.next({} as UserAccessModel);
  }

  setUserAccess(user: UserAccessModel) {
    // Set user access data into observable
    this.userAccessSubject.next(user);
  }

  getUserAccess() {
    return this.http
      .get<UserAccessModel>('/api/usermanagement/users/access')
      .pipe(
        map((data) => {
          this.setUserAccess(data);
          return data;
        })
      );
  }


  checkComponentAccess(componentId: string) {
    const decodedToken: {[key: string]: any} = jwtDecode(this.jwtService.getAccessToken());

    // Check if 'component_access' exists and is an array
    if (Array.isArray(decodedToken['component_access'])) {
      return decodedToken['component_access'].includes(componentId);
    }
    return false;
  }
}
