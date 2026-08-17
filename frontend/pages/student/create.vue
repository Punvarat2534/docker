<style>
  
        /* Modal */
        .modal {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(30, 41, 59, 0.4); backdrop-filter: blur(4px);
            display: flex; justify-content: center; align-items: center; z-index: 100;
        }
        .modal-content { 
            background: white; padding: 2.5rem; border-radius: var(--radius-lg); max-width: 520px; width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-lg);
        }

</style>

<template>


    <div class="container">

 <!-- หน้าต่างยื่นคำขอสำหรับนักศึกษา (Public Form) -->
        <div id="student-form-section" class="card">
            <h3 style="color: var(--primary-dark); font-weight: 600;">ก) แบบฟอร์มยื่นคำขอทุนการศึกษา (สำหรับนักศึกษา)</h3>
            <hr style="margin: 1.2rem 0; border: none; border-top: 1px solid var(--border);">
         <UForm  enctype="multipart/form-data" :validate="validate" :state="createState" class="create-form" @submit="handleStudentSubmit();">
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
                    <UFormField  name="pdpaConsent">
                    <UCheckbox required v-model="createState.pdpaConsent" class="gap-3" default-value label="ยินยอมให้เก็บและใช้ข้อมูลส่วนบุคคลตามกฎหมาย (PDPA Consent)" /> 
                    </UFormField>  
                    <center>   
                    <br>
                    <UButton size="xl" class="btn" type="submit" style="cursor:pointer;" label="บันทึกการเปลี่ยนแปลง"></UButton>
                    </center>
                    </div>
                     
                    </UForm>
     

    </div>
    </div>
</template>
<script setup lang="ts">

import axios from 'axios';
import { useGlobal } from '~/helpers/custom.js';
const p = useGlobal();

const createState = reactive({
  studentId: '',
  studentNm: '',
  faculty: '',
  year: '-- เลือก ชั้นปี --',
  gpa: '',
  email: '',
  scholar_typ: '-- เลือก ประเภททุน --',
  amount: '',
  bankAccount: '',
  bankName: '-- เลือก ธนาคาร --',
  scholarDate: '',
  reason: '',
  pdpaConsent: false
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



const scholar_typs = ref<SelectItem[]>([
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

const state = reactive({
});

onMounted(() => {
});

const rcodno = computed(() => {

});

const Pagination = computed(() => {
 
});

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
          dataform.append('user', 'student');
          dataform.append('scholar_date', createState.scholarDate);
          dataform.append('pdpa', 1);

         const config = {
            headers: {
                "Content-Type": "multipart/form-data",
             
            },
        };

        axios.post("http://localhost:5000/create", dataform,config).then(response => { 
                
                if(response.data.success==true){
                    window.location.href = '/student/success'
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
  // PDPA
  // ตรวจเฉพาะฟอร์มสร้างใหม่
  // =========================
  if ('pdpaConsent' in formState) {
    if (!formState.pdpaConsent) {
      errors.push({
        name: 'pdpaConsent',
        message: 'กรุณายอมรับเงื่อนไข PDPA'
      })
    }
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