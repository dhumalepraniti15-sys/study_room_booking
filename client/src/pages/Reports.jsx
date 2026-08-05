import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Reports.css";


const Reports = () => {


  const [reports, setReports] = useState(null);

  const [loading, setLoading] = useState(true);



  const fetchReports = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/admin/reports"
      );


      setReports(response.data);


    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchReports();

  }, []);




  if (loading) {

    return (
      <div className="report-loader">
        Loading Reports...
      </div>
    );

  }




  return (

    <div className="reports-page">


      <div className="reports-title">

        <h1>
          Reports
        </h1>

        <p>
          Booking system performance overview
        </p>

      </div>



      <div className="report-grid">


        <div className="report-box">

          <h4>
            Total Users
          </h4>

          <h2>
            {reports?.totalUsers}
          </h2>

        </div>



        <div className="report-box">

          <h4>
            Total Rooms
          </h4>

          <h2>
            {reports?.totalRooms}
          </h2>

        </div>




        <div className="report-box">

          <h4>
            Total Bookings
          </h4>

          <h2>
            {reports?.totalBookings}
          </h2>

        </div>




        <div className="report-box">

          <h4>
            Revenue
          </h4>

          <h2>
            ₹ {reports?.revenue}
          </h2>

        </div>



      </div>





      <div className="status-card">


        <h2>
          Booking Status
        </h2>



        <div className="status-grid">


          <div className="status-item">

            <p>
              Confirmed Bookings
            </p>

            <h2>
              {reports?.confirmedBookings}
            </h2>

          </div>




          <div className="status-item">

            <p>
              Cancelled Bookings
            </p>

            <h2>
              {reports?.cancelledBookings}
            </h2>

          </div>


        </div>


      </div>



    </div>

  );

};


export default Reports;