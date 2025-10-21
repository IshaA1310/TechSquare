freedomain.one -
  usme free ssl certificate generate hoga
  usme SSL Cert: + SSL Intermediate CA:
  usme SSL Private Key:

sudo mkdir -p /etc/ssl/techsquare/
uske baad sudo nano /etc/ssl/techsquare/cert.pem (paste {cert + intermediate 1 + intermediate 2})
sudo nano /etc/ssl/techsquare/privkey.pem (paste private key)
sudo chmod 600 /etc/ssl/techsquare/cert.pem

========================================================
# Nginx SSL Configuration - Complete Guide

## Step 1: Free SSL Certificate Generate Karo

1. **FreeDomain.ONE** pe jao (ya koi bhi free SSL provider jaise ZeroSSL, Let's Encrypt)
2. Apna domain enter karo: `techsquare.work.gd`
3. SSL certificate generate karo
4. Teen files milenge:
   - **SSL Certificate** (cert.pem)
   - **SSL Intermediate CA 1 & 2** (intermediate certificates)
   - **SSL Private Key** (private key)

---

## Step 2: SSL Files Ko Server Pe Save Karo

### 2.1 Directory Create Karo
```bash
sudo mkdir -p /etc/ssl/techsquare/
```

### 2.2 Certificate File Banao (Cert + Intermediate CAs)
```bash
sudo nano /etc/ssl/techsquare/cert.pem
```
**Paste karo (iss order me):**
1. SSL Certificate
2. Intermediate CA 1
3. Intermediate CA 2

Format kuch aisa hoga:
```
-----BEGIN CERTIFICATE-----
[Your SSL Certificate]
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
[Intermediate CA 1]
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
[Intermediate CA 2]
-----END CERTIFICATE-----
```

**Save & Exit:** `Ctrl + O` → `Enter` → `Ctrl + X`

### 2.3 Private Key File Banao
```bash
sudo nano /etc/ssl/techsquare/privkey.pem
```
**Paste karo:** SSL Private Key
```
-----BEGIN PRIVATE KEY-----
[Your Private Key]
-----END PRIVATE KEY-----
```

**Save & Exit:** `Ctrl + O` → `Enter` → `Ctrl + X`

### 2.4 File Permissions Set Karo (Security ke liye)
```bash
sudo chmod 644 /etc/ssl/techsquare/cert.pem
sudo chmod 600 /etc/ssl/techsquare/privkey.pem
```

### 2.5 Verify Files
```bash
ls -la /etc/ssl/techsquare/
```
**Output aisa hona chahiye:**
```
-rw-r--r-- 1 root root [size] cert.pem
-rw------- 1 root root [size] privkey.pem
```

---

## Step 3: Nginx Configuration

### 3.1 Nginx Config File Edit Karo
```bash
sudo nano /etc/nginx/sites-available/default
```

### 3.2 Configuration Paste Karo
```nginx
# HTTP Server - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name techsquare.work.gd www.techsquare.work.gd;
    
    # Redirect all HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    
    server_name techsquare.work.gd www.techsquare.work.gd;
    
    # SSL Certificate Paths
    ssl_certificate /etc/ssl/techsquare/cert.pem;
    ssl_certificate_key /etc/ssl/techsquare/privkey.pem;
    
    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # Website Root Directory
    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;
    
    # Frontend Routes
    location / {
        root /var/www/html;
        index index.html;
        try_files $uri /index.html;
    }
    
    # Backend API Proxy (optional)
    location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Save & Exit:** `Ctrl + O` → `Enter` → `Ctrl + X`

---

## Step 4: Test & Restart Nginx

### 4.1 Configuration Test Karo
```bash
sudo nginx -t
```
**Expected Output:**
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 4.2 Nginx Restart Karo
```bash
sudo systemctl restart nginx
```

### 4.3 Status Check Karo
```bash
sudo systemctl status nginx
```
**Expected:** `active (running)` dikhna chahiye

---

## Step 5: Verify SSL Working

### 5.1 Command Line Test
```bash
# HTTPS pe site accessible hai ya nahi
curl -I https://techsquare.work.gd

# HTTP to HTTPS redirect ho raha hai ya nahi
curl -I http://techsquare.work.gd

# SSL certificate details dekho
echo | openssl s_client -servername techsquare.work.gd -connect techsquare.work.gd:443 2>/dev/null | openssl x509 -noout -dates
```

### 5.2 Browser Test
1. Browser me kholo: `https://techsquare.work.gd`
2. Address bar me **padlock icon 🔒** dikhna chahiye
3. Padlock pe click karke certificate details dekho

---

## Common Issues & Solutions

### Issue 1: "Connection Refused"
```bash
# Firewall me port 443 open karo
sudo ufw allow 443/tcp
sudo ufw reload
```

### Issue 2: "Certificate Verify Failed"
- Check karo cert.pem me certificate + intermediate CAs sahi order me hain
- Ensure karo ek bhi extra space ya line missing nahi hai

### Issue 3: "Permission Denied"
```bash
# Permissions phir se set karo
sudo chmod 644 /etc/ssl/techsquare/cert.pem
sudo chmod 600 /etc/ssl/techsquare/privkey.pem
```

### Issue 4: Nginx Start Nahi Ho Raha
```bash
# Error logs dekho
sudo tail -f /var/log/nginx/error.log

# Configuration detailed test
sudo nginx -T
```

---

## Important Security Notes

⚠️ **Private Key ko kabhi share mat karo**  
⚠️ **Private key ki permission hamesha 600 rakho**  
⚠️ **Backup rakho certificate aur private key ka**  
⚠️ **Certificate expiry date track karo** (usually 90 days for free SSL)

---

## SSL Certificate Renewal

Free SSL certificates usually 90 days me expire hote hain:
```bash
# Certificate expiry check karo
echo | openssl s_client -servername techsquare.work.gd -connect techsquare.work.gd:443 2>/dev/null | openssl x509 -noout -dates

# Naya certificate generate karo (FreeDomain.ONE se)
# Phir same steps repeat karo (Step 2 onwards)
```

---

## Quick Commands Reference
```bash
# Files verify
ls -la /etc/ssl/techsquare/

# Nginx test
sudo nginx -t

# Nginx restart
sudo systemctl restart nginx

# Nginx status
sudo systemctl status nginx

# Error logs
sudo tail -f /var/log/nginx/error.log

# Access logs
sudo tail -f /var/log/nginx/access.log
```

---

## Summary Checklist

✅ SSL certificate generate kiya FreeDomain.ONE se  
✅ `/etc/ssl/techsquare/` directory banai  
✅ `cert.pem` me certificate + intermediate CAs paste kiye  
✅ `privkey.pem` me private key paste kiya  
✅ File permissions set kiye (644 & 600)  
✅ Nginx configuration update kiya  
✅ `nginx -t` test pass kiya  
✅ Nginx restart kiya  
✅ HTTPS pe site accessible hai  
✅ Padlock icon browser me dikh raha hai  

---

**Done! 🎉 Tumhari website ab HTTPS se secure hai!**