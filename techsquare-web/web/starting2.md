Make Login page with the help of daisyUI components and tailwind css
define useState() for set email & password
onchange{(event) => setEmailId(event.taregt.value)}
onchange{(event) => setPassword(event.target.value)}
onclick={handleLogin}

install axios package for api call
then handleLogin() axios.post('http://localhost:5173/login', {formData} {withCredentials: true})
if without {withCredentials} then it will not set into application cookies our login token.

Install 👉 Reactjs/toolkit + react-redux
make store file appStore.js 👉 configureStore({ reducer:{} });
app.jsx 👈 provider this store
create slices (multiple slices) 👉 UserSlice createSlice({});


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