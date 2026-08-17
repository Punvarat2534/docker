<style>
  html {
            scroll-behavior: smooth;
        }

        :root {
            /* โทนสีน้ำเงินอ่อน ละมุนและสว่างขึ้น (Soft Bright Blue) */
            --primary: #3b82f6;
            --primary-hover: #2563eb;
            --primary-light: #eff6ff;
            --primary-dark: #1d4ed8;
            --accent: #3b82f6;
            --accent-hover: #2563eb;
            
            /* สีเขียวพาสเทล/มิ้นต์สดใส */
            --success: #34d399;
            --success-hover: #10b981;
            --success-text: #064e3b;

            --bg: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #1e293b;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --shadow-sm: 0 2px 4px rgba(59, 130, 246, 0.05);
            --shadow-md: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.04);
            --shadow-lg: 0 20px 25px -5px rgba(59, 130, 246, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
            --danger: #ef4444;
            --warning: #f59e0b;
            --radius-md: 12px;
            --radius-lg: 20px;
        }

        * { box-sizing: border-box; font-family: 'Kanit', sans-serif; margin: 0; padding: 0; }
        body { background-color: var(--bg); color: var(--text-main); padding-bottom: 50px; -webkit-font-smoothing: antialiased; }

        /* Keyframes ปรับการเลื่อนลง (Fade In & Scroll Down Dynamic) */
        @keyframes fadeInDown {
            from { 
                opacity: 0; 
                transform: translateY(-25px); /* ค่อยๆ เลื่อนลงมาจากด้านบน */
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }

        @keyframes fadeOutDown {
            from { 
                opacity: 1; 
                transform: translateY(0); 
            }
            to { 
                opacity: 0; 
                transform: translateY(25px); /* ค่อยๆ เลื่อนจางลงด้านล่าง */
            }
        }

        .fade-in {
            animation: fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .fade-out {
            animation: fadeOutDown 0.4s ease-in forwards;
        }

        /* Navbar Design */
        header {
            background: linear-gradient(135deg, #60a5fa 0%, var(--primary-dark) 100%);
            color: white;
            padding: 1.2rem 2.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.25);
            position: sticky;
            top: 0;
            z-index: 90;
        }
        .brand-logo { 
            cursor: pointer; 
            font-size: 1.35rem; 
            font-weight: 600; 
            display: flex; 
            align-items: center; 
            gap: 10px; 
            transition: opacity 0.2s;
        }
        .brand-logo:hover { opacity: 0.9; }
        .nav-btns { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .nav-btns button {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.35);
            backdrop-filter: blur(8px);
            padding: 0.55rem 1.2rem;
            border-radius: 30px;
            cursor: pointer;
            font-weight: 500;
            font-size: 0.95rem;
            transition: all 0.25s ease;
        }
        .nav-btns button:hover {
            background: white;
            color: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }


        /* ปุ่มยื่นคำขอใน Navbar */
        .nav-btns .btn_green_nav {
            background: var(--success);
            border-color: var(--success);
            color: var(--success-text);
            font-weight: 600;
            
        
        }
        .nav-btns .btn_green_nav:hover {
            background: var(--success-hover);
            color: white;
            box-shadow: 0 4px 12px rgba(52, 211, 153, 0.4);
           
           
        }

        /* Container & Cards */
        .container { max-width: 1140px; margin: 2.5rem auto; padding: 0 1.5rem; }
        .card { 
            background: var(--card-bg); 
            border-radius: var(--radius-lg); 
            padding: 2rem; 
            box-shadow: var(--shadow-md); 
            margin-bottom: 2rem; 
            border: 1px solid rgba(226, 232, 240, 0.8);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hidden { display: none !important; }

        /* Modern Hero Section */
        .hero-banner {
            background: linear-gradient(135deg, #60a5fa 0%, var(--primary-dark) 100%);
            color: white;
            padding: 4rem 2rem;
            border-radius: var(--radius-lg);
            text-align: center;
            margin-bottom: 2rem;
            box-shadow: var(--shadow-lg);
            position: relative;
            overflow: hidden;
        }
        .hero-banner h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; letter-spacing: -0.5px; }
        .hero-banner p { font-size: 1.15rem; opacity: 0.95; max-width: 680px; margin: 0 auto 2rem auto; font-weight: 300; line-height: 1.6; }
        
        .hero-buttons { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        
        /* ปุ่มยื่นคำขอใน Hero */
        .btn-lg-green {
            background: var(--success);
            color: var(--success-text);
            font-size: 1.1rem;
            padding: 0.9rem 2.2rem;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0 10px 20px -5px rgba(52, 211, 153, 0.5);
            transition: all 0.3s ease;
        }
        .btn-lg-green:hover { 
            background: var(--success-hover); 
            color: white; 
            transform: translateY(-3px) scale(1.02); 
        }
        
        .btn-lg-outline {
            background: rgba(255, 255, 255, 0.15);
            color: white;
            border: 2px solid white;
            font-size: 1.1rem;
            padding: 0.85rem 2.2rem;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
        }
        .btn-lg-outline:hover { background: white; color: var(--primary-dark); transform: translateY(-3px); }

        /* Track Search Box */
        .search-box-container {
            display: flex; gap: 0.75rem; margin-top: 1.25rem; flex-wrap: wrap;
        }
        .search-box-container input {
            flex: 1; min-width: 240px; padding: 0.85rem 1.2rem; border-radius: 30px; border: 2px solid var(--border); font-size: 1rem;
        }

        /* Result Card Grid */
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.2rem;
            margin-top: 1rem;
            background: var(--bg);
            padding: 1.25rem;
            border-radius: var(--radius-md);
        }
        .detail-item label { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.2rem; }
        .detail-item div { font-weight: 600; color: var(--text-main); font-size: 1rem; }

        /* Cards Grid in Intro */
        .scholar-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1.25rem;
            margin-top: 1.5rem;
        }
        .scholar-item {
            background: var(--primary-light);
            padding: 1.5rem;
            border-radius: var(--radius-md);
            border-left: 5px solid var(--primary);
            transition: all 0.25s ease;
        }

        /* Form Controls UI */
        .form-group { margin-bottom: 1.25rem; }
        label { display: block; margin-bottom: 0.4rem; font-weight: 500; color: var(--primary-dark); font-size: 0.95rem; }
        input, select, textarea {
            width: 100%; 
            padding: 0.75rem 1rem; 
            border: 1.5px solid var(--border);
            border-radius: var(--radius-md); 
            font-size: 0.95rem;
            background-color: #fbfcfd;
            transition: all 0.2s ease;
        }
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: var(--primary);
            background-color: #fff;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
        }
        
        /* Buttons */
        .btn {
            background: var(--primary); color: white; 
            padding: 0.75rem 1.5rem;
            border-radius: 30px; cursor: pointer; font-size: 0.95rem; font-weight: 500;
            transition: all 0.2s ease; box-shadow: var(--shadow-sm);

        }
        .btn:hover { 
            border:1px solid #fff; 
            background: var(--primary-hover); 
            transform: translateY(-1px); 
            box-shadow: var(--shadow-md); }

        .btn-white {
            background: var(#6797ee); 
            color: white; 
            border:2px solid #fff; 
            padding: 0.75rem 1.5rem;
            border-radius: 30px; cursor: pointer; font-size: 0.95rem; font-weight: 500;
            transition: all 0.2s ease; box-shadow: var(--shadow-sm);

        }
        .btn-white:hover { 
            border:1px solid #fff; 
            background: #fff; 
            box-shadow: var(--shadow-md); 
            color:var(--primary-hover);
        }

        
        .btn-success { background: var(--success); color: var(--success-text); font-weight: 600; }
        .btn-success:hover { background: var(--success-hover); color: white; }

        .btn-danger { background: var(--danger); }
        .btn-danger:hover { background: #dc2626; }
        .btn-secondary { background: #64748b; }
        .btn-secondary:hover { background: #475569; }

        /* Modern Table Design */
        .table-responsive { overflow-x: auto; border-radius: var(--radius-md); border: 1px solid var(--border); }
        table { width: 100%; border-collapse: collapse; background: white; }
        th, td { padding: 1rem 1.2rem; text-align: left; font-size: 0.95rem; }
        th { background: #f8fafc; color: var(--primary-dark); font-weight: 600; border-bottom: 2px solid var(--border); }
        td { border-bottom: 1px solid var(--border); color: var(--text-main); }
        tbody tr:hover { background-color: var(--primary-light); }
        
        /* Badges Styling */
        .badge { padding: 0.35rem 0.85rem; border-radius: 30px; font-size: 0.8rem; font-weight: 600; display: inline-block; }
        .badge-pending { background: #fef3c7; color: #b45309; }
        .badge-approved { background: #d1fae5; color: #047857; }
        .badge-rejected { background: #fee2e2; color: #b91c1c; }

        /* Dashboard Stat Cards */
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1.25rem; margin-bottom: 2rem; }
        .stat-card { 
            background: #fff; 
            padding: 1.5rem; 
            border-radius: var(--radius-md); 
            border: 1px solid var(--border);
            border-top: 4px solid var(--primary); 
            box-shadow: var(--shadow-sm); 
        }
        .stat-number { font-size: 2rem; font-weight: 700; margin-top: 0.4rem; color: var(--primary-dark); }

        /* Toolbar & Pagination */
        .toolbar { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .pagination { display: flex; gap: 0.4rem; justify-content: flex-end; margin-top: 1.25rem; }
        .pagination button { 
            padding: 0.5rem 0.9rem; border: 1px solid var(--border); background: white; cursor: pointer; border-radius: 8px; font-weight: 500;
        }
        .pagination button.active { background: var(--primary); color: white; border-color: var(--primary); }

        /* Modal */
        .modal {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(30, 41, 59, 0.4); backdrop-filter: blur(4px);
            display: flex; justify-content: center; align-items: center; z-index: 100;
        }
        .modal-content { 
            background: white; padding: 2.5rem; border-radius: var(--radius-lg); max-width: 520px; width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-lg);
        }

/* select */


/* The core select box styling */
.custom-select {
  width: 100%;
  padding: 10px 35px 10px 14px;
  font-size: 14px;
  font-family: inherit;
  color: black;
  background-color: #fbfcfd;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;
  
  /* Reset default browser styling */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.custom-select option {
  padding: 20px;
  border-radius: 4px;
}

.custom-select option:checked {
  background-color: #3b82f6;
  color: #ffffff;
}

/* pagination */

.pagination {
  list-style-type: none;
  padding: 0;
  margin: 0;
   display: flex;
  justify-content: center;
  text-align: center;
  padding: 0;
}

.pagination li {
  display: inline-block;   
  list-style: none;
    margin:2px;
    cursor:pointer;
    border:1px solid gray;
    padding:0.3em;
    width:28px;
}

.pagination li:hover{
  background-color:#ddd;
}

.active { background: var(--primary); color: white; border-color: var(--primary); }

</style>

<template>

 <!--<div class="topnav" id="myTopnav">
 <NuxtLink to="/" class="active">Home</NuxtLink>
  <NuxtLink to="/">Forum</NuxtLink>
  <a href="#contact">Member</a>
  <a href="#about">Search</a>
  <a href="#about">Help</a>
  <a href="#about">New Topics</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()"><font-awesome icon="bars" style="font-size:12pt;cursor:pointer;" /></a>
</div> -->

<header>
        <div class="brand-logo" onclick="switchView('intro')">
            <span>🎓</span> ระบบขอทุนการศึกษา
        </div>
        <div class="nav-btns">
            
            <NuxtLink class="btn-white" to="/">หน้าแรก</NuxtLink>
            <NuxtLink class="btn-white" to="/student/track">🔍 ตรวจสอบคำขอทุน</NuxtLink>
            <NuxtLink class="btn btn_green_nav" to="/student/create">ยื่นคำขอทุน</NuxtLink>
            
            
            
            <template v-if="isLoggedIn">
            <NuxtLink class="btn-white" to="/admin/home">ระบบจัดการทุน</NuxtLink>
            <button id="btn-logout" @click="logout()">ออกจากระบบ</button>
            </template>
            <template v-else>   
            <NuxtLink class="btn-white" to="/login/login">เข้าสู่ระบบ (เจ้าหน้าที่)</NuxtLink>    
            </template>
        </div>
    </header>

<NuxtPage />

</template>
<script setup lang="ts">

const state = reactive({
});

const isLoggedIn = ref(false);

onMounted(() => {
 const token = useCookie('token')
  if (token.value) {
    isLoggedIn.value = true;
  }
});

const rcodno = computed(() => {

});

const Pagination = computed(() => {
 
});

function logout(){
    
    useCookie('token').value = null;
    window.location.href = '/';
}
     
</script>