import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";

const initSpeciality = [
    'Primary Care',
    'Dental',
    'Gynecology/Obstetrics',
    'Dermatology',
    'Ear-nose-throat (ENT)',
    'Homeopathy',
    'Physical therapy'
];

const FindDoctorSearch = () => {
    const [doctorResultsHidden, setDoctorResultsHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState("");
    const [specialities] = useState(initSpeciality);
    
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultsHidden(true);
        navigate(`/search?speciality=${encodeURIComponent(speciality)}`);
    };

    const handleSearchBarClear = () => {
        setSearchDoctor("");
    };
 
    return (
        <>
            <div className="findDoctor" style={{
                        marginTop: 150,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', }}>
                <center>
                    <img src="./assets/Search.png" alt="Search image" width="100" height="100" className="m-3" ></img>
                    <h2>Find a Doctor by Specialty Near You</h2>
                    <div className="searchContainer" style={{marginTop: 25}}>
                            <input 
                                type="text"
                                className="searchBar"
                                placeholder="Type or Choose Specialty"
                                onFocus={() => setDoctorResultsHidden(false)}
                                onBlur={() => setTimeout(() => setDoctorResultsHidden(true), 150)}
                                value={searchDoctor}
                                onChange={(e) => setSearchDoctor(e.target.value)}
                                onClick={(e) => setSearchDoctor(e.target.value)}
                                onDoubleClick={handleSearchBarClear}
                                />
                            <div className="searchIcon">
                                <img src="./assets/SearchIcon.svg" alt="search" />
                            </div>
                        
                            <div className="searchDropdown" hidden={doctorResultsHidden}>
                                {specialities
                                    .filter((speciality) => 
                                        speciality.toLowerCase().includes(searchDoctor.toLowerCase())
                                    )
                                    .map((speciality) => (
                                        <div
                                        className="searchDropdownItem" style={{listStyleType: 'none'}} key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}
                                        >
                                        <span>{speciality}</span>
                                        <span>Specialist</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>        
                </center>
            </div>
        </>
    );
};

export default FindDoctorSearch;