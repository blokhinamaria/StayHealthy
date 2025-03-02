import React, {use, useState} from "react";
import './FindDoctorSearch.css';
import { useNavigate } from "react-router";


const initSpeciality = [
    'Dentist',
    'Gynecologist/obstetrician',
    'General Physician',
    'Dermatologist',
    'Ear-nose-throat (ent) Specialist',
    'Homeopath',
    'Ayurveda',
];

const FindDoctorSearch = () => {
    const [doctorResultsHidden, setDoctorResultsHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities] = useState(initSpeciality);

    const navigate = useNavigate ();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultsHidden(true);
        navigate(`/search?speciality=${encodeURIComponent(speciality)}`);
    }
 
    return (
        <>
            <div className="findDoctor" style={{
                        marginTop: 150,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', }}>
                <center>
                    <h1>Find a doctor by Specialty Near You</h1>
                    <div className="searchContainer">
                        <div className="searchBarBox">
                            <input 
                                type="text"
                                className="searchBar"
                                placeholder="Type or Choose Specialty"
                                onFocus={() => setDoctorResultsHidden(false)}
                                onBlur={() => setTimeout(() => setDoctorResultsHidden(true), 150)}
                                value={searchDoctor}
                                onChange={(e) => setSearchDoctor(e.target.value)}
                                />
                            <div className="searchIcon">
                                <img src="src/assets/SearchIcon.svg" alt="search" />
                            </div>
                        
                            <div className="searchDropdown" hidden={doctorResultsHidden}>
                                {specialities
                                    .filter((speciality) => 
                                        speciality.toLowerCase().includes(searchDoctor.toLowerCase())
                                    )
                                    .map((speciality) => (
                                        <div
                                        className="searchDropdownItem" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}
                                        >
                                        <span>{speciality}</span>
                                        <span>SPECIALITY</span>
                                        </div>
                                    ))
                                }
                            </div>
                            </div>
                        </div>        
                </center>
            </div>
        </>
    );
};

export default FindDoctorSearch;