import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private options: any ={ headers: new HttpHeaders({'Content-Type': 'application/json',})};
  url = 'https://bube.com.pe/bube/api';

  constructor(public http: HttpClient, public storage: Storage) { }
   valido: number;



//////////////////////BEBIDAS/////////////////////////////
  getBebidas(){
    return new Promise(resolve=>{
      this.http.get(this.url).subscribe(data=>{
        resolve(data);
      }, error=>{
        console.log(error);
      });
    });
  }

getBebidas2(val:String){

  return this.http.get('https://bube.com.pe/bube/api/bebidas/listar/'+val)

}

getBebidasPrincipal(data){
  return new Promise((resolve, reject) => {
     this.http.post('https://bube.com.pe/bube/api/bebidas/bebidasSocios/listar/',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

getMarcasPrincipal(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/bebidas/marcas/listar',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

getPackPrincipal(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/bebidas/pack/listar',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}


getSubCategoriasPrincipal(val){
  return this.http.get('https://bube.com.pe/bube/api/bebidas/subcategoria/listar/'+val)
}


getBebidasConFiltro(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/bebidas/filtro/listar',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

getBebidasEstablecimientos(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/bebidas/establecimientos/listar',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

///////////////// BEBIDAS CATEGORIA ////////////////////////////////////

getBebidasCategoria(val){

  return this.http.get('https://bube.com.pe/bube/api/bebidas/categoria/listar/'+val)
}

getMarcasCategoria(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/bebidas/categoria/marcas/listar',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

getPackCategoria(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/bebidas/categoria/pack/listar',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}


getSubCategoriasCategoria(val){
  return this.http.get('https://bube.com.pe/bube/api/bebidas/categoria/subcategoria/listar/'+val)
}

getBebidasConFiltroCategoria(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/bebidas/categoria/filtro/listar',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

getBebidasEstablecimientosCategoria(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/bebidas/categoria/establecimientos/listar',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

//////////////////// BEBIDAS ESTABLECIMIENTO ////////////////////////////

getBebidasEstablecimiento(val){
  return this.http.get('https://bube.com.pe/bube/api/bebidas/establecimiento/listar/'+val)
}


getMarcasEstablecimiento(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/bebidas/establecimiento/marcas/listar',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  }); 
}

getPackEstablecimiento(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/bebidas/establecimiento/pack/listar',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}


getSubCategoriasEstablecimiento(val){
  return this.http.get('https://bube.com.pe/bube/api/bebidas/establecimiento/subcategoria/listar/'+val)
}

getBebidasConFiltroEstablecimiento(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/bebidas/establecimiento/filtro/listar',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

///////////////// LISTAR ESTABLECIMIENTO TIPO
getEstablecimientoTipo(val){
  return this.http.get('https://bube.com.pe/bube/api/establecimiento/tipo/listar/'+val)
}

//insertar tarjeta
insertarTarjeta(data){
  return new Promise((resolve,reject) =>{
    this.http.post('https://bube.com.pe/bube/api/tarjeta/insertar',data)
      .subscribe(res =>{
        resolve(res);
      }, (error) =>{
        reject(error);
      });
  });
}

//listar tarjetas por usuario

getTarjetas(id){
 return this.http.get('https://bube.com.pe/bube/api/tarjeta/listar/'+id);
}


//////////////////// LISTAR COINCIDENCIAS ESTABLECIMIENTO Y BEBIDAS //////////////////

getCoincidenciasEstablecimiento(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/miseleccion/coincidencia/establecimiento',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

getCoincidenciasBebida(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/miseleccion/coincidencia/bebida',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

/////////////////// LISTAR PROMOCIONES //////////////////

getListaPromociones(data){
    return new Promise((resolve,reject) =>{
      this.http.post('https://bube.com.pe/bube/api/promociones/listar',JSON.stringify(data),this.options)
      .subscribe(Response =>{
        resolve(Response);
      }, (error) =>{
        reject(error);
        console.log(error)
      });
    });
}

/// GUARDAR AMIGOS
guardarAmigos(data){
  return new Promise((resolve,reject) =>{
    this.http.post(this.url+'/amigos/registrar',JSON.stringify(data),this.options)
    .subscribe(Response =>{
      resolve(Response);
    }, (error) =>{
      reject(error);
      console.log(error)
    });
  });
    
}

  // registrar en la BD el usuario 
  guardarUsuario(data){
    return new Promise((resolve, reject) =>{
      this.http.post(this.url+'/usuarios/registrar',data,this.options)
        .subscribe(Response =>{
          resolve(Response); 
        }, (error) =>{
          reject(error);
        });
    });
}

  // registrar en la BD el usuario 
  verificarUsuarioFB(data){
    return new Promise((resolve, reject) =>{
      this.http.post(this.url+'/usuarios/verificar/facebook',data,this.options)
        .subscribe(Response =>{
          resolve(Response); 
        }, (error) =>{
          reject(error);
        });
    });
}



//guarda en el storage para utilizarlo despues
public setStorage(key,value){
  this.storage.set(key,value);
}

//consultar en el storage segun la llave 
public getStorage(key){
return this.storage.get(key);
}

//eliminar en el storage segun llaves
public removeStorage(key){
this.storage.remove(key);
}

// limpia todo el almacenamiento storage
public clearStorage(){
this.storage.clear();
}


// GUARDAR BEBIDAS FAVORITAS
PostBebidasFavoritas(data){

  return new Promise((resolve, reject) =>{
    this.http.post('https://bube.com.pe/bube/api/bebidasFavoritas/registrar',data,this.options)
      .subscribe(Response =>{
        resolve(Response); 
      }, (error) =>{
        reject(error);
      });
  });
}
//obtener bebidas favoritas del usuario
getBebidasFavoritas(id){
  return this.http.get('https://bube.com.pe/bube/api/bebidasFavoritas/listar/'+id);
}

EditarBebidasFavoritas(bebidas){
  return new Promise((resolve, reject) =>{
    this.http.post('https://bube.com.pe/bube/api/bebidasFavoritas/editar',bebidas)
      .subscribe(res =>{
        resolve(res);
      },(error) =>{
        reject(error);
      });
  });
}

// ACTUALIZAR CORREO USUARIO NUEVO

PutCorreo(data){
  return new Promise((resolve, reject) =>{
    this.http.put('https://bube.com.pe/bube/api/usuarios/actualizar/correo',data,this.options)
      .subscribe(Response =>{
        resolve(Response); 
      }, (error) =>{
        reject(error);
      });
  });
}

// ACTUALIZAR ESTADO USUARIO 

PutEstado(data){
    return new Promise((resolve, reject) =>{
      this.http.put('https://bube.com.pe/bube/api/usuarios/actualizar/estado', data, this.options)
      .subscribe(Response => {
        resolve(Response);
      }, (error) =>{
        reject(error);
      });
    });

}




////////////////////// COMPRAS////////////////////////////////////////

// LISTAR AHORROS

getAhorros(data){
      return new Promise((resolve, reject) => {
        this.http.post('https://bube.com.pe/bube/api/compras/ahorros/listar',data,this.options)
        .subscribe(Response => {
          resolve(Response);
        }, (error) => {
          reject(error);
        });
      });
}

getAhorrosMes(data){
  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/compras/ahorros/mes',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

getDataGrafico(data){

  return new Promise((resolve, reject) => {
    this.http.post('https://bube.com.pe/bube/api/compras/ahorros/listaGrafico',data,this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) => {
      reject(error);
    });
  });
}

// obetener los amigos de usuario
obtenerAmigos(val){
  return this.http.get(this.url+'/amigos/listar/'+val);
}

//obtener datos del usuario por id
getDatosUsuario(id){
  return this.http.get('https://bube.com.pe/bube/api/usuarios/listar/'+id);
}

putUsuario(usuario){
return this.http.put('https://bube.com.pe/bube/api/usuarios/actualizar',usuario);
}

getPromociones(){
return this.http.get('https://bube.com.pe/bube/api/promociones/listar/'+1);
}

//mantenimiento carrito

PostCarrito(data){

  return new Promise((resolve, reject) =>{
    this.http.post('https://bube.com.pe/bube/api/carrito/registrar',data,this.options)
      .subscribe(Response =>{
        resolve(Response); 
      }, (error) =>{
        reject(error);
      });
  });
}

getCarrito(id){
  return this.http.get('https://bube.com.pe/bube/api/carrito/listar/'+id);
}

putCarrito(data){
  return new Promise((resolve, reject) =>{
    this.http.put('https://bube.com.pe/bube/api/carrito/actualizar', data, this.options)
    .subscribe(Response => {
      resolve(Response);
    }, (error) =>{
      reject(error);
    });
  });
}

//envio de token de tarjeta a la api de pagobube
enviarTokerTarjeta(token){
  return new Promise((resolve, reject) =>{
    this.http.post('https://bube.com.pe/pagosbube/api/pagosbube/pagar/tokenTarjeta',token,this.options)
      .subscribe(Response =>{
        resolve(Response); 
      }, (error) =>{
        reject(error);
      });
  });
}

//guardar la tabla compra por la api de pagobube
guardarCompra(compra){
  return new Promise((resolve, reject) =>{
    this.http.post('https://bube.com.pe/pagosbube/api/pagosbube/compra/registrar',compra,this.options)
      .subscribe(Response =>{
        resolve(Response); 
      }, (error) =>{
        reject(error);
      });
  });
}
//guardar la tabla detalle compra por la api de pagobube
guardarDetalleCompra(detalle){
  return new Promise((resolve, reject) =>{
    this.http.post('https://bube.com.pe/pagosbube/api/pagosbube/detallecompra/registrar',detalle,this.options)
      .subscribe(Response =>{
        resolve(Response); 
      }, (error) =>{
        reject(error);
      });
  });
}


//editar tarjeta
editarTarjeta(data){
  return new Promise((resolve,reject) =>{
    this.http.put('https://bube.com.pe/bube/api/tarjeta/editar/',data)
      .subscribe(res =>{
        resolve(res);
      }, (error) =>{
        reject(error);
      });
  });
}

//eliminar tarjeta

eliminarTarjeta(id){
  return new Promise((resolve,reject) =>{
    this.http.delete('https://bube.com.pe/bube/api/tarjeta/eliminar/'+id)
      .subscribe(res =>{
        resolve(res);
      }, (error) =>{
        reject(error);
      });
  });
}

// ENVIAR CORREO
enviarCorreo(detalle){
  return new Promise((resolve, reject) =>{
    this.http.post('https://bube.com.pe/emailBube/api/emailbube/email/enviar',detalle,this.options)
      .subscribe(Response =>{
        resolve(Response); 
      }, (error) =>{
        reject(error);
      });
  });
}


  //VALIDAR CORREO PARA RECUPERAR CONTRASEÑA
  validarCorreo(data){
    return new Promise((resolve, reject) =>{
      this.http.post(this.url+"/usuario/validar/correo/",data,this.options)
        .subscribe(Response =>{
          resolve(Response); 
        }, (error) =>{
          reject(error);
        });
    });
  }

  
//insertar dni del usuario
insertarDni(data){
  return new Promise((resolve,reject) =>{
    this.http.put('https://bube.com.pe/bube/api/usuario/insertar/dni',data)
      .subscribe(res =>{
        resolve(res);
      }, (error) =>{
        reject(error);
      });
  });
}


///////////////// SLIDES PAGINA INICIO ////////////////////////////////////

getSlidesInicio(){

  return this.http.get('https://bube.com.pe/bube/api/parametros/slides/listar/'+1)
}

//////////////// NOTIFICACION /////////////

getNotificaciones(id){

  return this.http.get('https://bube.com.pe/bube/api/notificacion/listar/'+id)
}

 //INSERTAR NOTIFICACION
 insertarNotificacion(notifi){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/notificacion/insertar',notifi,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

//CAMBIAR ESTADO NOTIFICACION
cambiarEstadoNotificacion(notifi){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/notificacion/cambiar/estado',notifi,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

//CAMBIAR ESTADO NOTIFICACION
getPrecioDelivery(data){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/socioscomerciales/delivery/precio',data,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

// OBTENER VERSION DE LA APP
obtenerVersionApp(){
  return new Promise((resolve , reject) =>{
    this.http.get('https://bube.com.pe/bubeAdmin/api/version/obtener/'+1)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

// POST INICIO SESION GMAIL (VERIFICAR)

postVerificarLoginGmail(data){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/usuarios/verificar/gmail',data,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

// POST INICIO SESION GMAIL (REGISTRAR)

postRegistrarLoginGmail(data){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/usuarios/registrar/gmail',data,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

// POST INICIO SESION EMAIL (LOGIN)

postLoginEmail(data){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/usuarios/login/email',data,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

// POST INICIO SESION TELEFONO (LOGIN)

postLoginTelefono(data){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/usuarios/login/telefono',data,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

//ACTUALIZAR UBICACION USUARIO
putActualizarUbicacion(data){
  return new Promise((resolve,reject) =>{
    this.http.put('https://bube.com.pe/bube/api/usuarios/actualizar/ubicacion',data)
      .subscribe(res =>{
        resolve(res);
      }, (error) =>{
        reject(error);
      });
  });
}

// POST VERIFICAR SI EL USUARIO ESTA CONECTADO A FACEBOOK

verificarConexionFB(data){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/usuarios/verificar/conexion/fb',data,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

// POST GUARDAR AMIGOS DE OTROS TIPOS DE LOGEO QUE SE CONECTAN A FACEBOOK

postAmigosConectado(data){
  console.log(JSON.stringify(data));
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/amigos/guardar/conectado',JSON.stringify(data),this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}


// POST INICIO SESION TELEFONO (VERIFICAR)

postVerificarLoginTelefono(data){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/usuarios/verificar/telefono',data,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

// POST INICIO SESION TELEFONO (VERIFICAR)

validarDiaDisponibleTienda(data){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/dias/disponible/tienda',data,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

postVerificarLoginApple(data){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/usuarios/verificar/apple',data,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

// POST INICIO SESION APPLE (REGISTRAR)

postRegistrarLoginApple(data){
  return new Promise((resolve , reject) =>{
    this.http.post('https://bube.com.pe/bube/api/usuarios/registrar/apple',data,this.options)
    .subscribe(response =>{
      resolve(response);
    },(error) =>{
      reject(error);
    });
  });
}

getFechaActual(){
  return this.http.get('https://bube.com.pe/bube/api/obtener/fecha/actual');
}


}
