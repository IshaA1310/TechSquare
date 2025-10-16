🔙 BACKEND SIDE 🔙
maltiaggarwal306_db_user
o6JqfGjiQ6XOPGyA
mongodb+srv://maltiaggarwal306_db_user:o6JqfGjiQ6XOPGyA@techsquare.wlh32ge.mongodb.net/

Permission add in mongodb - for my IP address EC2 instance (http://16.171.173.170/)
Updated 1 more IP Address to aws console (security groups) INBOUND Rules

✅ http://16.171.173.170:7777/ ✅ (170:7777) localhost:7777

❌ http://16.171.173.170/7777/ ❌ (170/7777) localhost/7777

npm install
npm run start
install process manager - pm2 (npm install pm2 -g) => bcz our server will stop if I'll close my terminal.

a. pm2 start npm -- start (bydefault it will make npm name of process).
b. pm2 logs
c. pm2 list
d. pm2 delete npm < name >
e. pm2 flush npm < name >
f. pm2 stop npm < name>
g. pm2 start npm --name "techSquare-backend" -- start
<!--
  ubuntu@ip-172-31-33-25:~/TechSquare/backend$ pm2 flush npm
  [PM2] Flushing:
  [PM2] /home/ubuntu/.pm2/logs/npm-out.log
  [PM2] /home/ubuntu/.pm2/logs/npm-error.log
  [PM2] Logs flushed
-->
2nd command
<!-- LOGS EXTRA PART
0|npm      |   npm help
0|npm      | Unknown command: "name"
0|npm      |
0|npm      | To see a list of supported npm commands, run:
0|npm      |   npm help
0|npm      | Unknown command: "name"
0|npm      |
0|npm      | To see a list of supported npm commands, run:
0|npm      |   npm help
0|npm      |
0|npm      | > techsquare@1.0.0 start
0|npm      | > node src/app.js
0|npm      |
0|npm      | connected to database successfully
0|npm      | server is running on port 7777
-->

Frontend = (http://16.171.173.170/)
Backned = (http://16.171.173.170:7777/)

Domain Name = techsquare.com = 16.171.173.170

Frontend = techsquare.com
Backend = techsquare.com:7777 => (techsquare.com/api)
:7777 => /api

Forthat we will be use nginx & something known as nginx proxy
Any request that is hit to server then definitely it will be passing through NGINX.

sudo nano /etc/nginx
sudo nano /etc/nginx/
sudo nano /etc/nginx/sites-available/default

paste shift+Ins = server name (IP address)

location /api/ {
  proxy_pass http://localhost:7777/;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}

clt + O & Enetr => then exit

Now, we have to connect our frontend with backend
