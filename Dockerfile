# chi dinh base image
FROM node:22-alpine

# thiet lap thu muc lam viec
WORKDIR /app

COPY package*.json yarn.lock ./

# thuc thi khi build image
RUN yarn install --frozen-lockfile

# sao chep file tu host vao image
COPY . .

# port container
EXPOSE 3000

# lenh mac dinh(co the ghi de)
CMD ["yarn", "dev"]