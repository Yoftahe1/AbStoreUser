import axiosInstance from "./main";
import Cookies from "js-cookie";

interface IProductFilter {
  category?: string;
  rating?: string;
  search?: string;
  page: string;
}

export function getProducts(filter: IProductFilter) {
  return axiosInstance
    .get("/products", { params: { ...filter } })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function findOneProduct(id: string) {
  return axiosInstance
    .get(`/products/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function getNewProducts() {
  return axiosInstance
    .get("/products/new")
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function getTopRatedProducts() {
  return axiosInstance
    .get("/products/topRated")
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function getRelatedProducts( id: string ) {
  return axiosInstance
    .get(`/products/${id}/related`)
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function getReviews(id: string) {
  return axiosInstance
    .get(`/products/${id}/review`)
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

interface IReview {
  id: string;
  review: string;
}
export function reviewProduct({ id, review }: IReview) {
  const token = Cookies.get("token");
  return axiosInstance
    .patch(
      `/products/${id}/review`,
      { review },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

interface IRate {
  id: string;
  rating: number;
}

export function rateProduct({ id, rating }: IRate) {
  const token = Cookies.get("token");
  return axiosInstance
    .patch(
      `/products/${id}/rate`,
      { rating },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}

export function myRating(id:string) {
  const token = Cookies.get("token");
  return axiosInstance
    .get(
      `/products/${id}/myRating`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
}