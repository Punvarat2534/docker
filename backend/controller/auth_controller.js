import client  from "../config/db.js";

import cookie from '@fastify/cookie'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

class auth_controller {

    login = async function (req, res, next) {

        try {

            const username = req.body.username;
            const password = req.body.password;

            // ตรวจสอบข้อมูลที่ส่งมา
            if (!username || !password) {
                return res.code(400).send({
                    success: false,
                    message: 'กรุณากรอก Username และ Password'
                });
            }

            // 1. ค้นหา user จาก database
            const result = await client.query(
                `
                SELECT
                    *
                FROM public."users"
                WHERE username = $1
                LIMIT 1
                `,
                [username]
            );
           
            // 2. ไม่พบ username
            if (result.rows.length === 0) {
                return res.send({
                    success: false,
                    message: 'Username หรือ Password ไม่ถูกต้อง'
                });
            }

            const user = result.rows[0];

            // 3. ตรวจสอบ password
            const passwordOK = await bcrypt.compare(
                password,
                user.password_hash
            );

            if (!passwordOK) {                
               return res.send({
                    success: false,
                    message: 'Username หรือ Password ไม่ถูกต้อง'
                });
            }

            //res.send("kaho");
            //console.log(process.env.JWT_SECRET);
               // สร้าง JWT
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    role: user.role
                },
                "my-secret-key-2026",
                {
                    expiresIn: "8h"
                }
            );

            // เก็บ JWT ใน HttpOnly Cookie
            /*res.setCookie("access_token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 8
            });*/

            // 4. Login สำเร็จ
            return res.send({
                success: true,
                message: 'เข้าสู่ระบบสำเร็จ',
                token : token,
                user: {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    role: user.role
                }
            });

        } catch (error) {

            console.error(error);

            return res.code(500).send({
                success: false,
                message: 'เกิดข้อผิดพลาดในระบบ',
                error: error.message
            });
        }
    }


    me = async function (req, res) {

    try {

        const token = req.cookies.access_token;

        if (!token) {
            return res.code(401).send({
                success: false,
                message: "กรุณาเข้าสู่ระบบ"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const result = await client.query(
            `
            SELECT
                id,
                username,
                name,
                role
            FROM public."users"
            WHERE id = $1
            LIMIT 1
            `,
            [decoded.id]
        );

        if (result.rows.length === 0) {
            return res.code(401).send({
                success: false,
                message: "ไม่พบผู้ใช้งาน"
            });
        }

        return res.send({
            success: true,
            user: result.rows[0]
        });

    } catch (error) {

        return res.code(401).send({
            success: false,
            message: "Session หมดอายุ"
        });
    }
  };

  logout = async function (req, res) {

    res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "lax",
        path: "/"
    });

    return res.send({
        success: true,
        message: "ออกจากระบบแล้ว"
    });
};

}

export default auth_controller;
