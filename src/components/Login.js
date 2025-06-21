// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";


// const Login = () => {
//   const { dispatch } = useAuth();
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleLogin = async () => {
//     const res = await fetch("http://localhost:8000/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       dispatch({ type: "LOGIN", payload: { id: data.userId, name: data.name } });
//       const cartRes = await fetch(`http://localhost:8000/api/cart/${data.userId}`);
//       const cartData = await cartRes.json();
//       dispatch({ type: "SET_CART", payload: cartData });
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div>
//       <input name="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
//       <input name="password" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;
