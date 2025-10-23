# Adding custom domain name

purchased domain name  from godaddy
signup on cloudflare for managing DNS & add a domain name
change the name servers on go daddy and point it to clouflare
wait for sometime till updated

I used for domain name (https://freedomain.one/)
free domain check exits or not ?
changed IP address with my aws ec2 ip address (Host Records (A & AAAA))
then modified nginx server  server name techsquare.work.gd
 
# # # # # # # # # # # # # # # #

Now we are sending mail by using amazon ses service (simple email services) -
make IAM user in aws - ses-user(full access)
amazon ses - varify identity (by providng by live url)
then 3 records we have need to add on freedomain.one
m3thmoleyeyhwbby7jzwr6ede5trzgg._domainkey.techsquare.work.gd → m3thmoleyeyhwbby7jzwr6ede5trzgg.dkim.amazonses.com.
n6x3b7al7mkwvp2imoiunjzpqt7ho2jq._domainkey.techsquare.work.gd → n6x3b7al7mkwvp2imoiunjzpqt7ho2jq.dkim.amazonses.com.
rh2iuomri5mmcwp5mpe2ufo4ig2kf3i5._domainkey.techsquare.work.gd → rh2iuomri5mmcwp5mpe2ufo4ig2kf3i5.dkim.amazonses.com.

verified with in 2 -10 minutes (domain name & email) both are required.
then request for production mail request.

- Create a IAM user
- Give Access to AmazonSESFullAccess
- Amazon SES: Create an Identity
- Verify your domain name
- Verify an email address identity
- Install AWS SDK - v3 
- Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- Setup SesClient
- Access Credentials should be created in IAm under SecurityCredentials Tab
- Add the credentials to the env file
- Write code for SESClient
- Write code for Sending email address
- Make the email dynamic by passing more params to the run function


sudo apt update
sudo apt install certbot python3-certbot-nginx -y


- Sign up on Razorpay & complete KYC
- Cerated a UI for premium page
- Creating an API for create order in backend
- added my key and secret in env file
- Intialized Razorpay in utils
- creating order on Razorpay
- create Schema and model
- saved the order in payments collection
- make the API dynamic
- Setup RRazorpay webhook on your live APi
- Ref - https://github.com/razorpay/razorpay-node/tree/master/documents
- Ref - https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#integrate-with-razorpay-payment-gateway
- Ref - https://razorpay.com/docs/webhooks/validate-test/
- Ref - https://razorpay.com/docs/webhooks/payloads/payments/