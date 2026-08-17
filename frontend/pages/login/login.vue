<style>
  

</style>

<template>


    <div class="container">
<div id="login-section" class="card" style="max-width: 420px; margin: 3rem auto;">
            <h3 style="color: var(--primary-dark); font-weight: 600; text-align: center;">เข้าสู่ระบบเจ้าหน้าที่</h3>
            <p style="text-align: center; color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">เข้าสู่ระบบเพื่อจัดการและอนุมัติคำขอทุน</p>
          
<center> 
<br>  
<span style="color:red;text-align:center;margin:10px;">{{state.message}}</span>
</br>
</center>

<UForm
  :state="state"
  :validate="validate"
  @submit="handleLogin"
  class="create-form max-w-sm mx-auto"
>


  <UFormField
    label="Username"
    name="username"
    class="mb-5"
  >
    <UInput
      v-model="state.username"
      type="text"
      class="w-full"
      placeholder="กรอก Username"
    />
  </UFormField>

  <UFormField
    label="Password"
    name="password"
    class="mb-5"
  >
    <UInput
      v-model="state.password"
      type="password"
      class="w-full"
      placeholder="กรอก Password"
    />
  </UFormField>

  <UButton
    size="xl"
    class="btn w-full justify-center" 
    type="submit"
    style="width: 100%; margin-top: 0.5rem; padding: 0.8rem; text-align: center;"
    label="เข้าสู่ระบบ"
  >
  </UButton>
</UForm>
        </div>
    </div>
</template>
<script setup lang="ts">

import axios from 'axios';
import { useGlobal } from '~/helpers/custom.js';
const p = useGlobal();

const state = reactive({
  username: '',
  password: ''
})

onMounted(() => {
});



function handleLogin(){
  
    const token = useCookie('token');

    var dataform = new FormData();
    dataform.append('username', state.username)
    dataform.append('password', state.password)

    const config = {
            headers: {
                "Content-Type": "multipart/form-data",
             
            },
         };
        
        axios.post("http://localhost:5000/login", dataform,config).then(response => { 
                console.log(response.data);
                
                if(response.data.success==true){
                   token.value = response.data.token;
                   window.location.href = '/admin/home';
                }else{
                    state.message = response.data.message;
                }
        }).catch((error) => {
                console.log("error : "+error);
        }); 
}


function validate(state: any) {
  const errors: { name: string; message: string }[] = []

  // Validate Username
  if (!state.username) {
    errors.push({
      name: 'username',
      message: 'กรุณากรอก Username'
    })
  } else if (state.username.length < 4) {
    errors.push({
      name: 'username',
      message: 'Username ต้องมีอย่างน้อย 4 ตัวอักษร'
    })
  } else if (!/^[a-zA-Z0-9_]+$/.test(state.username)) {
    errors.push({
      name: 'username',
      message: 'Username ใช้ได้เฉพาะตัวอักษร ตัวเลข และ _'
    })
  }

  // Validate Password
  if (!state.password) {
    errors.push({
      name: 'password',
      message: 'กรุณากรอก Password'
    })
  } else if (state.password.length < 6) {
    errors.push({
      name: 'password',
      message: 'Password ต้องมีอย่างน้อย 6 ตัวอักษร'
    })
  }

  return errors
}
     
</script>