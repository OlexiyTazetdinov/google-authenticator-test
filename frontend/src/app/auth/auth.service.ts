import {Injectable} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "./login.model";
import {AuthResponseModel} from "./auth-response.model";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {

  }

  logIn(loginModel: LoginModel): Observable<AuthResponseModel> {
    return this.http.post <AuthResponseModel>(`${this.baseUrl}/auth`, loginModel);
  }
}
