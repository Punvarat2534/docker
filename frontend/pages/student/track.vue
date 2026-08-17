<style>
  .hidden {
  display: none;
}
</style>

<template>


    <div class="container">

     <div id="track-section" class="card">
            <h3 style="color: var(--primary-dark); font-weight: 600;">🔍 ตรวจสอบข้อมูลและสถานะคำขอทุนการศึกษา</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">กรอกรหัสนักศึกษา (10-13 หลัก) หรือ ชื่อ-สกุล เพื่อค้นหาคำขอของคุณ</p>
            
            <div class="search-box-container">
                <input type="text" v-model="state.Stext" placeholder="ระบุ รหัสนักศึกษา หรือ ชื่อ-สกุล...">
                <UButton size="xl" class="btn" type="submit" style="cursor:pointer;" @click="showDetailBox" label="ค้นหาข้อมูล"></UButton>
            </div>

            <!-- กล่องแสดงผลการค้นหา -->
            <div id="trackResultContainer" v-show="isShow" style="margin-top: 2rem;">
            <div class="table-responsive">
                    <table style="width:100%;">
                        <thead>
                            <tr>
                               <th style="width:20%;">เลขที่คำขอ</th>
                               <td>{{state.scholar_code}}</td>
                            </tr>
                            <tr>
                                <th>รหัส-ชื่อนักศึกษา</th>
                                <td>{{state.student_id}} {{state.student_name}}</td>
                            </tr>
                            <tr>
                                <th>ประเภททุน</th>
                                <td>{{state.scholar_typ}}</td>
                            </tr>
                            <tr>
                                <th>จำนวนเงิน</th>
                                <td>{{state.amount}}</td>
                            </tr>
                            <tr>
                                <th>สถานะ</th>
                                <td>{{state.status}}</td>
                            </tr>
                            <tr>
                                <th>วันที่ยื่น</th>
                                <td>{{state.scholar_date}}</td>
                            </tr>
                            
                          
                            </thead>
                    </table>

            </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import axios from 'axios';
import { useGlobal } from '~/helpers/custom.js';
const p = useGlobal();
const showDetail = ref(false)
const isShow = ref(false);
function showDetailBox() {

isShow.value = !isShow.value
const Stext = state.Stext ? state.Stext.trim() : 'x';

axios.get(`http://localhost:5000/track/${encodeURIComponent(Stext)}`).then(response => { 
                console.log(response.data);
                if(response.data.success==true){
                    state.scholar_code = response.data.data[0].scholar_code;
                    state.student_id = response.data.data[0].student_id; 
                    state.student_name = response.data.data[0].student_name;
                    state.scholar_typ = response.data.data[0].scholar_typ;
                    state.amount = response.data.data[0].amount;
                    state.status = response.data.data[0].status;
                    state.scholar_date = response.data.data[0].scholar_date;

                }
}).catch((error) => {
                console.log("error : "+error);
});
}

const state = reactive({
});

onMounted(() => {
});

const rcodno = computed(() => {

});

const Pagination = computed(() => {
 
});

     
</script>