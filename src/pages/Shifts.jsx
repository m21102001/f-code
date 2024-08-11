import React, { useState } from 'react'
import Table from '../components/shared/table/Table'

const Shifts = () => {
  const [active, setActive] = useState(false)
  const [activeItemId, setActiveItemId] = useState(null);
  const placess = [
    {
      id: 1,
      name: " جاردن 1",
    },
    {
      id: 2,
      name: "جاردن 2",
    },
    {
      id: 3,
      name: "Burger King",
    },
    {
      id: 4,
      name: "Burger King",
    },
    {
      id: 5,
      name: "Burger King",
    },
    {
      id: 6,
      name: "Burger King",
    },
    {
      id: 7,
      name: "Burger King",
    },
    {
      id: 8,
      name: "Burger King",
    },
    {
      id: 9,
      name: "Burger King",
    },
    {
      id: 10,
      name: "Burger King",
    },
    {
      id: 11,
      name: "Burger King",
    },
    {
      id: 12,
      name: "Burger King",
    },
    {
      id: 13,
      name: "Burger King",
    },
    {
      id: 14,
      name: "Burger King",
    },
    {
      id: 15,
      name: "Burger King",
    },
  ]

  // const isActive = () => {
  //   (active == false) ? (
  //     active = true
  //   ) : (
  //     active = false
  //   )
  // };
  return (
    <div className=''>
      <div className="shadow-lg p-3 mb-5 rounded text-center fs-2 fw-bold shifts text-light" >الشيفتات</div>

      <div className=''>
        <div className="container text-center ">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="row g-2">
                <div className="col-md">
                  <div className="form-floating">
                    <select className="form-select" id="floatingSelectGrid">
                      <option selected>احمد محمد</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <label htmlFor="floatingSelectGrid">الكاشير</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3 d-flex text-center">
                <label htmlFor="exampleFormControlInput1" className="form-label ps-3 ">من</label>
                <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3 d-flex text-center">
                <label htmlFor="exampleFormControlInput1" className="form-label ps-3 ">الى</label>
                <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="row g-2">
                <div className="col-md">
                  <div className="form-floating">
                    <select className="form-select" id="floatingSelectGrid">
                      <option value="0">السبت</option>
                      <option value="1">الاحد</option>
                      <option value="2">الاتنين</option>
                      <option value="3">الثلاثاء</option>
                      <option value="4">الاربعاء</option>
                      <option value="5">الخميس</option>
                      <option value="6">الجمعة</option>
                    </select>
                    <label htmlFor="floatingSelectGrid">اليوم</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around flex-wrap">
          {placess?.map((item, index) => (
            <button
              onClick={() => setActiveItemId(item.id)}
              // value={active}
              // onChange={() => setActive(!active)}
              class={`form-check  pe-3 py-3 m-3 shadow rounded shift-hover ${activeItemId === item.id ? "shifts" : ""} 
              `}
              key={index}
              style={{ border: "2px solid #803d3b" }}
            >
              {/*  <div className="form-check  pe-3 py-3 m-3 shadow rounded" style={{ backgroundColor: "#803d3b69" }} key={index}> */}
              {/* <input className="form-check-input" type="checkbox" value={index} id="defaultCheck1" /> */}
              <label className="form-check-label border-success border-3 " htmlFor="defaultCheck1">
                {item?.name}
              </label>
            </button>
          ))}
        </div>
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-primary bg-brown text-light m-auto mt-5" style={{ width: "50%", backgroundColor: '#803D3B', border: 0 }} type="button">حفظ</button>
      </div>
    </div >

  )
}

export default Shifts