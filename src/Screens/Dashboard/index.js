import { useState, useEffect } from "react";

import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { CChart } from "@coreui/react-chartjs";
import { SelectBox } from "../../Components/CustomSelect";
import {useApi} from "../../Api";

import "./style.css";

export const Dashboard = () => {
  const [data, setData] = useState('');
  const [lead, setLead] = useState('');
  const [recived, setReceived] = useState('');
  const [amount, setAmount] = useState('');
  // const { apiData: leadsAmountData, loading: dataLoading } = useApi('admin/leads-amount');
  // const { apiData: leadsAmountMonthlyData, loading: leadLoading} = useApi('admin/leads-amount-monthly');
  // const { apiData: leadsAmountReceivedData, loading: receivedLoading} = useApi('admin/leads-amount-received');
  // const { apiData: leadsAmountReceivedMonthlyData, loading: AmountLoading } = useApi('admin/leads-amount-received-monthly');


  useEffect(() => {

    document.title = 'Blinds And Shades Admin | Dashboard';
  }, []);


  // useEffect(() => {
  //   setData(leadsAmountData)
  //   setLead(leadsAmountMonthlyData)
  //   setReceived(leadsAmountReceivedData)
  //   setAmount(leadsAmountReceivedMonthlyData)

  // }, [leadsAmountData, leadsAmountMonthlyData, leadsAmountReceivedData, leadsAmountReceivedMonthlyData])


  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row">
                  <div className="col-xl-4 col-md-6 stats">
                    <div className="statsCard mb-3 mb-md-0">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {leadLoading ? 'Loading...' : <h3 className="statsNumber">{`$ ${data?.totalSum}`}</h3>} */}
                          <h3 className="statsNumber">125</h3>
                          <p className="statsText">Total Customers</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats">
                    <div className="statsCard mb-3 mb-md-0">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {receivedLoading ? 'Loading... ' : <h3 className="statsNumber">{`$ ${recived?.totalSumReceivedAmount}`}</h3>} */}
                          <h3 className="statsNumber">55</h3>
                          <p className="statsText">Total Orders</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          {/* {AmountLoading ? 'Loading...' : 
                          <h3 className="statsNumber">{`$ ${amount?.sumAmountMonthlyReceived}`}</h3>
                          } */}
                          <h3 className="statsNumber">45</h3>
                          <p className="statsText">Total Test List</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          <FontAwesomeIcon
                            icon={faArrowCircleDown}
                            className="me-2 redColor"
                          />

                          100 %
                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="d-flex flex-wrap justify-content-between">
                  <h3 className="mainTitle">Total Orders</h3>
                  <SelectBox selectClass="mainInput" name="Monthly" required option={'optionData'}

                  />
                </div>
                <div className="graph-wrapper">
                  <CChart
                    type="line"
                    height="90"
                    options={{
                      scales: {
                        y: {
                          suggestedMin: 0,
                          suggestedMax: 40,
                        },
                      },
                    }}
                    data={{
                      labels: ["Nov 2023"],
                      tension: "0.5",
                      datasets: [
                        {
                          label: "Total Orders",

                          backgroundColor: "#9fa7e3",
                          borderColor: "#9fa7e3",
                          pointBackgroundColor: "#9fa7e3",
                          pointBorderColor: "#9fa7e3",
                          borderWidth: 1,
                          data: [35, 45, 55, 65, 70],
                          tension: 0.5,
                        },
                        {
                          label: "Pending Orders",
                          backgroundColor: "#95be89",
                          borderColor: "#95be89",
                          pointBackgroundColor: "#95be89",
                          borderWidth: 1,
                          pointBorderColor: "#95be89",
                          data: [20, 30, 40, 50, 60],
                          tension: 0.5,
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
