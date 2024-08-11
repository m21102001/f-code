import React, { useEffect, useRef, useState } from "react";
import LogoDAR from "../../../../../../../public/assets/images/Dar_logo.svg";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { getOrderById } from "../../../../../../apis/orders";
import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';
import { useReactToPrint } from "react-to-print";

function PrintAfterSubmit({ data }) {
  //   const { id } = useParams();
  const componentRef = useRef();
  //   const [data, setData] = useState({
  //     code: "",
  //     status: "",
  //     client: "",
  //     invoice_date: "",
  //     client_type: "",
  //     recipeData: [],
  //     total_price: 0,
  //     total_price_after_discount_and_tax: 0,
  //     departmentName: "",
  //     cashier:"",
  //     client :"",
  //     payment:""
  //   });

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const InvoiceData = await getOrderById(id);
  //         // console.log(InvoiceData.data);
  //         setData({
  //           code: InvoiceData.data.code,
  //           cashier:InvoiceData.data.casher,
  //           client:InvoiceData.data.client,
  //           payment : InvoiceData.data.payment_method,
  //           status: InvoiceData.data.status,
  //           invoice_date: InvoiceData.data.order_date,
  //           client_type: InvoiceData.data.client_type,
  //           recipeData: InvoiceData.data.products,
  //           total_price: InvoiceData.data.total_price,
  //           total_price_after_discount_and_tax:
  //             InvoiceData.data.total_price_after_discount_and_tax,
  //           departmentName: InvoiceData.data.department,
  //         });
  //       } catch (error) {
  //         // console.log("Error fetching data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, [id]);

  // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa>>>>>>>>>>>>>>>>>>>>>>>>>>>>",data)

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${data.code + "-" + "أوردر كود"}`
  });

  useEffect(() => {
    generatePDF();
  }, [data]);



  const styles = {
    printer: {
      padding: "20px",
    },
    text: {
      fontSize: "16px",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "600",
      padding: "3px",
    },
    line: {
      marginBottom: "10px",
    },
    totalPrice: {
      textAlign: "right",
      fontWeight: "bold",
      backgroundColor: "#c5f7f3",
    },
  };

  return (
    <div id="invoice-container" ref={componentRef} dir="rtl" style={{ display: "flex", justifyContent: "center" }} >
      <Printer ref={componentRef} className="main">
        <div className="headers-wrapper">
          <div className="main-title">
            <p> أوردر من {data.department}</p>
          </div>
          <div className="header-img">
            <img
              src={LogoDAR}
              alt=""
              style={{ width: "64px", marginBottom: "5px", marginLeft: "5px" }}
            />
          </div>
        </div>
        <div className="invoice-info">
          <div className="invoice-info-item">
            <h2>تـفاصيل الأوردر :</h2>
            <p>كـــــود الأوردر : {data.code}</p>
            <p>تـاريـــخ الأوردر : {data.order_date}</p>
            <p>رقم الترابيزة : {data.table_number}</p>
          </div>
          <div className="invoice-info-item">
            <p>
              اسم الكاشير : {data.casher}
            </p>
            <p>اسم العميل : {data?.client}</p>
            <p>الفئة : {data?.client_type}</p>
            <p> طريقة الدفع : {data?.payment_method}</p>
          </div>
        </div>
        <div className="invoice-items">
          <h2>محــــــتويات الأوردر</h2>
          <table>
            <thead>
              <tr>
                <th className="text-center">رقم العنصر</th>
                <th className="text-center">اسم العنصر</th>
                <th className="text-center">سعر العنصر الواحد</th>
                <th className="text-right">الكمية</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((recipe, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{recipe?.name}</td>
                  <td className="text-center">{recipe?.price}</td>
                  <td className="text-right">{recipe?.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>السعر الكلي</td>
                <td colSpan={2}>{data.total_price} ج.م</td>
              </tr>
              <tr>
                <td colSpan={2}>السعر الكلي بعد الخصم</td>
                <td colSpan={2}>{data.total_price_after_discount_and_tax} ج.م</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <Cut />
      </Printer>
    </div>
  );
}

export default PrintAfterSubmit;