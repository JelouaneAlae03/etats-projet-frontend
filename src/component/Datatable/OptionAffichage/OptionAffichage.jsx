/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './OptionAffichage.css';
import eye from '../../../Assets/images/eye.png';
import eyeslash from '../../../Assets/images/eye-slash.png';

function useOutsideClick(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, callback]);
}

const OptionAffichage = () => {
    const dispatch = useDispatch();
    const selectedFields = useSelector((state) => state.selectedFields);
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

    const toggleAttributeVisibility = (f) => {
        dispatch({type: 'CHANGE_SELECTED_FIELDS', payload: {key: f}});
        console.log("target name", f);
    }

    const Masquertout = () => {
        dispatch({type: 'FALSE_SELECTED_FIELDS'});
    }

    const Affichertout = () => {
        dispatch({type: 'TRUE_SELECTED_FIELDS'});
    }
    const handlePreventDefault = (e) => {
        e.preventDefault();
    };

    useEffect(()=> {
        console.log("selected Fields Affichage: ", selectedFields);
    }, []);

    return (
        <div className='Option_DDM_Container' ref={dropdownRef}>
            <button
                className="btn compact-btn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <i className="bi bi-three-dots-vertical icon"></i>
            </button>
            {isDropdownOpen && (
                <div className='dropdown-menu show' style={{ position: 'absolute', left: '62%', top: '29%', zIndex: 2 }}>
                    <h3 className='option_h2'>Options d'affichage</h3>
                    <div className='default_view'>Default view</div>
                    <div className='options_header'>
                        <span>Colonnes présentées</span>
                        <a href="#" onClick={(e) => { handlePreventDefault(e); Masquertout(); }}>Masquer Tout</a>
                    </div>
                    <div className='main_options'>
                        {Object.keys(selectedFields).map((field) => 
                            selectedFields[field] ? (
                                <button key={field} name={field} className='dropdown-item option_button' onClick={() => toggleAttributeVisibility(field)}>
                                    <span>{field}</span><img src={eye} alt="eye" />
                                </button>
                            ) : null
                        )}
                    </div>
                    <div className='options_HL'></div>
                    <div className='options_header'>
                        <span>Colonnes masquées</span>
                        <a href="#" onClick={(e) => { handlePreventDefault(e); Affichertout(); }}>Afficher Tout</a>
                    </div>
                    <div className='main_options'>
                        {Object.keys(selectedFields).map((field) => 
                            !selectedFields[field] ? (
                                <button key={field} name={field} className='dropdown-item option_button' onClick={() => toggleAttributeVisibility(field)}>
                                    <span>{field}</span><img src={eyeslash} alt="eyeslash" />
                                </button>
                            ) : null
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OptionAffichage;
