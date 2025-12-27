module.exports = {
  apps: [
    {
      name: 'bettrfitness-frontend',
      script: 'npm',
      args: 'run start -- -p 3010',
      cwd: '/var/www/bettrfitness-front/fitness',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3010
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3010
      },
      log_file: '/var/log/pm2/bettrfitness-frontend.log',
      out_file: '/var/log/pm2/bettrfitness-frontend-out.log',
      error_file: '/var/log/pm2/bettrfitness-frontend-error.log',
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    },
    {
      name: 'bettrfitness-api',
      script: 'node',
      args: 'api/server.js',
      cwd: '/var/www/bettrfitness-front/fitness',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3011
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3011
      },
      log_file: '/var/log/pm2/bettrfitness-api.log',
      out_file: '/var/log/pm2/bettrfitness-api-out.log',
      error_file: '/var/log/pm2/bettrfitness-api-error.log',
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M'
    }
  ]
};
