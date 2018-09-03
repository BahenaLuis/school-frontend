import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { url_base } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: Http) { }

  post(path, data){
    return new Promise((resolve, reject)=>{           
      this.http.post(url_base + path, JSON.stringify(data))               
      .subscribe((res:any)=>{                
        resolve(JSON.parse(res._body)); 
      }, 
      error =>{    
        console.log(JSON.stringify('Soy el error del post: ' +  error));              
      })      
    })
  }

  get(path){
    return new Promise((resolve, reject)=>{
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      let options = new RequestOptions({
        headers: headers
      });
      this.http.get(url_base + path, options)        
      .subscribe((res: any)=>{        
        resolve(JSON.parse(res._body)); 
      }, 
      error =>{              
        console.log(JSON.stringify('Soy el error del post: ' +  error));        
      });      
    })
  }

}
