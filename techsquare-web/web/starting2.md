Make Login page with the help of daisyUI components and tailwind css
define useState() for set email & password
install axios package for api call
then handleLogin() axios.post('http://localhost:5173/login', {formData} {withCredentials: true})
if without {withCredentials} then it will set into application cookies our login token.

🔙 Backend side issue with CORS 🔙

bcz we have 2 diff port number with same origin.
npm install cors (take reference from express cors documentation)
use as a middleware cors issue
app.use(cors())
with cors() we have need to pass some configurations - such as cookies.
cors({
  origin: 'http://localhost:5173/',
  credentails: true
})