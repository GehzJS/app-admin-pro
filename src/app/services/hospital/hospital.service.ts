import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { HospitalModel } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  getHospitals(page?: number) {
    const URL = `${API_URL}/hospitals/?offset=${page}`;
    return this.http.get(URL);
  }

  getHospital(id: string) {
    const URL = `${API_URL}/hospitals/${id}`;
    return this.http.get(URL).pipe(map((response: any) => response.hospital));
  }

  searchHospitals(keyword: string) {
    const URL = `${API_URL}/search/collection/hospitals/${keyword}`;
    return this.http.get(URL).pipe(map((response: any) => response.hospitals));
  }

  saveHospital(name: string) {
    const hospital = new HospitalModel(name);
    const URL = `${API_URL}/hospitals`;
    return this.http
      .post(URL, hospital)
      .pipe(map((response: any) => response.hospital));
  }

  editHospital(hospital: HospitalModel) {
    const URL = `${API_URL}/hospitals/${hospital._id}`;
    return this.http
      .put(URL, hospital)
      .pipe(map((response: any) => response.hospital));
  }

  deleteHospital(id: string) {
    const URL = `${API_URL}/hospitals/${id}`;
    return this.http
      .delete(URL)
      .pipe(map((response: any) => response.hospital));
  }
}
