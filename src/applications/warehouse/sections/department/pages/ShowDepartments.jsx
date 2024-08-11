import Table from "../../../../../components/shared/table/Table";
import "../../../../../components/shared/table/Table.scss";
import {
  deleteDeaprtment,
  getDeaprtments,
} from "../../../../../apis/department";
import { useAuth } from "../../../../../context/AuthContext";
import { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../../../../../../config";
const ShowDepartment = () => {
  const Token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const { user } = useAuth()
  const tableHeaders = [
    { key: "code", value: "الكود" },
    {
      key: "name",
      value: " الاسم ",
      clickable: true,
      route: "/warehouse/departments/show-departments/product/:id",
    },
    { key: "image", value: "الصوره", type: "image" },
  ];
  const filters = [
    { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
  ];
  const actions = [
    {
      type: `${user?.permissions.some(
        (permission) => permission.name === "edit department"
      )
        ? "edit"
        : ""
        }`,
      label: "تعديل",
      route: "/warehouse/departments/:id/edit-departments",
    },
    {
      type: `${user?.permissions.some(
        (permission) => permission.name === "delete department"
      )
        ? "delete"
        : ""
        }`,
      label: "حذف",
    },

    {
      type: `${user?.permissions.some(
        (permission) => permission.name === "create department"
      )
        ? "add"
        : ""
        }`,
      label: "إضافة قسم ",
      route: "/warehouse/departments/add-departments",
    },
  ];
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${API_ENDPOINT}/api/v1/store/department`, {

      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    )
      .then(res => {
        setData(res?.data?.data)
      })


  }, [])
  console.log('data from department', data);
  return (
    <div>
      <h2 className="heading text-center">المنافذ</h2>
      <table
        // className="table table  table-bordered table-hover mt-5"
        className="table table table-hover mt-5"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "var(--text-color-inverted)",
        }}
      >
        <thead>
          <tr className="fw-bold fs-5 my-3">
            <th scope="col" style={{ background: "#edede9" }}>
              الرقم
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              الكود
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              الاسم
            </th>
            <th scope="col" style={{ background: "#edede9" }}>
              الصوره
            </th>
          </tr>
        </thead>
        <tbody style={{ borderColor: "#af8260" }}>
          {data?.map((item, index) => (
            <tr key={index} className="content-area-table">
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
                {item?.code}
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
                <Link
                  to={`/warehouse/departments/show-departments/product2/${item?.id}`}
                  // to={`/warehouse/departments/show-departments/product/${item?.id}`}
                  state={{ item }}
                  className="text-decoration-none text-dark"
                >
                  {item?.name}
                </Link>
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
                <img src={item?.image} alt={item?.name} width={"50px"} />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Table
        headers={tableHeaders}
        title=" المنافذ"
        filters={filters}
        fetchData={(filterValues, currentPage, setIsLoading) =>
          getDeaprtments(filterValues, currentPage, setIsLoading)
        }
        // deleteFn={deleteDeaprtment}
      /> */}
    </div>
  );
};

export default ShowDepartment;

// return (
//   <div>
//     <table>
//       <thead>
//         <tr>
//           <th>الرقم</th>
//           <th>الكود</th>
//           <th>الاسم</th>
//           <th>الصوره</th>
//           <th>الإجراءات</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data?.map((item, index) => (
//           <tr key={index}>
//             <th>{index + 1}</th>
//             <th>{item?.code}</th>
//             <th>
//               <Link
//                 to={`/warehouse/departments/show-departments/product/${item?.id}`}
//                 state={{ item }}
//               >
//                 {item?.name}
//               </Link>
//             </th>
//             <th><img src={item?.image} alt={item?.name} width={'50px'} /></th>
//             <th>
//               <button className="btn btn-outline-primary">تعديل</button>
//               <button className="btn btn-outline-danger">حذف</button>
//             </th>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     <Table
//       headers={tableHeaders}
//       title=" المنافذ"
//       filters={filters}
//       fetchData={(filterValues, currentPage, setIsLoading) =>
//         getDeaprtments(filterValues, currentPage, setIsLoading)
//       }
//       actions={actions}
//       deleteFn={deleteDeaprtment}
//     />
//   </div>
// );