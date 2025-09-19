Auth Router
/signup
/login
/logout

Profile Router
/profile/view
/profile/eidt
/profile/password

Connection router
/connection/request/:status/:toUserId
/connection/request/review/:status/:user

User router
/user/requests/received
/user/connections
/feed - I am adding in this page , limit query

/feed?page=1&limit=20 (1-20) users

/feed?page=2&limit=10 (21-30) users