import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageBookings.css";


const ManageBookings = () => {


  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);




  // Fetch all bookings

  const getBookings = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/bookings/admin/all",
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );


      setBookings(res.data.bookings);


    } catch (error) {

      console.log(
        "Booking Fetch Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };




  useEffect(() => {

    getBookings();

  }, []);






  // Update Status

  const updateStatus = async (id, status) => {

    try {


      await axios.patch(

        `http://localhost:5000/api/bookings/admin/${id}/status`,

        {
          status
        },

        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }

      );


      getBookings();


    } catch (error) {


      console.log(
        "Status Update Error:",
        error
      );


    }

  };







  // Delete Booking

  const deleteBooking = async (id) => {


    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this booking?"
      );



    if (!confirmDelete)
      return;




    try {


      await axios.delete(

        `http://localhost:5000/api/bookings/admin/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }

      );


      getBookings();



    } catch (error) {


      console.log(
        "Delete Error:",
        error
      );


    }


  };







  if (loading) {


    return (

      <div className="booking-loading">

        Loading bookings...

      </div>

    );


  }








  return (


    <div className="manage-bookings-page">



      <div className="manage-bookings-header">


        <div>

          <h1>
            Manage Bookings
          </h1>


          <p>
            View and manage all student room reservations
          </p>

        </div>


      </div>






      {

        bookings.length === 0 ?



        (

          <div className="no-bookings">


            <h3>
              No bookings found
            </h3>


            <p>
              There are no room reservations available.
            </p>


          </div>

        )



        :



        (

        <div className="booking-table-card">



        <table className="booking-table">


          <thead>

            <tr>

              <th>
                Student
              </th>


              <th>
                Room
              </th>


              <th>
                Date
              </th>


              <th>
                Time
              </th>


              <th>
                Amount
              </th>


              <th>
                Status
              </th>


              <th>
                Action
              </th>


            </tr>


          </thead>





          <tbody>


          {

          bookings.map((booking)=>(



            <tr key={booking._id}>


              <td>


                <div className="student-info">


                  <strong>

                    {booking.user?.name}

                  </strong>


                  <span>

                    {booking.user?.email}

                  </span>


                </div>


              </td>






              <td>


                <div className="room-name">

                  {booking.room?.name}

                </div>


                <div className="room-location">

                  {booking.room?.location}

                </div>


              </td>






              <td>


                {

                new Date(
                  booking.date
                )
                .toLocaleDateString()

                }


              </td>






              <td>


                {booking.startTime}

                {" - "}

                {booking.endTime}


              </td>






              <td>


                ₹{booking.totalAmount}


              </td>







              <td>


                <span

                className={
                  `status ${booking.status}`
                }

                >

                  {booking.status}


                </span>


              </td>







              <td>


                <div className="booking-actions">



                <button

                className="action-btn confirm-btn"

                onClick={()=>
                  updateStatus(
                    booking._id,
                    "confirmed"
                  )
                }

                >

                  Confirm

                </button>






                <button

                className="action-btn cancel-btn"

                onClick={()=>
                  updateStatus(
                    booking._id,
                    "cancelled"
                  )
                }

                >

                  Cancel

                </button>







                <button

                className="action-btn delete-btn"

                onClick={()=>
                  deleteBooking(
                    booking._id
                  )
                }

                >

                  Delete

                </button>



                </div>



              </td>





            </tr>



          ))



          }


          </tbody>



        </table>


        </div>


        )

      }



    </div>


  );


};



export default ManageBookings;