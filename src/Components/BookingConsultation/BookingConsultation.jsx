import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch.jsx";
import DoctorCard from "./DoctorCard/DoctorCard.jsx";



const BookingConsultation = () => {

    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then((res) => res.json())
            .then((data) => {
                setDoctors(data);
                const specialityParam = searchParams.get('speciality');
                if (specialityParam) {
                    const filtered = data.filter(
                        (doctor) =>
                            doctor.speciality.toLowerCase() ===
                            specialityParam.toLowerCase()
                    );
                    setFilteredDoctors(filtered);
                    setIsSearched(true);
                } else {
                    setFilteredDoctors([]);
                    setIsSearched(false);
                }
            })
            .catch((err) => console.log(err));
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
            // Uncomment if login auth required:
            // const authtoken = sessionStorage.getItem("auth-token");
            // if (!authtoken) {
            //     navigate("/login");
            // }
        }, [searchParams]);

    return (
        <>
            <div className='searchpage-container'>
            <FindDoctorSearch onSearch={handleSearch}/>
            <div className='search-results-container'>
                {isSearched && (
                    <center>
                        <h2>{filteredDoctors.length} doctors are available near you</h2>
                    
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor, index) => (
                            <DoctorCard
                                className="doctorCard"
                                {...doctor}
                                key={index}
                            />
                        ))
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