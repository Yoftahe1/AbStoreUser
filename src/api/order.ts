import axiosInstance from "./main";
import Cookies from "js-cookie";

interface IOrderFilter {
  orderStatus: string;
  page: string;
}

export function getOrders(filter: IOrderFilter) {
  const token = Cookies.get("token");
  return axiosInstance
    .get("/orders/", {
      params: { ...filter },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}

export function findOneOrder(id: string) {
  const token = Cookies.get("token");
  return axiosInstance
    .get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

interface IProduct {
  id: string;
  name: string;
  img: string;
  color: string;
  quantity: number;
  maxQuantity: number;
  price: number;
}

export function orderProducts(order: IProduct[]) {
  const token = Cookies.get("token");
  return axiosInstance
    .post("/orders/create", order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw error.response.data;
    });
}

// export function verifyOrder(id: string) {
//   const token = Cookies.get("token");
//   return axiosInstance
//     .post(`/orders/verifyOrder/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res: any) => res.data)
//     .catch((error: any) => {
//       throw error.response.data;
//     });
// }
