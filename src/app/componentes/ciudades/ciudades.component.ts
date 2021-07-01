import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.scss']
})
export class CiudadesComponent implements OnInit {
  public getCiudades = []; //Se va almacemar los datos
  public ciudadesModel = { //Modelo para agregar datos
    nombreCiudad: '',
    habitantes: null
  };

  public ciudadId = {
    id: String,
    nombreCiudad: String,
    habitantes: Number
  }

  constructor(private firestoreDb: AngularFirestore){}


  ngOnInit(): void {
    this.obtenerCiudades();
  }

  //ObtenerCiudades
  obtenerCiudades(){
    this.firestoreDb.collection('Ciudades').snapshotChanges().subscribe(
      res=>{
        this.getCiudades = []
        res.forEach(datos =>{
          this.getCiudades.push({
            id: datos.payload.doc.id,
            data: datos.payload.doc.data()
          })
        })
        console.log(this.getCiudades);
      }
    )
  }

  //Función para agregar ciudades
  agregarCiudades(){
    this.firestoreDb.collection('Ciudades').add(this.ciudadesModel).then(
      res=>{
        console.log("Ciudad Agregada");
        this.ciudadesModel = {
          nombreCiudad: '',
          habitantes: null
        }
      }
    ).catch(
      error=>{
        console.log(error);
      }
    )
  }

  //Función para obtener ciudades por id
  obtenerCiudadPorId(id){
    this.firestoreDb.collection('Ciudades').doc(id).get().subscribe(
      (res: any)=>{
        this.ciudadId.id = res.id;
        this.ciudadId.nombreCiudad = res.data().nombreCiudad;
        this.ciudadId.habitantes = res.data().habitantes;
        console.log(this.ciudadId);
      }
    )
  }

  //Función para editar una ciudad
  editarCiudad(id){
    this.firestoreDb.collection('Ciudades').doc(id).set(this.ciudadId).then(()=>{
      console.log("Ciudad Editada");

    }).catch((err)=>{
      console.log(err);
    })
  }

  //Función para eliminar una ciudad
  eliminarCiudad(id){
    this.firestoreDb.collection('Ciudades').doc(id).delete().then(()=>{
      console.log("Ciudad Eliminada");

    }).catch((err)=>{
      console.log(err);
    })
  }

}
