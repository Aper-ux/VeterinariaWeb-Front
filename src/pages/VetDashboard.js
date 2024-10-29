import React from 'react';
import './VetDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faStar, faCalendarAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const VetDashboard = () => {
    return (
        <div className="vet-dashboard">
            <h1 className="dashboard-title">Daily Overview</h1>

            <section className="overview-cards">
                <div className="card">
                    <FontAwesomeIcon icon={faPaw} className="icon" />
                    <h2>78</h2>
                    <p>pets</p>
                </div>
                <div className="card">
                    <FontAwesomeIcon icon={faStar} className="icon" />
                    <h2>12</h2>
                    <p>reviews</p>
                </div>
                <div className="card">
                    <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                    <h2>13</h2>
                    <p>appointments</p>
                </div>
                <div className="card">
                    <FontAwesomeIcon icon={faClipboardList} className="icon" />
                    <h2>1</h2>
                    <p>surgery</p>
                </div>
            </section>

            <section className="schedule">
                <h2>Schedule</h2>
                <div className="schedule-grid">
                    <div className="time-slot">08:00</div>
                    <div className="appointment">Examination</div>
                    <div className="time-slot">09:00</div>
                    <div className="appointment">Schedule Appointment</div>
                    <div className="time-slot">10:00</div>
                    <div className="appointment">Examine Pet</div>
                    {/* Agrega más slots de tiempo y citas según sea necesario */}
                </div>
            </section>

            <section className="upcoming-appointments">
                <h2>Upcoming Appointments</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Pet Name</th>
                            <th>Pet Owner Name</th>
                            <th>Pet Condition</th>
                            <th>Appointment Date</th>
                            <th>Appointment Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Max</td>
                            <td>John Doe</td>
                            <td>Vaccination</td>
                            <td>29/06/2023, 08:00 AM</td>
                            <td>First visit</td>
                        </tr>
                        {/* Agrega más citas según sea necesario */}
                    </tbody>
                </table>
            </section>

            <section className="notifications">
                <h2>Notifications</h2>
                <div className="notification">
                    <p>You have 38 appointments</p>
                </div>
                <div className="notification">
                    <p>Your vacation request was approved</p>
                </div>
                <div className="notification">
                    <p>Pet Owner Name cancelled their appointment</p>
                </div>
                {/* Agrega más notificaciones según sea necesario */}
            </section>
        </div>
    );
};

export default VetDashboard;
