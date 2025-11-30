export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : window.location.href="/";
}
