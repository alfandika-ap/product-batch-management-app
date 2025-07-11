const dotenv = require('dotenv')
dotenv.config({ path: './.env.production' })

module.exports = {
  apps: [
    {
      name: "carabao-product-check-fe",
      script: "bun",
      args: "run preview",
      cwd: "/home/product-check-carabaopro/htdocs/product-check.carabaopro.com",
      env: {
        NODE_ENV: "production",
        VITE_API_URL: process.env.VITE_API_URL || "https://api-check.carabaopro.com/api/v1",
        HOST: process.env.HOST || "0.0.0.0",
        PORT: process.env.PORT || "4173"
      },
      log_file: "./logs/combined.log",
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      time: true
    }
  ]
}
