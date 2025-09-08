import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  init(accessToken: string, refreshToken: string) {
    window.localStorage[ACCESS_TOKEN] = accessToken;
    window.localStorage[REFRESH_TOKEN] = refreshToken;
  }

  getAccessToken(): string {
    return window.localStorage[ACCESS_TOKEN];
  }

  getRefreshToken(): string {
    return window.localStorage[REFRESH_TOKEN];
  }

  destroy() {
    window.localStorage.removeItem(ACCESS_TOKEN);
    window.localStorage.removeItem(REFRESH_TOKEN);
  }
}
