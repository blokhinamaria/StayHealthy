import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

import './Navbar.css';



const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ username, setUsername ] = useState("");

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("phone");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("accountType");

        // localStorage.removeItem("doctoData");

        setIsLoggedIn(false);

        //Remove th reviewFormData from local storage 
        // for (let i=0; i < localStorage.length; i++) {
        //     const key = localStorage.key(i);
        //     if (key.startsWith("reviewFormData_")) {
        //         localStorage.removeItem(key);
        //     }
        // }
        // setEmail('');
        window.location.reload();
    };

    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        if (storedName) {
            setIsLoggedIn(true);
            setUsername(storedName);
        }
    })

    return (
        <div>
            <nav className="navbar navbar-expand-md p-4 fixed-top ">
            <div className="container-fluid">
                
                {/* Navbar Brand */}
                <div className="navbar-brand ms-3">
                    <Link className="navbar-brand" to="/">
                        <svg width="168" height="26" viewBox="0 0 168 26" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5341 9C10.4886 8.43182 10.2756 7.98864 9.89489 7.67045C9.51989 7.35227 8.94886 7.19318 8.18182 7.19318C7.69318 7.19318 7.29261 7.25284 6.98011 7.37216C6.6733 7.4858 6.44602 7.64205 6.2983 7.84091C6.15057 8.03977 6.07386 8.26705 6.06818 8.52273C6.05682 8.73295 6.09375 8.9233 6.17898 9.09375C6.26989 9.25852 6.41193 9.40909 6.60511 9.54545C6.7983 9.67614 7.04545 9.79545 7.34659 9.90341C7.64773 10.0114 8.00568 10.108 8.42045 10.1932L9.85227 10.5C10.8182 10.7045 11.6449 10.9744 12.3324 11.3097C13.0199 11.6449 13.5824 12.0398 14.0199 12.4943C14.4574 12.9432 14.7784 13.4489 14.983 14.0114C15.1932 14.5739 15.3011 15.1875 15.3068 15.8523C15.3011 17 15.0142 17.9716 14.446 18.767C13.8778 19.5625 13.0653 20.1676 12.0085 20.5824C10.9574 20.9972 9.69318 21.2045 8.21591 21.2045C6.69886 21.2045 5.375 20.9801 4.24432 20.5312C3.11932 20.0824 2.24432 19.392 1.61932 18.4602C1 17.5227 0.6875 16.3239 0.681818 14.8636H5.18182C5.21023 15.3977 5.34375 15.8466 5.58239 16.2102C5.82102 16.5739 6.15625 16.8494 6.58807 17.0369C7.02557 17.2244 7.54545 17.3182 8.14773 17.3182C8.65341 17.3182 9.0767 17.2557 9.41761 17.1307C9.75852 17.0057 10.017 16.8324 10.1932 16.6108C10.3693 16.3892 10.4602 16.1364 10.4659 15.8523C10.4602 15.5852 10.3722 15.3523 10.2017 15.1534C10.0369 14.9489 9.7642 14.767 9.38352 14.608C9.00284 14.4432 8.48864 14.2898 7.84091 14.1477L6.10227 13.7727C4.55682 13.4375 3.33807 12.8778 2.44602 12.0938C1.55966 11.304 1.11932 10.2273 1.125 8.86364C1.11932 7.75568 1.41477 6.78693 2.01136 5.95739C2.61364 5.12216 3.44602 4.47159 4.50852 4.00568C5.5767 3.53977 6.80114 3.30682 8.18182 3.30682C9.59091 3.30682 10.8097 3.54261 11.8381 4.0142C12.8665 4.4858 13.6591 5.15057 14.2159 6.00852C14.7784 6.8608 15.0625 7.85795 15.0682 9H10.5341ZM24.9844 7.90909V11.3182H16.3594V7.90909H24.9844ZM18.0298 4.77273H22.7344V16.7898C22.7344 16.9716 22.7656 17.125 22.8281 17.25C22.8906 17.3693 22.9872 17.4602 23.1179 17.5227C23.2486 17.5795 23.4162 17.608 23.6207 17.608C23.7628 17.608 23.9276 17.5909 24.1151 17.5568C24.3082 17.5227 24.4503 17.4943 24.5412 17.4716L25.223 20.7784C25.0128 20.8409 24.7116 20.9176 24.3196 21.0085C23.9332 21.0994 23.473 21.1591 22.9389 21.1875C21.8594 21.2443 20.9531 21.1335 20.2202 20.8551C19.4872 20.571 18.9361 20.125 18.5668 19.517C18.1974 18.9091 18.0185 18.1477 18.0298 17.233V4.77273ZM30.5518 21.2045C29.7166 21.2045 28.978 21.0682 28.3359 20.7955C27.6996 20.517 27.1996 20.0966 26.8359 19.5341C26.4723 18.9716 26.2905 18.2557 26.2905 17.3864C26.2905 16.6705 26.4126 16.0597 26.657 15.554C26.9013 15.0426 27.2422 14.625 27.6797 14.3011C28.1172 13.9773 28.6257 13.7301 29.2053 13.5597C29.7905 13.3892 30.4212 13.2784 31.0973 13.2273C31.8303 13.1705 32.4183 13.1023 32.8615 13.0227C33.3104 12.9375 33.6342 12.821 33.8331 12.6733C34.032 12.5199 34.1314 12.3182 34.1314 12.0682V12.0341C34.1314 11.6932 34.0007 11.4318 33.7393 11.25C33.478 11.0682 33.1428 10.9773 32.7337 10.9773C32.2848 10.9773 31.9183 11.0767 31.6342 11.2756C31.3558 11.4687 31.1882 11.767 31.1314 12.1705H26.8018C26.8587 11.375 27.1115 10.642 27.5604 9.97159C28.0149 9.29545 28.6768 8.75568 29.5462 8.35227C30.4155 7.94318 31.5007 7.73864 32.8018 7.73864C33.7393 7.73864 34.5803 7.84943 35.3246 8.07102C36.0689 8.28693 36.7024 8.59091 37.2251 8.98295C37.7479 9.36932 38.1456 9.82386 38.4183 10.3466C38.6967 10.8636 38.8359 11.4261 38.8359 12.0341V21H34.4382V19.1591H34.3359C34.0746 19.6477 33.7564 20.0426 33.3814 20.3438C33.0121 20.6449 32.5888 20.8636 32.1115 21C31.6399 21.1364 31.12 21.2045 30.5518 21.2045ZM32.0859 18.2386C32.4439 18.2386 32.7791 18.1648 33.0916 18.017C33.4098 17.8693 33.6683 17.6562 33.8672 17.3778C34.0661 17.0994 34.1655 16.7614 34.1655 16.3636V15.2727C34.0405 15.3239 33.907 15.3722 33.7649 15.4176C33.6286 15.4631 33.4808 15.5057 33.3217 15.5455C33.1683 15.5852 33.0036 15.6222 32.8274 15.6562C32.657 15.6903 32.478 15.7216 32.2905 15.75C31.9268 15.8068 31.6286 15.9006 31.3956 16.0312C31.1683 16.1562 30.9979 16.3125 30.8842 16.5C30.7763 16.6818 30.7223 16.8864 30.7223 17.1136C30.7223 17.4773 30.8501 17.7557 31.1058 17.9489C31.3615 18.142 31.6882 18.2386 32.0859 18.2386ZM43.4787 25.9091C42.9389 25.9091 42.4247 25.8665 41.9361 25.7812C41.4474 25.7017 41.0185 25.5909 40.6491 25.4489L41.6719 22.108C42.0582 22.2443 42.4105 22.3324 42.7287 22.3722C43.0526 22.4119 43.3281 22.3892 43.5554 22.304C43.7884 22.2188 43.956 22.0568 44.0582 21.8182L44.1605 21.5795L39.5582 7.90909H44.4673L46.581 16.9773H46.7173L48.8651 7.90909H53.8082L49.0355 22.0909C48.7969 22.8125 48.4503 23.4602 47.9957 24.0341C47.5469 24.6136 46.956 25.071 46.223 25.4062C45.4901 25.7415 44.5753 25.9091 43.4787 25.9091ZM55.0781 21V3.54545H59.8168V10.3636H66.0895V3.54545H70.8281V21H66.0895V14.1818H59.8168V21H55.0781ZM79.419 21.2386C78.0213 21.2386 76.8168 20.9716 75.8054 20.4375C74.7997 19.8977 74.0241 19.125 73.4787 18.1193C72.9389 17.108 72.669 15.8977 72.669 14.4886C72.669 13.1364 72.9418 11.9545 73.4872 10.9432C74.0327 9.93182 74.8026 9.14489 75.7969 8.58239C76.7912 8.01989 77.9645 7.73864 79.3168 7.73864C80.3054 7.73864 81.2003 7.89205 82.0014 8.19886C82.8026 8.50568 83.4872 8.9517 84.0554 9.53693C84.6236 10.1165 85.0611 10.821 85.3679 11.6506C85.6747 12.4801 85.8281 13.4148 85.8281 14.4545V15.5455H74.1349V12.9545H81.4986C81.4929 12.5795 81.3963 12.25 81.2088 11.9659C81.027 11.6761 80.7798 11.4517 80.4673 11.2926C80.1605 11.1278 79.8111 11.0455 79.419 11.0455C79.0384 11.0455 78.6889 11.1278 78.3707 11.2926C78.0526 11.4517 77.7969 11.6733 77.6037 11.9574C77.4162 12.2415 77.3168 12.5739 77.3054 12.9545V15.75C77.3054 16.1705 77.3935 16.5455 77.5696 16.875C77.7457 17.2045 77.9986 17.4631 78.3281 17.6506C78.6577 17.8381 79.0554 17.9318 79.5213 17.9318C79.8452 17.9318 80.1406 17.8864 80.4077 17.7955C80.6804 17.7045 80.9134 17.5739 81.1065 17.4034C81.2997 17.2273 81.4418 17.017 81.5327 16.7727H85.8281C85.6804 17.6818 85.331 18.4716 84.7798 19.142C84.2287 19.8068 83.4986 20.3239 82.5895 20.6932C81.6861 21.0568 80.6293 21.2386 79.419 21.2386ZM91.3956 21.2045C90.5604 21.2045 89.8217 21.0682 89.1797 20.7955C88.5433 20.517 88.0433 20.0966 87.6797 19.5341C87.3161 18.9716 87.1342 18.2557 87.1342 17.3864C87.1342 16.6705 87.2564 16.0597 87.5007 15.554C87.745 15.0426 88.0859 14.625 88.5234 14.3011C88.9609 13.9773 89.4695 13.7301 90.049 13.5597C90.6342 13.3892 91.2649 13.2784 91.9411 13.2273C92.674 13.1705 93.2621 13.1023 93.7053 13.0227C94.1541 12.9375 94.478 12.821 94.6768 12.6733C94.8757 12.5199 94.9751 12.3182 94.9751 12.0682V12.0341C94.9751 11.6932 94.8445 11.4318 94.5831 11.25C94.3217 11.0682 93.9865 10.9773 93.5774 10.9773C93.1286 10.9773 92.7621 11.0767 92.478 11.2756C92.1996 11.4687 92.032 11.767 91.9751 12.1705H87.6456C87.7024 11.375 87.9553 10.642 88.4041 9.97159C88.8587 9.29545 89.5206 8.75568 90.3899 8.35227C91.2592 7.94318 92.3445 7.73864 93.6456 7.73864C94.5831 7.73864 95.424 7.84943 96.1683 8.07102C96.9126 8.28693 97.5462 8.59091 98.0689 8.98295C98.5916 9.36932 98.9893 9.82386 99.2621 10.3466C99.5405 10.8636 99.6797 11.4261 99.6797 12.0341V21H95.282V19.1591H95.1797C94.9183 19.6477 94.6001 20.0426 94.2251 20.3438C93.8558 20.6449 93.4325 20.8636 92.9553 21C92.4837 21.1364 91.9638 21.2045 91.3956 21.2045ZM92.9297 18.2386C93.2876 18.2386 93.6229 18.1648 93.9354 18.017C94.2536 17.8693 94.5121 17.6562 94.7109 17.3778C94.9098 17.0994 95.0092 16.7614 95.0092 16.3636V15.2727C94.8842 15.3239 94.7507 15.3722 94.6087 15.4176C94.4723 15.4631 94.3246 15.5057 94.1655 15.5455C94.0121 15.5852 93.8473 15.6222 93.6712 15.6562C93.5007 15.6903 93.3217 15.7216 93.1342 15.75C92.7706 15.8068 92.4723 15.9006 92.2393 16.0312C92.0121 16.1562 91.8416 16.3125 91.728 16.5C91.62 16.6818 91.5661 16.8864 91.5661 17.1136C91.5661 17.4773 91.6939 17.7557 91.9496 17.9489C92.2053 18.142 92.532 18.2386 92.9297 18.2386ZM106.632 3.54545V21H101.928V3.54545H106.632ZM116.836 7.90909V11.3182H108.211V7.90909H116.836ZM109.881 4.77273H114.586V16.7898C114.586 16.9716 114.617 17.125 114.68 17.25C114.742 17.3693 114.839 17.4602 114.969 17.5227C115.1 17.5795 115.268 17.608 115.472 17.608C115.614 17.608 115.779 17.5909 115.967 17.5568C116.16 17.5227 116.302 17.4943 116.393 17.4716L117.075 20.7784C116.864 20.8409 116.563 20.9176 116.171 21.0085C115.785 21.0994 115.325 21.1591 114.79 21.1875C113.711 21.2443 112.805 21.1335 112.072 20.8551C111.339 20.571 110.788 20.125 110.418 19.517C110.049 18.9091 109.87 18.1477 109.881 17.233V4.77273ZM123.741 13.6364V21H119.037V3.54545H123.571V10.3977H123.707C124.003 9.5625 124.494 8.91193 125.182 8.44602C125.869 7.97443 126.696 7.73864 127.662 7.73864C128.588 7.73864 129.392 7.94886 130.074 8.36932C130.761 8.78977 131.293 9.36932 131.668 10.108C132.048 10.8466 132.236 11.6932 132.23 12.6477V21H127.526V13.6364C127.531 12.9886 127.369 12.4801 127.04 12.1108C126.716 11.7415 126.253 11.5568 125.651 11.5568C125.27 11.5568 124.935 11.642 124.645 11.8125C124.361 11.9773 124.139 12.2159 123.98 12.5284C123.827 12.8352 123.747 13.2045 123.741 13.6364ZM136.947 25.9091C136.408 25.9091 135.893 25.8665 135.405 25.7812C134.916 25.7017 134.487 25.5909 134.118 25.4489L135.141 22.108C135.527 22.2443 135.879 22.3324 136.197 22.3722C136.521 22.4119 136.797 22.3892 137.024 22.304C137.257 22.2188 137.425 22.0568 137.527 21.8182L137.629 21.5795L133.027 7.90909H137.936L140.05 16.9773H140.186L142.334 7.90909H147.277L142.504 22.0909C142.266 22.8125 141.919 23.4602 141.464 24.0341C141.016 24.6136 140.425 25.071 139.692 25.4062C138.959 25.7415 138.044 25.9091 136.947 25.9091Z"/>
                            <path d="M158.5 10.5C159.94 10.5 161.321 9.94688 162.339 8.96231C163.357 7.97775 163.929 6.64239 163.929 5.25C163.929 3.85761 163.357 2.52226 162.339 1.53769C161.321 0.553123 159.94 0 158.5 0C157.06 0 155.679 0.553123 154.661 1.53769C153.643 2.52226 153.071 3.85761 153.071 5.25C153.071 6.64239 153.643 7.97775 154.661 8.96231C155.679 9.94688 157.06 10.5 158.5 10.5ZM154.429 12.7641C151.29 13.6541 149 16.4596 149 19.7818C149 20.4545 149.564 21 150.26 21H166.74C167.436 21 168 20.4545 168 19.7818C168 16.4596 165.71 13.6541 162.571 12.7641V14.8477C163.742 15.1389 164.607 16.1684 164.607 17.3906V19.0312C164.607 19.3922 164.302 19.6875 163.929 19.6875H163.25C162.877 19.6875 162.571 19.3922 162.571 19.0312C162.571 18.6703 162.877 18.375 163.25 18.375V17.3906C163.25 16.6646 162.644 16.0781 161.893 16.0781C161.142 16.0781 160.536 16.6646 160.536 17.3906V18.375C160.909 18.375 161.214 18.6703 161.214 19.0312C161.214 19.3922 160.909 19.6875 160.536 19.6875H159.857C159.484 19.6875 159.179 19.3922 159.179 19.0312V17.3906C159.179 16.1684 160.044 15.1389 161.214 14.8477V12.5057C160.96 12.4811 160.701 12.4688 160.438 12.4688H156.562C156.299 12.4688 156.04 12.4811 155.786 12.5057V15.1881C156.765 15.4711 157.482 16.3488 157.482 17.3906C157.482 18.658 156.418 19.6875 155.107 19.6875C153.797 19.6875 152.732 18.658 152.732 17.3906C152.732 16.3488 153.449 15.4711 154.429 15.1881V12.7641ZM155.107 18.375C155.377 18.375 155.636 18.2713 155.827 18.0867C156.018 17.9021 156.125 17.6517 156.125 17.3906C156.125 17.1296 156.018 16.8792 155.827 16.6946C155.636 16.51 155.377 16.4062 155.107 16.4062C154.837 16.4062 154.578 16.51 154.387 16.6946C154.197 16.8792 154.089 17.1296 154.089 17.3906C154.089 17.6517 154.197 17.9021 154.387 18.0867C154.578 18.2713 154.837 18.375 155.107 18.375Z"/>
                        </svg>                     
                    </Link>
                </div>
                
                {/* Toggle Button */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                      </svg>
                </button>
                
                {/* Navbar Items */}
                <div className="collapse navbar-collapse justify-content-end me-3" id="navbarSupportedContent">
                        <ul className="navbar-nav gap-4 align-items-center">
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="/StayHealthy">Health Tips</Link>
                            </li>
                            
                            
                            {isLoggedIn ? (
                                
                                <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/consultation">Instant Consultation</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/search">Appointments</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/reviews">Reviews</Link>
                                </li>
                                <li className='nav-item'>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown"> 
                                        Welcome, {username}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu id='dropdown-menu' >
                                            <Dropdown.Item id='dropdown-item' href='/profile'>Your Profile
                                                {/* <Link to="/profile">My Profile</Link> */}
                                            </Dropdown.Item>
                                            <Dropdown.Item id='dropdown-item' href='/reports'>Your Reports
                                                
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    
                                </li>
                                <li className="nav-item">
                                    <Link className="btn" id="logout" to="/StayHealthy" onClick={handleLogout}>
                                    Logout
                                    </Link>
                                </li>
                                </>

                            ) : (
                                <>
                                <li className="nav-item">
                                    <Link className="btn" id="signUp" to="/signup">          
                                    Sign Up
                                    </Link>
                                </li>
                                <li className="nav-item">
                                <Link className="btn" id="login" to="/login">
                                    Login
                                </Link>
                                </li>
                                </>)} 
                        </ul>  
                </div>
            </div>
       </nav>
        </div>
    )
}

export default Navbar;