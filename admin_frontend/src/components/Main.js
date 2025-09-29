import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Link, Navigate } from "react-router-dom";
import Movies from './Movies';
import TvShows from './TvShows';
import Users from './Users';
import Content from './Content/Index';
import Reports from './Reports';
import Settings from './Settings';
import Profile from './Profile';
import { useSelector } from 'react-redux';
// import * as action from '../Action/VerifyToken/VerifyToken_Action';
import PaymentMethod from './PaymentMethod';
import Loader from './Loader';
import Dashboard from './Dashboard';
import ScrollProgress from './ScrollProgress';
import MediaGallery from './MediaGallery';
import TopContents from './TopContents';
import Actors from './Actors';
import Genres from './Genres';
import Languages from './Languages';
import LiveTvCategories from './LiveTvCategories';
import LiveTvChannels from './LiveTvChannels';
import Notification from './Notification';
import Tags from './Tags';
import Types from './Types';
import Plans from './Plans';
import Episodes from './Content/Episodes';
import Breadcrumbs from './Breadcrumbs';
import ViewUser from './ViewUser';
import AboutUs from './Pages/AboutUs';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsCondition from './Pages/TermsCondition';
import AdsSetting from './AdsSetting';
import AdsSettingUpdate from './AdsSettingUpdate';
import VipPlans from './VipPlans';
import OrderHistory from './OrderHistory';
import Reward from './Settings/Reward';
import Tickets from './Tickets';
import { useAuth } from '../context/Context';
import SendNotification from './SendNotification';

const Main = () => {
    const { logout, token, user } = useAuth();
    const location = useLocation();
	// const dispatch = useDispatch();
    const currentRoute = location.pathname.replace(/\/+$/, '');
    const { loading } = useSelector(state => state.VerifyTokenReducer);
    const { payload } = useSelector(state => state.GetSiteDataReducer);
    const [siteData, setSiteData] = useState({});
    const [menuOpen, setMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // const [profileData, setProfileData] = useState({});
    const popupRef = useRef(null);
    // const hasFetched = useRef();
    // const token = localStorage.getItem('token');
    // useEffect(() => {
    //     if (hasFetched.current) return;
    //     hasFetched.current = true;
    
    //     const verifyToken = async () => {
    //         if(token){
    //             dispatch(action.verifyToken({token: token})).then((response) => {
    //                 setProfileData(JSON.parse(localStorage.getItem('admin_details')));
    //             }).catch(error => {
    //                 logout();
    //             })
    //         } else {
    //             logout();
    //         }
    //     }

    //     verifyToken();
    // }, [dispatch, token]);
    useEffect(() => {
        setSiteData(payload?.responseDetails)
    }, [payload]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('no_scroll', 'active_menu');
        } else {
            document.body.classList.remove('no_scroll', 'active_menu');
        }
    }, [menuOpen]);

    // Close popup if user clicks outside content
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && e.target === popupRef.current) {
                closePopup();
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    // const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    const toggleMenu = () => {
        setTimeout(() => {
          setMenuOpen(prev => !prev);
        }, 50);
    };
    
    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleMenuOnMobile = (setMenuOpen) => {
        if (window.innerWidth <= 991) {
            setMenuOpen(prev => !prev);
        }
    };
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {
                loading ? <Loader /> : 
                    <>
                        {menuOpen && <div className="overlay active" onClick={closeMenu}></div>}

                        {/* Upgrade Plan Popup */}
                        {isOpen && (
                            <div id="upgrade-popup" className="upgrade-popup" ref={popupRef}>
                                <div className="popup-overlay"></div>
                                <div className="popup-content">
                                    <button id="close-upgrade" className="close-btn" onClick={closePopup}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                    <h2>Choose Your Plan</h2>
                                    <div className="plans">
                                        <div className="plan">
                                            <h3>Basic</h3>
                                            <p className="price">$4.99 / month</p>
                                            <ul>
                                                <li>Access to 100+ movies</li>
                                                <li>Standard Quality</li>
                                                <li>Ads Supported</li>
                                            </ul>
                                            <button className="select-btn">Select</button>
                                        </div>
                                        <div className="plan">
                                            <h3>Premium</h3>
                                            <p className="price">$9.99 / month</p>
                                            <ul>
                                                <li>Access to 500+ movies & shorts</li>
                                                <li>HD Streaming</li>
                                                <li>No Ads</li>
                                            </ul>
                                            <button className="select-btn">Select</button>
                                        </div>
                                        <div className="plan">
                                            <h3>Ultimate</h3>
                                            <p className="price">$14.99 / month</p>
                                            <ul>
                                                <li>All Movies & Shorts</li>
                                                <li>4K Ultra HD</li>
                                                <li>Download & Watch Offline</li>
                                            </ul>
                                            <button className="select-btn">Select</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sidebar */}
                        <aside className={`sidebar ${menuOpen ? 'active' : ''}`}>
                            <div className="sidebar-header">
                                <Link to={'/'} className="logo-col d-flex align-items-center" tabIndex="0">
                                    <img src={siteData?.logo} alt="ceramic-logo" loading="lazy" />
                                    {siteData?.title}
                                    <button id="close-sidebar-btn" className="close-sidebar-btn" aria-label="Close Sidebar" onClick={() => closeMenu()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                            <ul className="sidebar-menu">
                                <li>
                                    <ul>
                                        <li><strong>Menu</strong></li>
                                        <hr></hr>
                                    </ul>
                                </li>
                                <li><Link to={"/"} className={currentRoute === '' ? "active" : ''} id="dashboard" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-house"></i> Dashboard</Link></li>
                                <li><Link to={"/users"} className={currentRoute === '/users' ? "active" : ''} id="users" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-users"></i> Users</Link></li>
                                <li><Link to={"/tickets"} className={currentRoute === '/tickets' ? "active" : ''} id="tickets" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-ticket-alt"></i> Tickets</Link></li>
                                <li>
                                    <ul>
                                        <hr></hr>
                                        <li><strong>Film Management</strong></li>
                                        <hr></hr>
                                    </ul>
                                </li>
                                <li><Link to={"/shorts"} className={currentRoute === '/shorts' ? "active" : ''} id="Shorts" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-video"></i> Shorts </Link></li>
                                {/* <li><Link to={"/media-gallery"} className={currentRoute === '/media-gallery' ? "active" : ''} id="media"><i className="fa-solid fa-hard-drive"></i> Media Gallery </Link></li>  */}
                                {/* <li><Link to={"/top-contents"} className={currentRoute === '/top-contents' ? "active" : ''} id="top-contents"><i className="fas fa-arrow-trend-up"></i> Top Contents </Link></li> */}
                                {/* <li><Link to={"/actors"} className={currentRoute === '/actors' ? "active" : ''} id="actors"><i className="fas fa-star"></i> Actors </Link></li>  */}
                                <li><Link to={"/genres"} className={currentRoute === '/genres' ? "active" : ''} id="genres" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-box-open"></i> Genres </Link></li> 
                                <li><Link to={"/tags"} className={currentRoute === '/tags' ? "active" : ''} id="tags" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-tag"></i> Tags </Link></li> 
                                <li><Link to={"/types"} className={currentRoute === '/types' ? "active" : ''} id="types" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-box-open"></i> Types </Link></li>
                                <li>
                                    <ul>
                                        <hr></hr>
                                        <li><strong>Package</strong></li>
                                        <hr></hr>
                                    </ul>
                                </li>
                                <li><Link to={"/plans"} className={currentRoute === '/plans' ? "active" : ''} id="plans" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-coins"></i> Coin Plans </Link></li> 
                                <li><Link to={"/vip-plans"} className={currentRoute === '/vip-plans' ? "active" : ''} id="vip-plans" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-project-diagram"></i> VIP Plans </Link></li> 
                                <li><Link to={"/order-history"} className={currentRoute === '/order-history' ? "active" : ''} id="order-history" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-trophy"></i> Order History </Link></li> 
                                <li>
                                    <ul>
                                        <hr></hr>
                                        <li><strong>General</strong></li>
                                        <hr></hr>
                                    </ul>
                                </li>
                                <li><Link to={"/payment-method"} className={currentRoute === '/payment-method' ? "active" : ''} id="paymentMethod" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-money-bill"></i> Payment Method</Link></li>
                                <li><Link to={"/languages"} className={currentRoute === '/languages' ? "active" : ''} id="languages" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-language"></i> Languages </Link></li> 
                                {/* <li><Link to={"/live-tv-categories"} className={currentRoute === '/live-tv-categories' ? "active" : ''} id="live-tv"><i className="fas fa-tv"></i>Live Tv Categories </Link></li>  */}
                                {/* <li><Link to={"/live-tv-channels"} className={currentRoute === '/live-tv-channels' ? "active" : ''} id="live-tv-channels"><i className="fas fa-broadcast-tower"></i>Live Tv Channels </Link></li>  */}
                                {/* <li><Link to={"/notification"} className={currentRoute === '/notification' ? "active" : ''} id="notification"><i className="fa-sharp fa-solid fa-bell"></i>Notification </Link></li>  */}

                                
                                {/* <li><Link to={"/movies"} className={currentRoute === '/movies' ? "active" : ''} id="movies"><i className="fas fa-film"></i> Movies</Link></li> */}
                                {/* <li><Link to={"/tv-shows"} className={currentRoute === '/tv-shows' ? "active" : ''} id="tvshows"><i className="fas fa-tv"></i> TV Shows</Link></li>  */}
                                {/* <li><Link to={"/reports"} className={currentRoute === '/reports' ? "active" : ''} id="reports"><i className="fas fa-chart-line"></i> Reports</Link></li> */}
                                <li><Link to={"/reward"} className={currentRoute === '/reward' ? "active" : ''} id="reward" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-atom"></i> Reward</Link></li> 
                                <li><Link to={"/settings"} className={currentRoute === '/settings' ? "active" : ''} id="settings" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-cog"></i> Settings</Link></li> 
                                <li><Link to={"/ads-setting"} className={currentRoute === '/ads-setting' ? "active" : ''} id="ads-setting" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-ad"></i> Ads Setting</Link></li> 
                                <li><Link to={"/send-notification"} className={currentRoute === '/send-notification' ? "active" : ''} id="send-notification" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-ad"></i> Send Notification</Link></li> 
                                <li>
                                    <ul>
                                        <hr></hr>
                                        <li><strong>Pages</strong></li>
                                        <hr></hr>
                                    </ul>
                                </li>
                                <li><Link to={"/about-us"} className={currentRoute === '/about-us' ? "active" : ''} id="about-us" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-info"></i> About Us</Link></li> 
                                <li><Link to={"/privacy-policy"} className={currentRoute === '/privacy-policy' ? "active" : ''} id="privacy-policy" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-info"></i> Privacy Policy</Link></li> 
                                <li><Link to={"/terms-conditions"} className={currentRoute === '/terms-conditions' ? "active" : ''} id="terms-conditions" onClick={() => toggleMenuOnMobile(setMenuOpen)}><i className="fas fa-info"></i> Terms Conditions</Link></li> 
                            </ul>
                        </aside>

                        {/* Main Content  */}
                        <main className="main-content">
                            {/* Dashboard */}
                            <header className="site-header">
                                <div className="about-profile d-flex align-items-center justify-content-between gap-2">
                                    <div className="about-profile-left">
                                        {/* <div className="input-wrapper d-flex align-items-center">
                                            <input type="email" placeholder="Enter your email..." />
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                role="img" className="icon">
                                                <path
                                                    d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                </path>
                                            </svg>
                                        </div> */}
                                    </div>
                                    <div className="about-profile-right d-flex align-items-center gap-3">
                                        {/* <button className="btn upgrade-btn" onClick={openPopup}> Upgrade </button> */}
                                        <div className="user-profile">
                                            <div className="user-profile">
                                                <div className="dropdown">
                                                    <div className=" d-flex align-items-center gap-2 dropdown-toggle" type="button"
                                                        id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <img src={user?.profile_image ?? '/assets/images/profil-img-1.png'} alt="Profile" className="rounded-circle profile_image" width="32" height="32" />
                                                        <span id='profile_name'>{user?.name}</span>
                                                    </div>
                                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                                        <li> 
                                                            <Link to={"/profile"} id="profile-btn" className="dropdown-item" tabIndex="0"> 
                                                                Profile 
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={"#"} className="dropdown-item" onClick={logout} stabindex="0">
                                                                Log Out
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <button id="mobile-menu-btn" className={`mobile-menu-btn ${menuOpen ? 'active_menu' : ''}`} onClick={toggleMenu}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path
                                                    d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </header>
                                
                            {/* Breadcrumbs */}
                            <Breadcrumbs />

                            {currentRoute === '' && <Dashboard /> }
                            {currentRoute === '/users' && <Users /> }
                            {currentRoute === '/tickets' && <Tickets /> }
                            {currentRoute === currentRoute.match(/^\/users\/\d+$/)?.input && <ViewUser /> }
                            {currentRoute === '/shorts' && <Content /> }
                            {currentRoute === currentRoute.match(/^\/shorts\/\d+$/)?.input && <Episodes /> }
                            {currentRoute === '/media-gallery' && <MediaGallery /> }
                            {currentRoute === '/top-contents' && <TopContents /> }
                            {currentRoute === '/actors' && <Actors /> }
                            {currentRoute === '/genres' && <Genres /> }
                            {currentRoute === '/tags' && <Tags /> }
                            {currentRoute === '/types' && <Types /> }
                            {currentRoute === '/plans' && <Plans /> }
                            {currentRoute === '/vip-plans' && <VipPlans /> }
                            {currentRoute === '/order-history' && <OrderHistory /> }
                            {currentRoute === '/languages' && <Languages /> }
                            {currentRoute === '/live-tv-categories' && <LiveTvCategories /> }
                            {currentRoute === '/live-tv-channels' && <LiveTvChannels /> }
                            {currentRoute === '/notification' && <Notification /> }
                            {currentRoute === '/send-notification' && <SendNotification /> }
                            {currentRoute === '/movies' && <Movies /> }
                            {currentRoute === '/tv-shows' && <TvShows /> }
                            {currentRoute === '/reports' && <Reports /> }
                            {currentRoute === '/settings' && <Settings /> }
                            {currentRoute === '/reward' && <Reward /> }
                            {currentRoute === '/profile' && <Profile /> }
                            {currentRoute === '/payment-method' && <PaymentMethod /> }
                            {currentRoute === '/about-us' && <AboutUs /> }
                            {currentRoute === '/privacy-policy' && <PrivacyPolicy /> }
                            {currentRoute === '/terms-conditions' && <TermsCondition /> }
                            {currentRoute === '/ads-setting' && <AdsSetting /> }
                            {currentRoute === currentRoute.match(/^\/ads-setting\/\d+$/)?.input && <AdsSettingUpdate /> }
                            
                            <ScrollProgress />
                        </main>
                    </>
            }
        </>
    );
};
  
export default Main;