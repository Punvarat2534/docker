import client  from "../config/db.js";
import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';
import 'dotenv/config';


class scholar_controller{

    constructor() {
        this.create = this.create.bind(this);
    }

    pagecount = async function (req, res, next) {
        const result = await client.query('SELECT count(*) as pagecount from  public."scholars" where deleted_at is null'); 
        const perpage = 10;
        var recordcnt = Math.ceil((result.rows[0].pagecount)/perpage);
        res.send(recordcnt);  
    }

    all = async function (req, res, next) {
        var page = req.params.page;
        page=page-1;
        
        if(page!=0){
            page=(page*10);
        }

        const result = await Promise.all([
        client.query('SELECT * from public."scholars" where deleted_at is null order by id desc limit 10 offset $1',[page])

        ]).then(function([result]) {    
                var data = {
                    "success":true,
                    "data":result.rows
                }
                return data;
        }).catch(function (e) {
                var data = {
                    "success":false,
                    "error" : e
                };
                return data;
        });

        res.send(result);
    }

    detail = async function (req, res, next) {
        var scholarcode = req.params.code;

        const result = await Promise.all([
        client.query('SELECT * from public."scholars" where scholar_code=$1',[scholarcode])

        ]).then(function([result]) {    
                var data = {
                    "success":true,
                    "data":result.rows
                }
                return data;
        }).catch(function (e) {
                var data = {
                    "success":false,
                    "error" : e
                };
                return data;
        });

        res.send(result);
    }

   create = async function (req, res, next) {
      

       var student_id = req.body.student_id;
       var student_name = req.body.student_name;
       var faculty = req.body.faculty;
       var years = req.body.years;
       var gpa = req.body.gpa;
       var email = req.body.email;
       var scholar_typ = req.body.scholar_typ;
       var request_amount = req.body.amount;
       var bank_code = req.body.bank_code;
       var bank_name = req.body.bank_name;
       var scholar_reason = req.body.scholar_reason;
       var status = req.body.status;
       var user = req.body.user;
       const scholar_code = await this.scholarcode();
       var scholar_date = req.body.scholar_date;

       
       //res.send(bank_name);

       const result = await Promise.all([
       client.query('insert into public."scholars"(scholar_code,student_id,student_name,faculty,years,gpa,email,scholar_typ,amount,bank_code,bank_name,scholar_reason,status,scholar_date,users) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)',[scholar_code,student_id,student_name,faculty,years,gpa,email,scholar_typ,request_amount,bank_code,bank_name,scholar_reason,status,scholar_date,user])
       ]).then(function([result]) {    
            var data = {
                "success":true
            }
       return data;
       }).catch(function (e) {
            var data = {"success":false,"error" : e};
            return data;
       });
    
       res.send(result);
    }

    update =  async function (req, res, next) { 
      
  
       var student_name = req.body.student_name;
       var faculty = req.body.faculty;
       var years = req.body.years;
       var gpa = req.body.gpa;
       var email = req.body.email;
       var scholar_typ = req.body.scholar_typ;
       var request_amount = req.body.amount;
       var bank_code = req.body.bank_code;
       var bank_name = req.body.bank_name;
       var scholar_reason = req.body.scholar_reason;
       var status = req.body.status;
       var remark = req.body.remark;
       var scholar_code = req.body.scholar_code;

       const result = await Promise.all([
       client.query('update public."scholars" set student_name=$1,faculty=$2,years=$3,gpa=$4,email=$5,scholar_typ=$6,amount=$7,bank_code=$8,bank_name=$9,scholar_reason=$10,status=$11,remark=$12 where scholar_code=$13',[student_name,faculty,years,gpa,email,scholar_typ,request_amount,bank_code,bank_name,scholar_reason,status,remark,scholar_code])
       ]).then(function([result]) {    
            var data = {
                "success":true
            }
       return data;
       }).catch(function (e) {
            var data = {"success":false,"error" : e};
            return data;
       });
    
       res.send(result);
    }


    
    delete = async function (req, res, next) { 
        
        var scholar_code = req.params.code;
        

        const result = await Promise.all([
            client.query('update public."scholars" set deleted_at=NOW() where scholar_code=$1',[scholar_code])
            ]).then(function([result]) {    
                 var data = {
                     "success":true
                 }
            return data;
            }).catch(function (e) {
                 var data = {"success":false,"error" : e};
                 return data;
            });
    
            res.send(result);  
        
    }

    search = async function (req, res, next) {
        try {
        const student = (req.params.text || '').trim();
        const scholar_typ = (req.params.typ || '').trim();  
        const status = (req.params.sts || '').trim();             
        //console.log('student =', student);
        //console.log('student length =', student.length);

        /*const sql = `
            SELECT * FROM public."scholars" WHERE (student_id LIKE $1 or student_name LIKE $1) 
        `;*/

        const sql = `
            SELECT * FROM public."scholars" WHERE (student_id LIKE $1 or student_name LIKE $1) OR ($2 = '' OR scholar_typ = $2) OR ($3 = '' OR status = $3)
        `;

        const searchText = `%${student}%`;

        const result = await client.query(sql, [searchText,scholar_typ,status]);

        console.log('rows =', result.rows);

        res.send({
            success: true,
            status: status,
            data: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).send({
            success: false,
            error: error.message
        });
    }
    }


    track = async function (req, res, next) {
        try {
        const student = (req.params.text || '').trim();

        const sql = `
            SELECT * FROM public."scholars" WHERE (student_id LIKE $1 or student_name LIKE $1)
        `;

        const searchText = `%${student}%`;

        const result = await client.query(sql, [searchText]);

        console.log('rows =', result.rows);

        res.send({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).send({
            success: false,
            error: error.message
        });
    }
    }


    async scholarcode() {

        const result = await client.query("select concat(TO_CHAR(NOW(), 'DDMMYYYY'),substr((CAST((1000+max(CAST(substr(scholar_code,9,7) AS integer))+1) AS Text)),2,3)) as scholarcode from scholars"); 
        return result.rows[0].scholarcode;

    }

    async statuscnt() {
        const result = await client.query("SELECT COUNT(*) FILTER (WHERE deleted_at IS NULL) AS s,COUNT(*) FILTER (WHERE status = 'รอพิจารณา') AS w,COUNT(*) FILTER (WHERE status = 'อนุมัติ') AS a,COUNT(*) FILTER (WHERE status = 'ไม่อนุมัติ') AS c FROM public.scholars"); 
        return result.rows[0];
    }

        

}

export default scholar_controller;