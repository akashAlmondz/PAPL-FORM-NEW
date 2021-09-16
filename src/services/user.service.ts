import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FromDto, FromDtoResponse } from 'src/models/form.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authLink = environment.authLink;

  constructor(private http: HttpClient) { }

  getAllOutlets(): Observable<string[]> {
    return this.http.get<string[]>(`${this.authLink}outlet/allOutlet`);
  }

  getAllAddresses(): Observable<string[]> {
    return this.http.get<string[]>(`${this.authLink}outlet/allAddresses`);
  }

  checkUuid(uuid: string): Observable<{ message: string; status: boolean }> {
    return this.http.get<{ message: string; status: boolean }>(`${this.authLink}users/check-data/${uuid}`);
  }

  formSubmit = (data: FromDto): Observable<FromDtoResponse> => {
    return this.http.post<FromDtoResponse>(`${this.authLink}users`, data);
  }
}
