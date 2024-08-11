import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config";
import { useLocation } from "react-router-dom";

import axios from 'axios'
const ShowProductDepartment2 = () => {
  const Token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const item = useLocation()?.state?.item
  const [data, setData] = useState([])
  useEffect(() => {
    // axios.get(`${API_ENDPOINT}/api/v1/store/invoice/filter/get_recipes/out_going_from_to_date/${item?.id}`, {
    axios.get(`${API_ENDPOINT}/api/v1/store/recipe/department/${item?.id}`, {

      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    )
      .then(res => {
        setData(res?.data?.data)
      })
  }, [])
  // console.log(data);
  return (
    <div>
      <h2 className="heading text-center">المخزن الفرعي</h2>
      <table
        // className="table table  table-bordered table-hover mt-5"
        className="table table-hove mt-5"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "var(--text-color-inverted)",
        }}
      >
        <thead>
          <tr className="fw-bold fs-5 my-3">
            <th scope="col" style={{ background: "#edede9" }}>
              #
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              اسم الماده الخام
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              الكمية المتبقيه
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              الصوره
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              الكميه المتبقيه ف المخزن
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              ايام الصلاحيه
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              حد الامان
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              السعر الكلى لصرف الماده الخام
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              القسم التابع للماده الخام
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              التصنيف التابع للماده الخام
            </th>
          </tr>
        </thead>

        <tbody style={{ borderColor: "#af8260" }}>
          {data?.map((item, index) => (
            <tr className="content-area-table" key={index}>
              <th
                className="clickable-cell"
                style={{
                  padding: " 14px 12px",
                  border: "1px solid #E4C59E",
                  color: "#803D3B",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {index + 1}
              </th>
              <th
                className="clickable-cell"
                style={{
                  padding: " 14px 12px",
                  border: "1px solid #E4C59E",
                  color: "#803D3B",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {item?.recipe?.name}
              </th>
              <th
                className="clickable-cell"
                style={{
                  padding: " 14px 12px",
                  border: "1px solid #E4C59E",
                  color: "#803D3B",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {item?.quantity} {item?.recipe?.unit?.name}
              </th>
              <th
                className="clickable-cell"
                style={{
                  padding: " 14px 12px",
                  border: "1px solid #E4C59E",
                  color: "#803D3B",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                <img src={item?.recipe?.image} alt={item?.recipe?.name} width={"50px"} />
              </th>
              <th
                className="clickable-cell"
                style={{
                  padding: " 14px 12px",
                  border: "1px solid #E4C59E",
                  color: "#803D3B",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {item?.recipe?.quantity} {item?.recipe?.unit?.name}
              </th>
              <th
                className="clickable-cell"
                style={{
                  padding: " 14px 12px",
                  border: "1px solid #E4C59E",
                  color: "#803D3B",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {item?.recipe?.days_before_expire} يوم
              </th>
              <th
                className="clickable-cell"
                style={{
                  padding: " 14px 12px",
                  border: "1px solid #E4C59E",
                  color: "#803D3B",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {item?.recipe?.minimum_limt} يوم
              </th>
              <th
                className="clickable-cell"
                style={{
                  padding: " 14px 12px",
                  border: "1px solid #E4C59E",
                  color: "#803D3B",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {item?.price} جنيه
              </th>
              <th
                className="clickable-cell"
                style={{
                  padding: " 14px 12px",
                  border: "1px solid #E4C59E",
                  color: "#803D3B",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {item?.recipe?.recipe_category?.parent}
              </th>
              <th
                className="clickable-cell"
                style={{
                  padding: " 14px 12px",
                  border: "1px solid #E4C59E",
                  color: "#803D3B",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {item?.recipe?.recipe_category?.name}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowProductDepartment2