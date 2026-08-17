<style>

.tbl_detail{
  width:100%;
  margin:0 auto;
}

.tbl_detail th{
  padding:1em;
  text-align:left;
}

.pointer{
  cursor:pointer;
}
</style>

<template>
 <div class="container">
   <div class="text-align:center;margin:0 auto;">
       
       <center>
       <br><br><br><br>
        <font-awesome icon="check-circle" style="font-size:40pt;color:green;cursor:pointer;" /> <span style="font-size:25pt;"><b>Success</b></span>
        <br><br><br>
       
        <NuxtLink to="/admin/home" class="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><font-awesome icon="home" style="font-size:15pt;cursor:pointer;" />&nbsp;กลับหน้าแรก</NuxtLink>
        </center>    
   </div>
</div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            books:[],success:[]
        };
    },mounted() {

    },
    computed: {
    },
    methods:{
    
    },
};
</script>