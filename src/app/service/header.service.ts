import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';

@Injectable()

export class HeaderService implements HttpInterceptor {

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

    if (localStorage.getItem('token') !== null) {
      const token = 'Bearer ' + localStorage.getItem('token');

      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      //Incluindo Processamento de Erro
      return next.handle(tokenRequest).pipe(
        tap((event: HttpEvent<any>) => {
          if(event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
            console.info('Operação realizada com sucesso!')
          }
        })
      ,catchError(this.errorProcess));
    } else {
      return next.handle(req).pipe(catchError(this.errorProcess));
    }
  }

  constructor() { }
  //Processamento de Erro
  errorProcess(error : HttpErrorResponse){
    let errorMessage = 'Erro desconhecido';

    if(error.error instanceof ErrorEvent){

      console.error(error.error);

      errorMessage = 'Erro: ' + error.error.error

    }else{
      errorMessage = 'Código: ' + error.error.code + '\nMensagem: ' + error.error.error;
    }

    alert(errorMessage);
    return throwError(errorMessage);
  }


}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderService,
    multi: true,
  },
  ],
})

export class HeaderInterceptorModule {

}
