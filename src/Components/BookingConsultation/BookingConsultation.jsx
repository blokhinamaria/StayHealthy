import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch.jsx";
import DoctorCard from "./DoctorCard/DoctorCard.jsx";

import doctors from "../../data/doctors.js" //doctor database




const BookingConsultation = () => {

    const [searchParams] = useSearchParams();
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const [searchedSpeciality, setSearchedSpeciality] = useState("");
    
    //This logic fetches the data from the local file
    const getDoctorsDetails = () => {
        const specialityParam = searchParams.get("speciality");
        if (specialityParam) {
            const filtered = doctors.filter((doctor) => doctor.speciality.toLowerCase() === specialityParam.toLowerCase());
            setFilteredDoctors(filtered);
            setIsSearched(true);
            setSearchedSpeciality(specialityParam);
        } else {
            setFilteredDoctors([]);
            setIsSearched(false);
        }
    };


    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter((doctor) =>
                doctor.speciality
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };
     const navigate = useNavigate();
    
     useEffect(() => {
            getDoctorsDetails();
            const authtoken = sessionStorage.getItem("auth-token");
            if (!authtoken) {
                navigate("/login");
            }
        }, [searchParams]);

    return (
        <>
            <div className='container'>
            <FindDoctorSearch onSearch={handleSearch}/>
            <div className='search-results-container' style={{marginTop: 80}}>
                {isSearched && (
                    <center>
                    {filteredDoctors.length > 0 ? (
                        <>
                        <p className='description'>{filteredDoctors.length} {filteredDoctors.length !== 1 ? (`${searchedSpeciality} Specialists`) : (`${searchedSpeciality} Specialist`)} are available near you</p>
                        {filteredDoctors.map((doctor, id) => (
                            <DoctorCard
                                className="doctorCard"
                                {...doctor}
                                key={id}
                            />
                        ))}
                        </>
                    ) : (
                        <p>No doctors found</p>
                    )}
                    </center>
                )}
            </div>
           
            </div>
        </>
    );
};

export default BookingConsultation;