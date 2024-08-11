import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../../../../../../../config";
import { message } from "antd";
import { Pagination } from "antd";

const DetailsProduct2 = () => {
  const item = useLocation()?.state?.item;

  const [isPending, setIsPending] = useState(false);
  const Token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsPending(true);
    axios
      ?.get(`${API_ENDPOINT}/api/v1/store/products/subcategory/${item?.id}?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setIsPending(false);
        setData(res?.data);
      })
      .catch((err) => {
        setIsPending(false);
        // console.log("error", err);
      });
  }, [currentPage]);
  // console.log("data from get", data);
  const handelDelete = async (id) => {
    setIsPending(true);
    await axios
      .delete(`${API_ENDPOINT}/api/v1/store/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setIsPending(false);
        message.success("تم الحذف بنجاح");
        // alert("Deleted Success");
        axios
          .get(
            `${API_ENDPOINT}/api/v1/store/products`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          )
          .then((response) => {
            setIsPending(false);
            setData(response.data);
          });
      })
      .catch((error) => {
        setIsPending(false);
        // console.log(error);
      });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="my-5">
        <h1 className="heading text-center p-3">اقسام المنتجات</h1>
      </div>
      <div className="content-area-table">
        <Link
          className="data-table-info"
          to={`/warehouse/returants/show-resturants2/${item?.id}/create-new/product`}
          state={{ item }}
        >
          <button type="button" className="btn  add-btn">
            + إضافة منتج
          </button>
        </Link>
      </div>

      <table className="table table table-hover mt-5 "
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "var(--text-color-inverted)",
        }}
      >
        <thead>
          <tr className="fw-bold fs-5 my-3">
            <th scope="col" style={{ background: '#edede9' }}>الرقم</th>
            <th scope="col" style={{ background: '#edede9' }}>الإسم</th>
            <th scope="col" style={{ background: '#edede9' }}>السعر</th>
            <th scope="col" style={{ background: '#edede9' }}>الحاله</th>
            <th scope="col" style={{ background: '#edede9' }}>الصوره</th>
            <th scope="col" style={{ background: '#edede9' }}>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index) => (
            <tr
              key={index}
              className=' fs-5 fw-bold content-area-table'
              style={{ border: "1px solid #af8260" }}
            >
              <th scope="row">{index + 1}</th>
              <td className="clickable-cell">{item?.name}</td>
              {/* <td>{item?.id}</td> */}
              <td >{item?.price}</td>
              <td >{item?.status == 0 ? "تحت المراجعه" : "تم المراجعه"}</td>
              <td>
                <img
                  src={item?.image}
                  alt={item?.name}
                  width={"80px"}
                  height={"60px"}
                />
              </td>
              <td>
                <Link
                  to={`/warehouse/returants/show-resturants2/custom-price/product/${item?.id}`}
                  state={{ item }}
                >
                  <button type="button" className="px-3 mt-2 mx-3 btn btn-info">
                    اسعار خاصة
                  </button>
                </Link>
                <Link
                  to={`/warehouse/returants/show-resturants2/updated-product/product/${item?.id}`}
                  state={{ item }}
                >
                  <button type="button" className="px-3 mt-2 mx-3 btn btn-success">
                    تعديل
                  </button>
                </Link>
                <Link
                  to={`/warehouse/returants/subcategory/${item?.id}/add-rescipes`}
                  state={{ item }}
                >
                  <button type="button" className="px-3 mt-2 mx-3 btn btn-warning">
                    اضافة مكون
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => handelDelete(item.id)}
                  className="px-3 mt-2 mx-3 btn btn-danger"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
          {data?.pagination?.count == "0" ? (
            <h3 className="me-3 pt-3">لا يوجد منتجات</h3>
          ) : null}
        </tbody>
      </table>
      {data?.data?.length > 0 && (
        <Pagination
          className="pagination"
          current={currentPage}
          onChange={handlePageChange}
          total={data?.pagination?.total || 1}
          showSizeChanger={false}
        />
      )}
    </div>
  );
};

export default DetailsProduct2;
