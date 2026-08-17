# Step 1: Base image
FROM node:20-slim AS base

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install dependencies
# คัดลอกเฉพาะไฟล์ที่ระบุ Package เพื่อใช้ประโยชน์จาก Caching
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Build project
COPY . .
RUN npm run build

# Step 5: Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# คัดลอกผลลัพธ์การ Build จาก stage ก่อนหน้า (Nitro server)
COPY --from=base /app/.output ./.output

EXPOSE 3000

# รันแอปพลิเคชันผ่าน Nitro server
CMD ["node", ".output/server/index.mjs"]