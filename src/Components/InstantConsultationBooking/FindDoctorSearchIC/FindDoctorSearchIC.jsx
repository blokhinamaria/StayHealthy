import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist',
    'Gynecologist/obstetrician',
    'General Physician',
    'Dermatologist',
    'Ear-nose-throat (ent) Specialist',
    'Homeopath',
    'Ayurveda',
];

const FindDoctorSearchIC = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/consultation?speciality=${encodeURIComponent(speciality)}`);
    };

    return (
        <div className="finddoctor">
            <center>
                <h1>Find a doctor and Consult instantly</h1>
                {/* <div>
                    <i
                        style={{ color: '#000000', fontSize: '20rem' }}
                        className="fa fa-user-md"
                    ></i>
                </div> */}
                <div
                    className="home-search-container"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className="doctor-search-box">
                        <input
                            type="text"
                            className="search-doctor-input-box"
                            placeholder="Search doctors, clinics, hospitals, etc."
                            onFocus={() => setDoctorResultHidden(false)}
                            onBlur={() =>
                                setTimeout(() => setDoctorResultHidden(true), 150)
                            }
                            value={searchDoctor}
                            onChange={(e) => setSearchDoctor(e.target.value)}
                        />

                        <div className="findiconimg">
                            <img
                                className="findIcon"
                                src='../../assets/Search.png'
                                alt="search"
                            />
                        </div>
                        <div
                            className="search-doctor-input-results"
                            hidden={doctorResultHidden}
                        >
                            {specialities
                                .filter((speciality) =>
                                    speciality
                                        .toLowerCase()
                                        .includes(searchDoctor.toLowerCase())
                                )
                                .map((speciality) => (
                                    <div
                                        className="search-doctor-result-item"
                                        key={speciality}
                                        onMouseDown={() =>
                                            handleDoctorSelect(speciality)
                                        }
                                    >
                                        <span>
                                            <img
                                                src='../../assets/Search.png'
                                                alt=""
                                                style={{
                                                    height: '10px',
                                                    width: '10px',
                                                }}
                                                width="12"
                                            />
                                        </span>
                                        <span>{speciality}</span>
                                        <span>SPECIALITY</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default FindDoctorSearchIC;
