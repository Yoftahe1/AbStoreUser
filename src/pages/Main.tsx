import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";

import AppLayout from "../layout/Layout";
import useUserStore from "../store/User";

export default function Main() {
  const sign = useUserStore((state) => state.sign);

  const token = Cookies.get("token");
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const lastName = localStorage.getItem("lastName");
  const firstName = localStorage.getItem("firstName");
  const phoneNumber = localStorage.getItem("phoneNumber");
  const location = localStorage.getItem("location");

  const authenticated =
    token &&
    id &&
    email &&
    firstName &&
    lastName &&
    role &&
    phoneNumber &&
    location;

  if (authenticated) {
    sign({
      id,
      role,
      email,
      lastName,
      firstName,
      location,
      phoneNumber: Number(phoneNumber),
    });
  } else {
    sign(null);
    localStorage.clear();
    Cookies.remove("token");
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
