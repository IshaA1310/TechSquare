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
Add redux devtools in your chrome browser
Login & see your data is coming proprly or not
Navbar should update after login

After Login then, navigate to feed page 🛞 /login -> / {feed}
useNavigate (hook)
then define feed page route ©️

👉Then, we are doing some refactoring into our project structure and code👈
1. Constants url define into another file just like (.env)
2. In react, we are worked under the components.

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