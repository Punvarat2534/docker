<style>





</style>

<template>


    <div class="container">

    <!-- ส่วนจัดการสำหรับเจ้าหน้าที่ (Admin Area) -->
        <div id="admin-section">
            <div class="card">
                <h3 style="color: var(--primary-dark); font-weight: 600;">ช) แดชบอร์ดสรุปภาพรวม (Dashboard)</h3>
                <br>
                <div class="stats-grid">
                    <div class="stat-card" style="border-top-color: var(--primary);">
                        <div style="color: var(--text-muted); font-size: 0.9rem;">จำนวนคำขอทั้งหมด</div>
                        <div class="stat-number" id="dash-total">{{state.s}}</div>
                    </div>
                    <div class="stat-card" style="border-top-color: var(--warning);">
                        <div style="color: var(--text-muted); font-size: 0.9rem;">รอพิจารณา</div>
                        <div class="stat-number" id="dash-pending" style="color: var(--warning);">{{state.w}}</div>
                    </div>
                    <div class="stat-card" style="border-top-color: var(--success-hover);">
                        <div style="color: var(--text-muted); font-size: 0.9rem;">อนุมัติแล้ว</div>
                        <div class="stat-number" id="dash-approved" style="color: var(--success-hover);">{{state.a}}</div>
                    </div>
                    <div class="stat-card" style="border-top-color: var(--danger);">
                        <div style="color: var(--text-muted); font-size: 0.9rem;">ไม่อนุมัติ</div>
                        <div class="stat-number" id="dash-rejected" style="color: var(--danger);">{{state.c}}</div>
                    </div>
                </div>

                <div style="max-width: 650px; margin: auto; padding-top: 1rem;">
                   <div class="w-full max-w-3xl" style="
    width: 100%;
    max-width: 650px;
    height: 350px;
    margin: auto;
    padding-top: 1rem;
  ">
    <Bar :data="data" :options="options" />
  </div>
                </div>
            </div>

            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                    <h3 style="color: var(--primary-dark); font-weight: 600;">รายการคำขอทุนการศึกษา</h3>
                    
                    <!-- modal -->
                    <UModal 
                    :close="{color: 'primary',variant: 'outline',class: 'rounded-full'}"
                    :ui="{ content: 'xl:max-w-xl ', body: 'p-6 flex-2',header: 'px-6 py-6'}"
                    >

                    
                     <!-- modal button -->
                    <UButton label="+ เพิ่มคำขอใหม่ (เจ้าหน้าที่)" class="btn btn-success" color="neutral" variant="subtle" />
                    <template #title>
                    <span class="text-blue-500 text-2xl font-bold">
                    &nbsp;&nbsp;&nbsp;เพิ่มคำขอใหม่
                    </span>
                    </template>

                    <template  #body class="modal">
                    <center>
                    <br>
                    <UForm  enctype="multipart/form-data" :validate="validate" :state="createState" class="create-form max-w-sm mx-auto max-w-lg mx-auto" @submit="handleStudentSubmit();">
                    <div class="form-group">
                    <UFormField label="รหัสนักศึกษา *" name="studentId" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="createState.studentId" type="text" size="ml" color="neutral" variant="outline" class="w-full" placeholder="เช่น 650110001"  />
                    </UFormField>

                    <UFormField label="ชื่อ-นามสกุล *" name="studentNm" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="createState.studentNm" type="text" size="ml" color="neutral" variant="outline" class="w-full" placeholder="ชื่อ และ นามสกุล"  />
                    </UFormField>

                    <UFormField label="คณะ/สาขา *" name="faculty" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="createState.faculty" type="text" size="ml" color="neutral" variant="outline" class="w-full" placeholder="ระบุคณะและสาขาวิชา" />  
                    </UFormField>

                    <UFormField label="ชั้นปี *" name="year" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <USelect required v-model="createState.year" value-key="id" :items="years" default-value="-- เลือก ชั้นปี --" size="ml" color="neutral" variant="outline" class="custom-select" />
                    </UFormField>

                    <UFormField label="เกรดเฉลี่ยสะสม (GPAX) *" name="gpa" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="createState.gpa" type="number" size="ml" color="neutral" variant="outline" class="w-full" step="0.01" min="0" max="4.00" placeholder="0.00 - 4.00" />
                    </UFormField>

                    <UFormField label="Email" name="email" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="createState.email" type="email" size="ml" color="neutral" variant="outline" class="w-full" placeholder="example@email.com" />
                    </UFormField>                    

                    <UFormField label="ประเภททุน *" name="scholar_typ" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <USelect required v-model="createState.scholar_typ" value-key="id" :items="scholar_typs" default-value="-- เลือก ประเภททุน --"  size="ml" color="neutral" variant="outline" class="custom-select" />
                    </UFormField>

                    <UFormField label="จำนวนเงินที่ขอ (บาท) *" name="amount" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="createState.amount" type="number" size="ml" color="neutral" variant="outline" class="w-full" min="1"   placeholder="ระบุจำนวนเงิน" />
                    </UFormField>

                    <UFormField label="เลขที่บัญชีธนาคาร *" name="bankAccount" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput v-model="createState.bankAccount" type="text" inputmode="numeric" maxlength="12" class="w-full" placeholder="เฉพาะตัวเลข 10-12 หลัก" />
                    </UFormField>

                    <UFormField label="ธนาคาร *" name="bankName" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <USelect required v-model="createState.bankName" value-key="id" :items="bankNames" default-value="-- เลือก ธนาคาร --" size="ml" color="neutral" variant="outline" class="custom-select" />
                    </UFormField>

                    <UFormField label="วันที่ยื่น *" name="scholarDate" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="createState.scholarDate" type="date" size="ml" color="neutral" variant="outline" class="w-full" placeholder="เฉพาะตัวเลข 10-12 หลัก" pattern="[0-9]{10,12}" />
                    </UFormField>

                    <UFormField label="เหตุผลการขอทุน" name="reason" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UTextarea required v-model="createState.reason" type="text" size="ml" color="neutral" variant="outline" class="w-full" placeholder="อธิบายเหตุผลหรือความจำเป็นในการขอรับทุน..."  />
                    </UFormField>
                    </div>
                    
                    <div class="form-group">
                       
                    <br>
                    <UButton size="xl" class="btn" type="submit" style="cursor:pointer;" label="บันทึกการเปลี่ยนแปลง"></UButton>
                    </div>
                 
                    </UForm>
                    </center>
                    </template>
                    </UModal>
                    <!-- end modal -->         
                </div>

                <!-- ส่วนตาราง --> 
                <div class="toolbar">
                    <input type="text" style="width:460px;" v-model="state.Stext" placeholder="🔍 ค้นหา รหัสนักศึกษา / ชื่อ..." @keyup="Search" >                      
                    <USelect required v-model="state.Sscholar_typ" value-key="id" :items="scholar_typs" @change="Search" default-value="-- กรองประเภททุนทั้งหมด --"  size="ml" color="neutral" variant="outline" style="width:250px;" class="custom-select" />
                    <USelect required v-model="state.Sstatus" value-key="id" :items="status" @change="Search"  default-value="-- กรองสถานะทั้งหมด --"  size="ml" color="neutral" variant="outline" style="width:250px;" class="custom-select" /> 
                </div>


                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>เลขที่คำขอ</th>
                                <th>รหัส-ชื่อนักศึกษา</th>
                                <th>ประเภททุน</th>
                                <th>จำนวนเงิน</th>
                                <th>สถานะ</th>
                                <th>วันที่ยื่น</th>
                                <th></th>
                            </tr>
                            <tr v-for="(scholar,index) in state.scholar" :key="scholar.id">
                            <td style="width:2%;">{{rcodno+index}}</td>
                            <td style="width:2%;">{{scholar.scholar_code}}</td>
                            <td style="width:10%;">{{scholar.student_id}}-{{scholar.student_name}}</td>
                            <td style="width:5%;">{{scholar.scholar_typ}}</td>
                            <td style="width:5%;">{{scholar.amount}}</td>
                            <td style="width:5%;">{{scholar.status}}</td>
                            <td style="width:5%;">{{scholar.scholar_date}}</td>
                            <td style="width:1%;">
                            
        <!-- modalแก้ไช -->
                    <UModal  title="แก้ไขข้อมูล"  
                    :close="{color: 'primary',variant: 'outline',class: 'rounded-full'}"
                    :ui="{ 
                      content: 'xl:max-w-xl',
                      header: 'px-6 py-6',
                      title: 'ml-8'
                    }"
    
                    >
                     <!-- modal button -->
                    <UButton icon="i-heroicons-pencil-square" class="btn btn-warning" color="neutral" variant="subtle" @click="detail(scholar.scholar_code)" />
                    <template #title>
                    <span style="text-align:center;" class="text-blue-500 text-2xl font-bold">
                      &nbsp;&nbsp;&nbsp;แก้ไขคำขอ
                    </span>
                    </template>
                    <template  #body class="modal">
                    <center>
                    <br>
                    <UForm @submit="handleStudentUpdate2" enctype="multipart/form-data" :validate="validate" :state="editState" class="create-form max-w-sm mx-auto max-w-lg mx-auto" >
                 

                     <UFormField label="รหัสทุน" name="scholar_code" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required  v-model="editState.scholar_code" type="text" size="ml"  class="w-full"  />
                    </UFormField>

                     <div class="form-group">
                    <UFormField label="แก้ไขสถานะคำขอ" name="status" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <USelect required v-model="editState.status" value-key="id" :items="status"  default-value="-- กรองสถานะทั้งหมด --"  size="ml" color="neutral" variant="outline" class="custom-select" /> 
                    </UFormField>
                    

                    <UFormField label="หมายเหตุสำหรับ Admin (ถ้ามี)" name="reaply" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UTextarea v-model="editState.reaply" type="text" size="ml" color="neutral" variant="outline" class="w-full" placeholder="หมายเหตุ..."  />
                    </UFormField>
                    
                    
                    </div>
                    <hr>
                    <br>
                    <div class="form-group">
                    <UFormField label="รหัสนักศึกษา *" name="studentId" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="editState.studentId" type="text" size="ml" color="neutral" variant="outline" class="w-full" placeholder="เช่น 650110001"  />
                    </UFormField>

                    <UFormField label="ชื่อ-นามสกุล *" name="studentNm" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="editState.studentNm" type="text" size="ml" color="neutral" variant="outline" class="w-full" placeholder="ชื่อ และ นามสกุล"  />
                    </UFormField>

                    <UFormField label="คณะ/สาขา *" name="faculty" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="editState.faculty" type="text" size="ml" color="neutral" variant="outline" class="w-full" placeholder="ระบุคณะและสาขาวิชา" />  
                    </UFormField>

                    <UFormField label="ชั้นปี *" name="year" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <USelect required v-model="editState.year" value-key="id" :items="years" default-value="-- เลือก ชั้นปี --" size="ml" color="neutral" variant="outline" class="custom-select" />
                    </UFormField>

                    <UFormField label="เกรดเฉลี่ยสะสม (GPAX) *" name="gpa" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="editState.gpa" type="number" size="ml" color="neutral" variant="outline" class="w-full" step="0.01" min="0" max="4.00" placeholder="0.00 - 4.00" />
                    </UFormField>

                    <UFormField label="Email" name="email" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="editState.email" type="email" size="ml" color="neutral" variant="outline" class="w-full" placeholder="example@email.com" />
                    </UFormField>                    

                    <UFormField label="ประเภททุน *" name="scholar_typ" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <USelect required v-model="editState.scholar_typ" value-key="id" :items="scholar_typs" default-value="-- เลือก ประเภททุน --"  size="ml" color="neutral" variant="outline" class="custom-select" />
                    </UFormField>

                    <UFormField label="จำนวนเงินที่ขอ (บาท) *" name="amount" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="editState.amount" type="number" size="ml" color="neutral" variant="outline" class="w-full" min="1"   placeholder="ระบุจำนวนเงิน" />
                    </UFormField>

                    <UFormField label="เลขที่บัญชีธนาคาร *" name="bankAccount" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput v-model="editState.bankAccount" type="text" inputmode="numeric" maxlength="12" class="w-full" placeholder="เฉพาะตัวเลข 10-12 หลัก" />
                    </UFormField>

                    <UFormField label="ธนาคาร *" name="bankName" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <USelect required v-model="editState.bankName" value-key="id" :items="bankNames" default-value="-- เลือก ธนาคาร --" size="ml" color="neutral" variant="outline" class="custom-select" />
                    </UFormField>

                    <UFormField label="วันที่ยื่น *" name="scholarDate" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UInput required v-model="editState.scholarDate" type="date" size="ml" color="neutral" variant="outline" class="w-full" placeholder="เฉพาะตัวเลข 10-12 หลัก" pattern="[0-9]{10,12}" />
                    </UFormField>

                    <UFormField label="เหตุผลการขอทุน" name="reason" :ui="{error: 'text-left text-red-500 text-sm'}">
                    <UTextarea required v-model="editState.reason" type="text" size="ml" color="neutral" variant="outline" class="w-full" placeholder="อธิบายเหตุผลหรือความจำเป็นในการขอรับทุน..."  />
                    </UFormField>
                    </div>
                    
                    <div class="form-group">
                    <br>
                    <UButton size="xl" class="btn" type="submit" style="cursor:pointer;" label="แก้ไขการเปลี่ยนแปลง"></UButton>
                    </div>
                    </UForm>
                    </center>
                    </template>
                    </UModal>
<!-- end modal -->
                    <UModal
                    :close="{color: 'primary',variant: 'outline',class: 'rounded-full'}"
                    :ui="{ content: 'xl:max-w-xl ', body: 'p-6 flex-2',header: 'px-6 py-6'}"
                    >
                    <UButton icon="i-heroicons-trash" class="btn btn-danger" color="red" @click="handleDelete"></UButton>
                    <template #title>
                    <span style="text-align:center;" class="text-blue-500 text-2xl font-bold">
                      &nbsp;&nbsp;&nbsp;ลบคำขอ
                    </span>
                    </template>
                    <template  #body class="modal">
                 
                 
                    <div v-if="scholar.status == 'รอพิจารณา'">
                      <div class="form-group" style="text-align:center;">
                      <h1>คุณต้องการลบข้อมูลหรือไม่?</h1>
                      <br>                                
                      <UButton @click="deletes(scholar.scholar_code)" size="xl" class="btn" type="submit" style="cursor:pointer;" label="ยืนยัน"></UButton>
                      </div>
                    </div>

                    <div v-else>
                    <div class="form-group" style="text-align:center;">
                    <h1>คุณไม่สามารถลบข้อมูลได้</h1>
                    </div>
                    <br><br>
                    </div> 
                   
                    </template>
                    </UModal>
                    <!-- end modal -->    

                            </td>
                          </tr>
                        </thead>
                      
                    </table>
                </div>

             
                

<br>
<center>
<b>Page <UInput v-model="state.pagestext" type="text" style="width:50px;height:40px;text-align:center;border:1px solid #999;padding:0;" /> of {{state.rcordcnt}}</b>

<ul class="pagination">
<li v-on:click="all(1)"><b><font-awesome icon="angle-double-left" style="font-size:12pt;cursor:pointer;" /></b></li>
<li v-on:click="all(state.pages-1)"><b><font-awesome icon="chevron-left" style="font-size:12pt;cursor:pointer;" /></b></li>
<li v-for="n in Pagination" :class="checkIfpageActive(n)" v-on:click="all(n)">{{ n }}</li>
<li v-on:click="all(state.pages+1)"><b><font-awesome icon="chevron-right" style="font-size:12pt;cursor:pointer;" /></b></li>
<li v-on:click="all(state.rcordcnt)"><b><font-awesome icon="angle-double-right" style="font-size:12pt;cursor:pointer;" /></b></li>
</ul>
</center>

            </div>
        </div>

   </div>
   
</template>
<script setup lang="ts">

import axios from 'axios';
import { useGlobal } from '~/helpers/custom.js';
import type { SelectItem } from '@nuxt/ui';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'vue-chartjs'


definePageMeta({
  middleware: 'auth'
})

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const data = computed(() => ({
  labels: [
    'ทั้งหมด',
    'รอพิจารณา',
    'อนุมัติ',
    'ไม่อนุมัติ'
  ],
  datasets: [
    {
      label: 'จำนวนทุน',
      data: [
        Number(state.s ?? 0),
        Number(state.w ?? 0),
        Number(state.a ?? 0),
        Number(state.c ?? 0)
      ],
      backgroundColor: [
        '#3B82F6',
        '#F59E0B',
        '#10B981',
        '#EF4444'
      ],
      borderRadius: 6
    }
  ]
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0
      }
    }
  }
}

const createState = reactive({
  studentId: '',
  studentNm: '',
  faculty: '',
  year: '',
  gpa: '',
  email: '',
  scholar_typ: '',
  amount: '',
  bankAccount: '',
  bankName: '',
  scholarDate: '',
  reason: '',
})

const editState = reactive({
  scholar_code: '',
  status: '',
  reaply: '',
  studentId: '',
  studentNm: '',
  faculty: '',
  year: '',
  gpa: '',
  email: '',
  scholar_typ: '',
  amount: '',
  bankAccount: '',
  bankName: '',
  scholarDate: '',
  reason: ''
})

const years = ref<SelectItem[]>([
  {
    label: 'ชั้นปีที่ 1',
    id: 1
  },
  {
    label: 'ชั้นปีที่ 2',
    id: 2
  },
  {
    label: 'ชั้นปีที่ 3',
    id: 3
  },
  {
    label: 'ชั้นปีที่ 4',
    id: 4
  }
]);

const status = ref<SelectItem[]>([
  {
    label: '-- กรองสถานะทั้งหมด --',
    id: '0'
  },
  {
    label: 'รอพิจารณา',
    id: 'รอพิจารณา'
  },
  {
    label: 'อนุมัติ',
    id: 'อนุมัติ'
  },
  {
    label: 'ไม่อนุมัติ',
    id: 'ไม่อนุมัติ'
  },
]);

const scholar_typs = ref<SelectItem[]>([
  {
    label: '-- กรองประเภททุนทั้งหมด --',
    id: '0'
  },
  {
    label: 'ทุนขาดแคลนทุนทรัพย์',
    id: 'ทุนขาดแคลนทุนทรัพย์'
  },
  {
    label: 'ทุนส่งเสริมการศึกษา (เรียนดี)',
    id: 'ทุนส่งเสริมการศึกษา (เรียนดี)'
  },
  {
    label: 'ทุนทำงานพิเศษ (นักศึกษาช่วยงาน)',
    id: 'ทุนทำงานพิเศษ (นักศึกษาช่วยงาน)'
  },
  {
    label: 'ทุนฉุกเฉิน/ช่วยเหลือกรณีพิเศษ',
    id: 'ทุนฉุกเฉิน/ช่วยเหลือกรณีพิเศษ'
  },
  {
    label: 'ทุนกิจกรรมนักศึกษา',
    id: 'ทุนกิจกรรมนักศึกษา'
  }
]);

const bankNames = ref<SelectItem[]>([
  {
    label: 'ไทยพานิชย์',
    id: 'ไทยพานิชย์'
  },
  {
    label: 'กสิกรไทย',
    id: 'กสิกรไทย'
  },
  {
    label: 'กรุงไทย',
    id: 'กรุงไทย'
  },
  {
    label: 'กรุงเทพ',
    id: 'กรุงเทพ'
  },
  {
    label: 'กรุงศรีอยุธยา',
    id: 'กรุงศรีอยุธยา'
  }
]);

const p = useGlobal();

const state = reactive({
    scholar:[],
    pages:[],
    rcordcnt:[],
    no:[],
    pagestext:[],
    Stext:'',
    Sstatus:'-- กรองสถานะทั้งหมด --',
    Sscholar_typ:'-- กรองประเภททุนทั้งหมด --',
    url_endpoint:'http://localhost:5000',
    w:0,
    a:0,
    c:0,
    s:0
});


onMounted(() => {
    fnrcordcnt();
    all(1);
    state.pages = 1;
    state.pagestext=1;
    setStatus();
});

const rcodno = computed(() => {
  if(state.page==1){
      state.no = 0;
  }else{
      state.no = (parseInt(state.pages)-1)*10;
  }  
  
  let no = parseInt(state.no)+1;
  state.no = no;
  return no;
});

const Pagination = computed(() => {
  let arr = [];
        var start= state.pages-2;
        var end=  state.pages+2;
   
        if(state.pages<=state.rcordcnt){
          if(state.pages<=5){
            start=1;
            end=state.rcordcnt;
          }else if(state.pages > (state.rcordcnt-3) && state.pages <= (state.rcordcnt)){
            start=state.rcordcnt-4;
            end=state.rcordcnt;
          }else{
            start=state.pages-2;
            end=parseInt(state.pages)+2;
          }

          for (var i = start; i <= end; i++)
            arr.push(i);
            return arr;
          }
});
  
async function setstate(){
    state.url_endpoint = await p.url_endpoint();
    state.tokens = await p.xcrfstokens();
}

async function detail(code){
            
            //const tokens = await p.xcrfstokens();
            //const rcord = await fnrcordcnt();

            /*const config = {
                headers: {
                "Content-Type": "multipart/form-data",
                //"Authorization": "Bearer "+tokens
                },
            };*/

              axios.get("http://localhost:5000/detail/"+code)
                .then(response => {	
                editState.studentId = response.data.data[0].student_id;
                editState.studentNm = response.data.data[0].student_name;   
                editState.faculty = response.data.data[0].faculty;  
                editState.year = response.data.data[0].years;   
                editState.gpa = response.data.data[0].gpa;
                editState.email = response.data.data[0].email; 

                editState.scholar_typ = response.data.data[0].scholar_typ; 
                editState.amount = response.data.data[0].amount; 
                editState.bankAccount = response.data.data[0].bank_code;
                editState.bankName = response.data.data[0].bank_name;
                editState.reason = response.data.data[0].scholar_reason;
                editState.status = response.data.data[0].status;
                editState.scholarDate = response.data.data[0].scholar_date;
                editState.reaply = response.data.data[0].remark;
                editState.scholar_code = response.data.data[0].scholar_code; 
   
              }).catch(error => {
                alert(error);
              });
            
}

function checkIfpageActive(p) {
    if ((p == state.pages)|| (p == state.pagestext)) {          
      return "active";
    }
}

async function setStatus(){
    //var url_endpoint = await p.url_endpoint();
    const result = await axios.get("http://localhost:5000/statuscnt")
            .then(response => {	
              state.s = response.data.s;
              state.w = response.data.w;
              state.a = response.data.a;
              state.c = response.data.c;
              return response.data;          
            })
            .catch(error => {
              alert(error);
            });

            return result;
}

async function fnrcordcnt(){
    var url_endpoint = await p.url_endpoint();
    const result = await axios.get("http://localhost:5000/pagecount")
            .then(response => {	
              state.rcordcnt = parseInt(response.data);
              return response.data;          
            })
            .catch(error => {
              alert(error);
            });

            return result;
}




function  handleStudentUpdate2(){

          var dataform = new FormData();
       dataform.append('student_name', editState.studentNm)
  dataform.append('faculty', editState.faculty)
  dataform.append('years', editState.year)
  dataform.append('gpa', editState.gpa)
  dataform.append('email', editState.email)
  dataform.append('scholar_typ', editState.scholar_typ)
  dataform.append('amount', editState.amount)
  dataform.append('bank_code', editState.bankAccount)
  dataform.append('bank_name', editState.bankName)
  dataform.append('scholar_reason', editState.reason)
  dataform.append('status', editState.status)
  dataform.append('scholar_date', editState.scholarDate)
  dataform.append('scholar_code', editState.scholar_code)
  dataform.append('remark', editState.reaply)


         const config = {
            headers: {
                "Content-Type": "multipart/form-data",
             
            },
         };
        
        axios.post("http://localhost:5000/update", dataform,config).then(response => { 
                console.log(response.data);
                if(response.data.success==true){
                    window.location.href = '/admin/success'
                }
        }).catch((error) => {
                console.log("error : "+error);
        }); 
}




function  handleStudentSubmit(){

          var dataform = new FormData();
          dataform.append('student_id', createState.studentId);
          dataform.append('student_name', createState.studentNm);
          dataform.append('faculty', createState.faculty);
          dataform.append('years', createState.year);
          dataform.append('gpa', createState.gpa);
          dataform.append('email', createState.email);
          dataform.append('scholar_typ', createState.scholar_typ);
          dataform.append('amount', createState.amount);
          dataform.append('bank_code', createState.bankAccount);
          dataform.append('bank_name', createState.bankName);
          dataform.append('scholar_reason', createState.reason);
          dataform.append('status', 'รอพิจารณา');
          dataform.append('user', 'admin');
          dataform.append('scholar_date', createState.scholarDate);
          dataform.append('pdpa', 1);

         const config = {
            headers: {
                "Content-Type": "multipart/form-data",
             
            },
        };

        axios.post("http://localhost:5000/create", dataform,config).then(response => { 
                console.log(response.data);
                if(response.data.success==true){
                    window.location.href = '/admin/success'
                }
        }).catch((error) => {
                console.log("error : "+error);
        }); 
}

function deletes(code){
      const config = {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            };

              axios.delete("http://localhost:5000/delete/"+code)
                .then(response => {	
                      window.location.reload();
              }).catch(error => {
                alert(error);
              });

}

async function all(pgs){
 
            const tokens = await p.xcrfstokens();
            const rcord = await fnrcordcnt();

            const config = {
                headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer "+tokens
                },
            };

          
            if((pgs>0)&&(pgs<=parseInt(state.rcordcnt))){    
              
              state.pages=pgs;
              state.pagestext = pgs;
              axios.get("http://localhost:5000/all/"+pgs)
                .then(response => {	
                state.scholar = response.data.data;        
              }).catch(error => {
                alert(error);
              });

            }
}

async function Search(event){
const Stext = state.Stext ? state.Stext.trim() : 'x';
const Scholar_typ = state.Sscholar_typ ? state.Sscholar_typ.trim() : 'x';
const Status = state.Sstatus ? state.Sstatus.trim() : 'x';

//alert(Status);
/*const config = {
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer "+state.tokens
    },
};*/

axios.get(`http://localhost:5000/search/${encodeURIComponent(Stext)}/${encodeURIComponent(Scholar_typ)}/${encodeURIComponent(Status)}`).then(response => { 
                console.log(response.data);
                if(response.data.success==true){
                    state.scholar = response.data.data;   
                }
}).catch((error) => {
                console.log("error : "+error);
});
}



const validate = (formState: any) => {
  const errors: { name: string; message: string }[] = []

  // =========================
  // รหัสนักศึกษา
  // =========================
  if (!formState.studentId?.toString().trim()) {
    errors.push({
      name: 'studentId',
      message: 'กรุณากรอกรหัสนักศึกษา'
    })
  } else if (!/^\d{10}$/.test(formState.studentId.toString().trim())) {
    errors.push({
      name: 'studentId',
      message: 'รหัสนักศึกษาต้องเป็นตัวเลข 10 หลัก'
    })
  }

  // =========================
  // ชื่อ-นามสกุล
  // =========================
  if (!formState.studentNm?.toString().trim()) {
    errors.push({
      name: 'studentNm',
      message: 'กรุณากรอกชื่อ-นามสกุล'
    })
  }

  // =========================
  // คณะ/สาขา
  // =========================
  if (!formState.faculty?.toString().trim()) {
    errors.push({
      name: 'faculty',
      message: 'กรุณาระบุคณะ/สาขา'
    })
  }

  // =========================
  // ชั้นปี
  // =========================
  if (
    formState.year === null ||
    formState.year === undefined ||
    formState.year === ''
  ) {
    errors.push({
      name: 'year',
      message: 'กรุณาเลือกชั้นปี'
    })
  }

  // =========================
  // GPAX
  // =========================
  if (
    formState.gpa === '' ||
    formState.gpa === null ||
    formState.gpa === undefined
  ) {
    errors.push({
      name: 'gpa',
      message: 'กรุณากรอก GPAX'
    })
  } else {
    const gpa = Number(formState.gpa)

    if (Number.isNaN(gpa) || gpa < 0 || gpa > 4) {
      errors.push({
        name: 'gpa',
        message: 'GPAX ต้องอยู่ระหว่าง 0.00 - 4.00'
      })
    }
  }

  // =========================
  // Email
  // =========================
  if (!formState.email?.toString().trim()) {
    errors.push({
      name: 'email',
      message: 'กรุณากรอก Email'
    })
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formState.email.toString().trim()
    )
  ) {
    errors.push({
      name: 'email',
      message: 'รูปแบบ Email ไม่ถูกต้อง'
    })
  }

  // =========================
  // ประเภททุน
  // =========================
  if (!formState.scholar_typ) {
    errors.push({
      name: 'scholar_typ',
      message: 'กรุณาเลือกประเภททุน'
    })
  }

  // =========================
  // จำนวนเงิน
  // =========================
  if (
    formState.amount === '' ||
    formState.amount === null ||
    formState.amount === undefined
  ) {
    errors.push({
      name: 'amount',
      message: 'กรุณาระบุจำนวนเงิน'
    })
  } else {
    const amount = Number(formState.amount)

    if (Number.isNaN(amount) || amount < 1) {
      errors.push({
        name: 'amount',
        message: 'จำนวนเงินต้องมากกว่า 0'
      })
    }
  }

  // =========================
  // เลขบัญชีธนาคาร
  // =========================
  if (!formState.bankAccount?.toString().trim()) {
    errors.push({
      name: 'bankAccount',
      message: 'กรุณากรอกเลขที่บัญชีธนาคาร'
    })
  } else if (
    !/^\d{10,12}$/.test(
      formState.bankAccount.toString().trim()
    )
  ) {
    errors.push({
      name: 'bankAccount',
      message: 'เลขบัญชีต้องเป็นตัวเลข 10-12 หลัก'
    })
  }

  // =========================
  // ธนาคาร
  // =========================
  if (!formState.bankName) {
    errors.push({
      name: 'bankName',
      message: 'กรุณาเลือกธนาคาร'
    })
  }

  // =========================
  // วันที่ยื่น
  // =========================
  if (!formState.scholarDate) {
    errors.push({
      name: 'scholarDate',
      message: 'กรุณาเลือกวันที่ยื่น'
    })
  }

  // =========================
  // เหตุผล
  // =========================
  if (!formState.reason?.toString().trim()) {
    errors.push({
      name: 'reason',
      message: 'กรุณากรอกเหตุผลการขอทุน'
    })
  }

  // =========================
  // สถานะ
  // ตรวจเฉพาะฟอร์มแก้ไข
  // =========================
  if ('status' in formState) {
    if (!formState.status) {
      errors.push({
        name: 'status',
        message: 'กรุณาระบุสถานะ'
      })
    }
  }

  return errors
}
    
</script>