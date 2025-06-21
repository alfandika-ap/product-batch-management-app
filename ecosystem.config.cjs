import dotenv from 'dotenv'
dotenv.config({ path: './.env.production' })

export default {
  apps: [
    {
      name: "carabao-product-check-fe",
      script: "bun",
      args: "run preview",
      cwd: "/home/carabaopro-product-check-fe/htdocs/product-check.carabaopro.com",
      env: {
        NODE_ENV: "production",
        HOST: process.env.HOST,
        PORT: process.env.PORT
      }
    }
  ]
}
