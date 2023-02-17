<script setup>
import { useUserStore } from '../stores/user';
import { onMounted } from 'vue';
import { ref } from "vue";
import { PostStore } from '../stores/dbUsers';

const store = PostStore()

onMounted(() => {
  store.obtenerDato(); 
})

const nombre = ref(store.nombre1);
const apellido = ref(store.apellido1);
const cuit = ref(store.cuit1);
const empresa = ref(store.empresa1);
const telefono = ref(store.telefono1);
const direccion = ref(store.direccion1);  

const userStore = useUserStore();
const update = () => {
  store.updateItem(nombre.value, apellido.value, cuit.value, empresa.value, telefono.value, direccion.value);
};

const logout = () => {
  userStore.logout();
};
</script>

<template>
  <header class="head">
    <div class="config__var">
      <button class="config__logout" @click.prevent="logout">Logout</button>
      <router-link class="config__config" to="/dashboard">Dash</router-link
    >
    </div> 
  </header>
  <div class="estructura">
    <div class="configuracion">
    <h2>Mis datos</h2>
    <form @submit.prevent="update">
      <div class="config__input">
        <input type="text" required v-model="nombre"/>
        <label>Nombre</label>
      </div>
      <div class="config__input">
        <input type="text" required v-model="apellido" />
        <label>Apellido</label>
      </div>
      <div class="config__input">
        <input type="text" required v-model="cuit" />
        <label>Cuit</label>
      </div>
      <div class="config__input">
        <input type="text" required v-model="empresa" />
        <label>Empresa</label>
      </div>
      <div class="config__input">
        <input type="text" required v-model="telefono" />
        <label>Telefono</label>
      </div>
      <div class="config__input">
        <input type="text" required v-model="direccion" />
        <label>Direccion</label>
      </div>
      <div class="config__btn">
        <button class="config__submit" type="submit">Guardar</button>
      </div>                        
    </form>
                  
  </div>
  <div class="configuracion">
    <h2>Costos</h2>
    <form class="config__input">
      <div>
        <input>
        <label>Precios</label>
      </div>
    </form>
  </div>
  </div>

</template>

<style scoped>
.head {
  width: auto;
  height: 200px;
  margin-bottom: 0px;
  background-image: url(../assets/focos.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  clip-path: polygon(100% 0, 100% 100%, 50% 100%, 0 100%, 0 0);
  margin-bottom: 10px;
}
.estructura{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.configuracion {
  margin:auto;
  
  width: 400px;
  padding: 40px;
  background: #282828;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;

  
}

.configuracion h2 {
  margin-bottom: 30px;
  color: #fff;
  text-align: center;
}

.configuracion .config__input {
  position: relative;
}

.configuracion .config__input input {
  font-size: 18px;
  width: 100%;
  padding: 10px 0;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.configuracion .config__input label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.configuracion .config__input input:focus ~ label,
.configuracion .config__input input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.config__btn {
  display:flex;
  justify-content: center;
}

.config__submit {
  color: #1b1c1b;
  padding: 0.7em 1.7em;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: none;
  cursor: pointer;
  margin-right: 2em;
}

.config__var {
  display:flex;
  justify-content:end;
}

.config__logout {
  color: #1b1c1b;
  padding: 0.7em 1.7em;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 10px;
}

.config__config {
  color: #1b1c1b;
  padding: 0.7em 1.7em;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 10px;
  outline: none;
  text-decoration: none;
}
</style>
