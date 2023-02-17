import { defineStore } from "pinia";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, } from "firebase/auth";

export const useUserStore = defineStore("user",{
    state: () => {
        return{
            user: null,
        };
        
    },

    actions:{
        async register(email, password){
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
                switch(error.code){
                    case "auth/amil-already-in-use":
                        alert("Email ya esta en uso");
                        break;
                    case "auth/invalid-email":
                        alert("Email invalido");
                        break;
                }
                return;
            }
        this.user = auth.currentUser;
        this.$router.push("/dashboard")
        },

        async login(email, password){
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                switch(error.code){
                    case "auth/user-not-found":
                        alert("Usuario no encontrado");
                        break;
                    case "auth/wrong-password":
                        alert("Contraseña invalida");
                        break;
                }
                return;
            }
        this.user = auth.currentUser;
        this.$router.push("/dashboard")
        },

        async logout(){
            await signOut(auth);
            this.user = null;
            this.$router.push("/login");
        },
        
        
    },
});