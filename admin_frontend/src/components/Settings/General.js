import React, { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import * as action from '../../Action/SiteDetails/SiteDetails_Action';
import { toast } from 'react-toastify';
import { useAuth } from "../../context/Context";
import NiceSelect from "../CustomSelect";

const General = () => {
    const { user } = useAuth();
    const [siteData, setSiteData] = useState({
        shareAppIcon: '',
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { loading, payload } = useSelector(state => state.GetSiteDetailsReducer);
    const updateLoading = useSelector(state => state.UpdateSiteDetailsReducer);
    const hasFetched = useRef(null);
    const [shareAppIconPreview, setShareAppIconPreview] = useState(null);
    
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        dispatch(action.getGeneralSettings()).then((response) => {
            let data = response.responseDetails;
            delete data.created_at;
            delete data.updated_at;
            delete data.id;
            setSiteData(prevData => ({ ...prevData, ...data }));
            if(data.shareAppIcon){
                setShareAppIconPreview(data.shareAppIcon);
            }
        });
    }, [dispatch]);
    
    const onChange = (e) => {
        const { name, value } = e.target;
        setSiteData(prevData => ({ ...prevData, [name]: value }));
    }

	const handleImageChange = (e) => {
		const file = e.target.files[0];
        const name = e.target.name;
	
		if (file) {
			const previewURL = URL.createObjectURL(file);
            if(name === 'share_app_icon'){
                setShareAppIconPreview(previewURL);
            } 
	
            setSiteData((prev) => ({
				...prev,
				[name]: file,
			}));
		} else {
            let file = '';
            if(name === 'share_app_icon'){
                file = payload.responseDetails.shareAppIcon;
                setShareAppIconPreview(file);
            } 
	
            setSiteData((prev) => ({
				...prev,
				[name]: file,
			}));
        }
	};
        
    const updateProfile = (e) => {
        e.preventDefault();
        const isAccessAllowed = user?.login_type !== 'Guest';

        if (!isAccessAllowed) {
            toast.error("Opps! You don't have Permission.");
            return false;
        }
        
        setErrors({});
        let data = new FormData();
        if(siteData.shareAppIcon){
            data.append('share_app_icon', siteData.shareAppIcon);
        }
        dispatch(action.getGeneralSettings(data)).then((response) => {
            toast.success(response.responseMessage);
            let data = response.responseDetails;
            delete data.created_at;
            delete data.updated_at;
            delete data.id;
            setSiteData(data);
            if(data.shareAppIcon){
                setShareAppIconPreview(data.shareAppIcon);
            }
        }).catch(error => {
            toast.error(error.responseMessage);
        })
    }

    return (
        <>
            { loading ? <Loader /> : 
                <>
                    <div className="general-settings-section">
                        <h2 className="section-title">General Settings</h2>
                        <form className="settings-form" onSubmit={updateProfile}>
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="site-logo">Share App Icon</label>
                                        <input type="file" id="share-app-icon" name="share_app_icon" accept="image/*" onChange={handleImageChange} />
                                        { shareAppIconPreview ? <img src={shareAppIconPreview} alt="share app icon" style={{width: '50px', height: '50px', marginTop: '10px'}} /> : '' }
                                    </div>
                                </div>
                            </div>
                            <div className="setting-btn">
                                <button type="submit" className="btn" disabled={updateLoading.loading}>
                                    {updateLoading.loading ? (
                                        <div className="spinner-border text-light" style={{width: '16px', height: '16px'}} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        "Save Settings"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            }
        </>
    );
};

export default General;
