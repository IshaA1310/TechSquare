Launch our web applications to remote server 
AWS Server

Register account on AWS console(aws)

It is my ssh key of aws aacount - 
chmod 400 "Tech_square_secret.pem" (change permission of directory)
(SSH Key)
ssh -i "Tech_square_secret.pem" ubuntu@ec2-16-171-173-170.eu-north-1.compute.amazonaws.com

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh (Install nodejs)
sudo apt update (For Ubuntu)
sudo apt install nodejs (after then this - don't need to close terminal for restarting)
git clone https://github.com/IshaA1310/TechSquare.git (Then, clone github repo)

🕸️ FRONTEND SIDE 🕸️
npm install
npm run build
sudo apt update
sudo apt install nginx (It's give us http server)
sudo systemctl start nginx
sudo systemctl enable nginx
copy code from (dist/*) build files to (/var/www/html)
check - in directory =>
ca /var/www/html => ls => index.nginx-debian.html
again back to web folder
(sudo scp -r dist/* /var/www/html)
sudo                      scp  -r          dist/*                      /var/www/html
👇                        👇   👇          👇                         👇
(root level permission)  copy  recursive dist folder all content copy  Destination

enable port 80 at our instance

http://16.171.173.170/

deployment - run , ngnix, http server, enable port, awss ec-2 instance
