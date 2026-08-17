<style>

      
</style>

<template>
    <div class="container">
        <!-- หน้า Intro พร้อม Fade-in และค่อยๆ เลื่อนลงมา -->
        <div id="intro-section" class="fade-in">
            <div class="hero-banner">
                <h1>ทุนการศึกษาเพื่ออนาคตนักศึกษาประจำปี 2027</h1>
                <p>เปิดรับสมัครและยื่นคำขอทุนการศึกษาออนไลน์ สะดวก รวดเร็ว รู้ผลพิจารณาได้ง่ายผ่านระบบติดตาม</p>
                <div class="hero-buttons">
                     <NuxtLink class="btn-lg-green" to="/student/create">ยื่นคำขอทุนการศึกษาทันที ➔</NuxtLink>
                    <NuxtLink class="btn-lg-outline" to="/student/track">🔍 ตรวจสอบสถานะคำขอ</NuxtLink>
                </div>
            </div>
            
            <div class="card">
                <h3 style="color: var(--primary-dark); font-weight: 600;">ประเภททุนการศึกษาที่เปิดให้ยื่นคำขอ</h3>
                <div class="scholar-grid">
                    <div class="scholar-item">
                        <h4 style="color:var(--primary-dark); font-weight: 600;">1. ทุนขาดแคลนทุนทรัพย์</h4>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-muted);">สนับสนุนนักศึกษาที่ประสบปัญหาทางด้านการเงินและภาระครอบครัว</p>
                    </div>
                    <div class="scholar-item">
                        <h4 style="color:var(--primary-dark); font-weight: 600;">2. ทุนส่งเสริมการศึกษา (เรียนดี)</h4>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-muted);">มอบให้กับนักศึกษาที่มีผลการเรียนโดดเด่นสะสม (GPAX สูง)</p>
                    </div>
                    <div class="scholar-item">
                        <h4 style="color:var(--primary-dark); font-weight: 600;">3. ทุนทำงานพิเศษ</h4>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-muted);">ทุนสำหรับนักศึกษาช่วยงานหน่วยงานภายในมหาวิทยาลัย</p>
                    </div>
                    <div class="scholar-item">
                        <h4 style="color:var(--primary-dark); font-weight: 600;">4. ทุนฉุกเฉิน / ช่วยเหลือพิเศษ</h4>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-muted);">ช่วยเหลือกรณีประสบภัยพิบัติ หรือเหตุฉุกเฉินทางการเงินกระทันหัน</p>
                    </div>
                    <div class="scholar-item">
                        <h4 style="color:var(--primary-dark); font-weight: 600;">5. ทุนกิจกรรมนักศึกษา</h4>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-muted);">สำหรับนักศึกษาที่สร้างชื่อเสียงและทำประโยชน์แก่สถาบัน</p>
                    </div>
                </div>
            </div>
        </div>
         </div>
</template>
<script setup lang="ts">

import axios from 'axios';
import { useGlobal } from '~/helpers/custom.js';
const p = useGlobal();

const state = reactive({
});

onMounted(() => {
});

const rcodno = computed(() => {

});

const Pagination = computed(() => {
 
});

     
</script>