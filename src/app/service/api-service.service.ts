import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiUrl = environment.apiUrl;
  urlEndPointPaymentRequest = "ccavenue/generateTeachersDayToken";
  constructor(
    private http: HttpClient,
  ) { }

  paymentRequest(data: any): Observable<any> {
    return this.http.post(this.apiUrl + this.urlEndPointPaymentRequest, data);
  }

  getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
  };

  //getOtp
  getOtp(data: any) {
    return this.http.post(this.apiUrl + 'hogan-employee/create_otp', data)
  }
  // validateOtp
  mobileLogin(data: any) {
    return this.http.post(this.apiUrl + 'hogan-employee/validate_otp', data)
  }
  emailLogin(data: any) {
    return this.http.post(this.apiUrl + 'hogan-employee/email_login', data)
  }
  // reset password /change_password
  resetPassword(data: any) {
    return this.http.put(this.apiUrl + 'hogan-employee/change_password', data, this.getHeader())
  }

  searchEmployee(search_keyword: any) {
    const params: any = {};
    if (search_keyword != '') {
      params["search"] = search_keyword
    }
    var queryString = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return this.http.get(this.apiUrl + 'hogan-employee/search_hogan_employee' + queryString, this.getHeader())
  }

  fetchRecentSearchEmployee() {
    return this.http.get(this.apiUrl + 'hogan-employee/fetch_recent_search', this.getHeader())
  }

  getdashboardDetails(employee_id = '') {
    const params: any = {};
    if (employee_id) {
      params["employee_id"] = employee_id;
    }
    var queryString = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return this.http.get(this.apiUrl + 'hogan-employee/fetch_hogan_employee' + queryString, this.getHeader())
  }

  fetchHoganEmployeePerformance(dashboard_type = null, employee_id = null) {
    const params: any = {};
    if (dashboard_type) {
      params["type"] = dashboard_type;
    }
    if (employee_id) {
      params["employee_id"] = employee_id;
    }
    var queryString = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return this.http.get(this.apiUrl + 'hogan-employee/fetch_hogan_employee_performance' + queryString, this.getHeader())
  }

  fetchHoganEmployeeConfigural(employee_id = null) {
    const params: any = {};
    if (employee_id) {
      params["employee_id"] = employee_id;
    }
    var queryString = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return this.http.get(this.apiUrl + 'hogan-employee/fetch_hogan_employee_configural' + queryString, this.getHeader())
  }

  fetchHoganEmployeeDerailers(employee_id = null) {
    const params: any = {};
    if (employee_id) {
      params["employee_id"] = employee_id;
    }
    var queryString = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return this.http.get(this.apiUrl + 'hogan-employee/fetch_hogan_employee_derailers' + queryString, this.getHeader())
  }
  fetchHoganTeamCorelation(manager_id = null) {
    const params: any = {};
    if (manager_id) {
      params["manager_id"] = manager_id;
    }
    var queryString = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return this.http.get(this.apiUrl + 'hogan-employee/fetch_hogan_team_corelation' + queryString, this.getHeader())
  }

  fetchHoganIndividualCorelation(employee_id = null , manager_id = null) {
    const params: any = {};
    if (employee_id) {
      params["employee_id"] = employee_id;
    }
    if (manager_id) {
      params["manager_id"] = manager_id;
    }
    var queryString = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    console.log("🚀 ~ ApiServiceService ~ fetchHoganIndividualCorelation ~ queryString:", queryString)
    return this.http.get(this.apiUrl + 'hogan-employee/fetch_hogan_Individual_corelation' + queryString, this.getHeader())
  }
}
