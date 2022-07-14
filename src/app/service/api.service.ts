import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postEmp(data:any){
    return this.http.post<any>("http://192.168.200.30:3000/employee/",data);
  }
  getEmp(){
    return this.http.get<any>("http://192.168.200.30:3000/employee/");
}
deleteEmp(id:number){
  return this.http.delete<any>("http://192.168.200.30:3000/employee/"+id);
}
updateEmp(id:number,data:any){
  return this.http.put<any>("http://192.168.200.30:3000/employee/"+id,data);
}

postPro(data:any){
  return this.http.post<any>("http://192.168.200.30:3000/Products/",data);
}
getPro(){
  return this.http.get<any>("http://192.168.200.30:3000/Products/");
}
deletePro(id:number){
return this.http.delete<any>("http://192.168.200.30:3000/Products/"+id);
}
updatePro(id:number,data:any){
return this.http.put<any>("http://192.168.200.30:3000/Products/"+id,data);
}

postCus(data:any){
  return this.http.post<any>("http://192.168.200.30:3000/CusInfo/",data);
}
getCus(){
  return this.http.get<any>("http://192.168.200.30:3000/CusInfo/");
}
deleteCus(id:number){
return this.http.delete<any>("http://192.168.200.30:3000/CusInfo/"+id);
}
updateCus(id:number,data:any){
return this.http.put<any>("http://192.168.200.30:3000/CusInfo/"+id,data);
}

postOrd(data:any){
  return this.http.post<any>("http://192.168.200.30:3000/Orders/",data);
}
getOrd(){
  return this.http.get<any>("http://192.168.200.30:3000/Orders/");
}
deleteOrd(id:number){
return this.http.delete<any>("http://192.168.200.30:3000/Orders/"+id);
}
updateOrd(id:number,data:any){
return this.http.put<any>("http://192.168.200.30:3000/Orders/"+id,data);
}

}

