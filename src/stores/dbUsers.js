import { defineStore } from "pinia"
import { collection, query, where, doc, getDocs, setDoc, updateDoc, getDoc  } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { useUserStore } from './user';

export const PostStore = defineStore({
    id: 'main',
    state: () => ({
        
            nombre1: "",
            apellido1: "",
            cuit1: "",
            empresa1: "",
            telefono1: "",
            direccion1: "",
            datos: [],               
    }),

    getters: {
        
    },

    actions: {
        async obtenerDatos () {
        const first = query(
           collection(db, "usuarios"), 
         );
         this.usuarios = [];
         const querySnapshot = await getDocs(first);
         querySnapshot.forEach((doc) => {
           let usuario = doc.data();
           usuario.id = doc.id;
           this.usuarios.push(usuario);
           console.log(this.usuarios);
         });},

        async obtenerDato(){
            const userStore = useUserStore();
            const auth = getAuth();
            const user = auth.currentUser;  
            const id = user.email;
            //this.nombre1 = [];
            const docRef = doc(db, "usuarios", id);
            const docSnap = await getDoc(docRef);
            let datos = docSnap.data()
            this.datos.push(docSnap.data());
            this.nombre1 = datos.nombre;
            this.apellido1 = datos.apellido;
            this.cuit1 = datos.cuit;
            this.empresa1 = datos.empresa;
            this.telefono1 = datos.telefono;
            this.direccion1 = datos.direccion;
            console.log(this.nombre1, "/" , this.apellido1, "/" , this.cuit1, "/" , this.empresa1, "/" , this.telefono1, "/" , this.direccion1);
            
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                console.log(id);
            } else {
                 // doc.data() will be undefined in this case
                 console.log("No such document!");
            }
            
            },
        

        async addItem(email){
            const docData = {
                nombre: "",
                apellido: "",
                cuit: "",
                empresa: "",
                telefono: "",
                direccion: "",
                
            }
            const userStore = useUserStore();
            const auth = getAuth();
            const user = auth.currentUser;
            const id = email;
            await setDoc(doc(db, "usuarios", id), docData);
        },

        async updateItem(nombre,apellido,cuit,empresa,telefono,direccion){
            const userStore = useUserStore();
            const auth = getAuth();
            const user = auth.currentUser;
            if (user !== null) {
            
            const id = user.email;
            console.log(id);
            const Ref = doc(db, "usuarios", id);
            await updateDoc(Ref, {
            nombre: nombre,
            apellido: apellido,
            cuit: cuit,
            empresa: empresa,
            telefono: telefono,
            direccion: direccion,
            });
            }
            
        }

       
    },
});