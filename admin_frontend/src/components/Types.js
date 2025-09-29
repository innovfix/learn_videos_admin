import React, { useEffect, useRef, useState } from "react";
import * as action from '../Action/Types/Types_Action';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Model from "./Model/Index";
import $ from 'jquery';
import Swal from 'sweetalert2';
import CustomImageBox from "./UploadPreview/CustomImageBox";
import { isEmpty } from "lodash";
import NumberDisplay from "./NumberDisplay/Index";
import { useAuth } from "../context/Context";

const Types = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const tableRef = useRef(null);
	const updateTypesLoading = useSelector(state => state.UpdateTypesReducer);
	const addTypesLoading = useSelector(state => state.AddTypesReducer);
    const [showModel, setShowModel] = useState({
        show: false,
        title: 'Add'
    });
    const [count, setCount] = useState(0);
    const [errors, setErrors] = useState({});
    const [filePreview, setFilePreview] = useState('');
    const [typesData, setTypesData] = useState({
        id: 0,
        name: '',
        file: ''
    });
    const dataTableInstanceRef = useRef(null);
    const nameRefFocus = useRef(null);
    const imageRefFocus = useRef(null);

    useEffect(() => {
        let tableRefCurrent = tableRef.current;
        const $ = window.$ || window.jQuery;

        let currentSize = window.innerWidth <= 450 ? 'mobile' : 'desktop';

        function setPaginationOptions() {
            if (currentSize === 'mobile') {
                $.fn.dataTable.ext.pager.numbers_length = 0;
                return 'simple';
            } else {
                $.fn.dataTable.ext.pager.numbers_length = 5;
                return 'simple_numbers';
            }
        }

        const initDataTable = () => {
            const pagingType = setPaginationOptions();
    
            if ($ && tableRefCurrent) {
                dataTableInstanceRef.current = $(tableRefCurrent).DataTable({
                    processing: true,
                    serverSide: true,
                    scrollX: true,
                    ordering: true,
                    pagingType: pagingType,
                    ajax: (dataTablesParams, callback) => {
                        const columns = [null, 'type_name'];
                        const sortColumnIndex = dataTablesParams.order[0].column;
                        const sortColumnName = columns[sortColumnIndex];
                        const params = {
                            search: dataTablesParams.search.value,
                            start: dataTablesParams.start,
                            length: dataTablesParams.length,
                            dir: dataTablesParams.order[0].dir,
                            sortColumn: sortColumnName,
                        };
                        dispatch(action.getTypes(params)).then((action) => {
                            setCount(action.responseDetails.totalRecords || 0);
                            callback({
                                data: action.responseDetails.data || [],
                                recordsTotal: action.responseDetails.totalRecords || 0,
                                recordsFiltered: action.responseDetails.recordsFiltered || 0,
                            });
                        });
                    },
                    order: [1, 'asc'],
                    destroy: true,
                    columns: [
                        {
                            data: null,
                            title: "Image",
                            orderable: false, 
                            width: "50px",
                            render: function (data, type, row) {
                            return `
                                <div class="img-wrapper">
                                    <img src="${row.type_image}" />
                                </div>
                            `;
                            }
                        },
                        { data: 'type_name', title: "Name" ,  width: "" ,  className: "column-name" },
                        {
                            data: null,
                            title: 'Action', 
                            // orderable: false,
                            width: "100px",
                            render: function (data, type, row) {
                            return `
                                <div class="d-flex gap-2">
                                    <button class="btn btn-sm btn-primary edit-btn" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger delete-btn" title="Delete">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            `;
                            }
                        }
                    ]
                });

                $(tableRefCurrent).on('preXhr.dt', function () {
                    const processingEl = $('.dataTables_processing');
                    const visibleCols = $(tableRefCurrent).find('thead th:visible').length;

                    if (processingEl.length) {
                        const loaderRow = `
                            <tr class="dt-temp-loader">
                                <td colspan="${visibleCols}" class="text-center">
                                    <div class="dataTables_processing card" style="display:block;margin:0 auto">${processingEl.html()}</div>
                                </td>
                            </tr>
                        `;
                        $(tableRefCurrent).find('tbody').html(loaderRow);
                    }
                });

                $(tableRefCurrent).on('xhr.dt', function () {
                    $(tableRefCurrent).find('tbody .dt-temp-loader').remove();
                });
                
                $(tableRefCurrent).on('click', '.edit-btn', function (e) {
                    let rowData = dataTableInstanceRef.current.row($(this).closest('tr')).data();
                    openModel('Edit'); 
                    setFilePreview(rowData.type_image);
                    setTypesData({
                        id: rowData.id,
                        name: rowData.type_name,
                        file: ''
                    });
                });
                
                $(tableRefCurrent).off('click', '.delete-btn');
                $(tableRefCurrent).on('click', '.delete-btn', function (e) {
                    const isAccessAllowed = user?.login_type !== 'Guest';
            
                    if (!isAccessAllowed) {
                        toast.error("Opps! You don't have Permission.");
                        return false;
                    }

                    let rowData = dataTableInstanceRef.current.row($(this).closest('tr')).data();
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "var(--first-color)",
                        cancelButtonColor: "var(--error-color)",
                        confirmButtonText: "Yes, delete it!",
                        customClass: {
                            confirmButton: 'btn',
                            cancelButton: 'btn'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(action.deleteTypes({type_id: rowData.id})).then((action) => {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your data has been deleted.",
                                    icon: "success",
                                    customClass: {
                                        confirmButton: 'btn',
                                    }
                                });
                                if (dataTableInstanceRef.current) {
                                    dataTableInstanceRef.current.ajax.reload(null, false);
                                }
                            }).catch((err) => {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Something went wrong!",
                                    customClass: {
                                        confirmButton: 'btn',
                                    }
                                });
                            });
                        }
                    });
                });
            }
        }

        initDataTable();

        const handleResize = () => {
            const newSize = window.innerWidth <= 450 ? 'mobile' : 'desktop';
            if (newSize !== currentSize) {
                currentSize = newSize;

                // Destroy and re-init
                if ($.fn.DataTable.isDataTable(tableRefCurrent)) {
                    $(tableRefCurrent).DataTable().destroy();
                }
                initDataTable();
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if ( $.fn.DataTable.isDataTable(tableRefCurrent) ) {
                $(tableRefCurrent).DataTable().destroy();
            }
        };
    }, [dispatch, user]);

    const openModel = (name) => {
        setShowModel({
            show: true,
            title: name
        });
        $("body").addClass("no_scroll");
        $('.overlay').addClass('qv_active');
    }

    const closeModel = (name) => {
        setShowModel({
            show: false,
            title: name
        });
        $("body").removeClass("no_scroll");
        $('.overlay').removeClass('qv_active');
        setErrors({});
        setTypesData({
            id: 0,
            name: '',
            type_image: ''
        });
        setFilePreview('');
    }
        
    const onChange = (e) => {
        setTypesData({ ...typesData, [e.target.name]: e.target.value });
    }

    const handleImage = (e, image, preview) => {
        setTypesData({ ...typesData, [e.target.name]: image });
        setFilePreview(preview);
    }

    const addTypesData = (e) => {
        e.preventDefault();
        const isAccessAllowed = user?.login_type !== 'Guest';

        if (!isAccessAllowed) {
            toast.error("Opps! You don't have Permission.");
            return false;
        }

        setErrors({});
        let customErrors = {};
        if (typesData.name === '') {
            customErrors = { ...customErrors, name: "Please Enter name" }
            nameRefFocus.current.focus();
        } else if (typesData.type_image === '') {
            customErrors = { ...customErrors, type_image: "Please Select Image" }
            imageRefFocus.current.focus();
        }

        if (Object.keys(customErrors).length > 0) {
            setErrors(customErrors)
            return true
        }

        let data = new FormData();

        data.append('type_name', typesData.name);
        data.append('type_image', typesData.type_image);

        if(typesData.id !== 0){
            data.append('type_id', typesData.id);
            dispatch(action.updateTypes(data)).then((response) => {
                toast.success(response.responseMessage);
                closeModel('Add');
    
                if (dataTableInstanceRef.current) {
                    dataTableInstanceRef.current.ajax.reload(null, false);
                }
            }).catch(error => {
                toast.error(error.responseMessage);
            })
        } else {
            dispatch(action.addTypes(data)).then((response) => {
                toast.success(response.responseMessage);
                closeModel('Add');
    
                if (dataTableInstanceRef.current) {
                    dataTableInstanceRef.current.ajax.reload(null, false);
                }
            }).catch(error => {
                toast.error(error.responseMessage);
            })
        }
    }

    return (
        <>
            {/* { loading ? <Loader /> :  */}
                <>
                    <div className='overlay'></div>
                    <section id="languages-section" className="languages-section section">
                        <div className="card">
                            <div className="card-header">
                                <div className="page-title w-100 d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4>Types (<span className="total_user">{<NumberDisplay count={count} />}</span>)</h4>
                                    </div>
                                    <button className="btn upgrade-btn add-languages-btn" onClick={(e) => openModel('Add')}> Add Types </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <table ref={tableRef} className="movie-table table-layout-fixed user-table table table-striped w-100 dataTable no-footer" id="languages-Contents" role="grid"></table>
                            </div>
                        </div> 
                    </section>

                    {
                        showModel.show && (
                            <Model className="common-popup add-languages-popup active">
                                <div className="edit-heading d-flex align-items-center justify-content-between">
                                    <h3>{showModel.title} Type</h3>
                                    <button className="common-close edit-close-btn" onClick={(e) => closeModel('Add')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18">
                                            <path fill="#ffffff"
                                                d="M19.95 16.75l-.05-.4-1.2-1-5.2-4.2c-.1-.05-.3-.2-.6-.5l-.7-.55c-.15-.1-.5-.45-1-1.1l-.1-.1c.2-.15.4-.35.6-.55l1.95-1.85 1.1-1c1-1 1.7-1.65 2.1-1.9l.5-.35c.4-.25.65-.45.75-.45.2-.15.45-.35.65-.6s.3-.5.3-.7l-.3-.65c-.55.2-1.2.65-2.05 1.35-.85.75-1.65 1.55-2.5 2.5-.8.9-1.6 1.65-2.4 2.3-.8.65-1.4.95-1.9 1-.15 0-1.5-1.05-4.1-3.2C3.1 2.6 1.45 1.2.7.55L.45.1c-.1.05-.2.15-.3.3C.05.55 0 .7 0 .85l.05.35.05.4 1.2 1 5.2 4.15c.1.05.3.2.6.5l.7.6c.15.1.5.45 1 1.1l.1.1c-.2.15-.4.35-.6.55l-1.95 1.85-1.1 1c-1 1-1.7 1.65-2.1 1.9l-.5.35c-.4.25-.65.45-.75.45-.25.15-.45.35-.65.6-.15.3-.25.55-.25.75l.3.65c.55-.2 1.2-.65 2.05-1.35.85-.75 1.65-1.55 2.5-2.5.8-.9 1.6-1.65 2.4-2.3.8-.65 1.4-.95 1.9-1 .15 0 1.5 1.05 4.1 3.2 2.6 2.15 4.3 3.55 5.05 4.2l.2.45c.1-.05.2-.15.3-.3.1-.15.15-.3.15-.45z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="edit-inner form-img-upload">
                                    <form onSubmit={addTypesData}>
                                        <div className="row">
                                            <div className="col-12"> 
                                                <div className="form-group">
                                                    <label htmlFor="name">Title</label>
                                                    <input type="text" id="name" name="name" placeholder="Enter Title" ref={nameRefFocus} onChange={onChange} value={typesData.name} />
                                                    <span className='text-danger pt-2'>{errors?.name}</span>
                                                </div>
                                                <div className="form-group">
                                                    <CustomImageBox
                                                        imageUrl={!isEmpty(filePreview) ? filePreview : "https://flixy.retrytech.site/assets/img/placeholder-image.png"}
                                                        onChange={handleImage}
                                                        label={'Image'}
                                                        name="type_image"
                                                        ref={imageRefFocus}
                                                    />
                                                    <span className='text-danger pt-2'>{errors?.file}</span>
                                                </div>
                                            </div>
                                            <div className="action-footer m-0">
                                                <button type="submit" className="btn" disabled={showModel.title === 'Add' ? addTypesLoading.loading : updateTypesLoading.loading}>
                                                    {(showModel.title === 'Add' ? addTypesLoading.loading : updateTypesLoading.loading) ? (
                                                        <div className="spinner-border text-light" style={{width: '16px', height: '16px'}} role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    ) : (
                                                        "Save"
                                                    )}
                                                </button>
                                            </div> 
                                        </div>
                                    </form>
                                </div>
                            </Model> 
                        )
                    }
                </>
            {/* } */}
        </>
    );
};

export default Types;
