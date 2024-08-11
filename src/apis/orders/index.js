import { message } from "antd";
import axios from "axios";
import { API_ENDPOINT } from "../../../config";
const domain = API_ENDPOINT;
const Token = localStorage.getItem("token") || sessionStorage.getItem("token");
export async function getOrders(filteredValues, id, setIsLoading) {
  try {
    setIsLoading(true);
    const { from_date, to_date, department_id, user_id, page, status, code } =
      filteredValues;
    const default_from = "1970-01-01";
    const default_to = new Date().toISOString().split("T")[0];
    const res = await axios.get(`${domain}/api/v1/orders`, {
      params: {
        "date[from]": from_date,
        "date[to]": to_date,
        to_department_id: department_id,
        user_id,
        status,
        page,
        code,
        department_id: id,
      },
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    setIsLoading(false);
    // console.log("res from orders", res);
    return res.data;
  } catch (error) {
    // // console.log("Error fetching data:", error);
    setIsLoading(false);
    message.error("حدث خطأ الرجاء إعادة المحاولة ");
  }
}
export async function getOrderById(id) {
  try {
    const res = await axios.get(`${API_ENDPOINT}/api/v1/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return res.data;
  } catch (error) {
    message.error(error.response.data.error.message);

    // // console.log("Error fetching data:", error);
  }
}
export async function deleteOrder(id) {
  try {
    const res = await axios.delete(
      `${API_ENDPOINT}/api/v1/orders/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    message.error(error.response.data.error.message);

    // // console.log("Error fetching data:", error);
  }
}
export async function checkTableNumber(tableNumber) {
  try {
    const res = await axios.get(
      `${API_ENDPOINT}/api/v1/orders/check_table_num/${tableNumber}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return res.data.data.message;
  } catch (error) {
    message.error(error.response.data.error.message);

    // // console.log("Error fetching data:", error);
  }
}
export async function updateProductQuantityInOrder(editedData, id) {
  try {
    const res = await axios.post(
      `${API_ENDPOINT}/api/v1/orders/product/update/${editedData["product_id_in_order"]}`,
      { quantity: editedData.quantity },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    message.error(error.response.data.error.message);
    // // console.log("Error fetching data:", error);
  }
}
export async function deleteProductQuantityInOrder(id) {
  try {
    const res = await axios.delete(
      `${API_ENDPOINT}/api/v1/orders/product/delete/${id}`,

      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    message.success("تم حذف المنتج بنجاح");
    return res.data;
  } catch (error) {
    message.error(error.response.data.error.message);
    // // console.log("Error fetching data:", error);
  }
}
export async function changeOrderStatus(id, status) {
  try {
    const res = await axios.post(
      `${API_ENDPOINT}/api/v1/orders/update/status/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    message.error(error.response.data.error.message);
    // // console.log("Error fetching data:", error);
  }
}
