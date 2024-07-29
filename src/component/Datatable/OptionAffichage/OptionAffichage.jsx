import React, { useState, useEffect, useRef } from 'react';
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

const OptionAffichage = ({ columns, onVisibilityChange }) => {
    const [selectedFields, setSelectedFields] = useState({});
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

    useEffect(() => {
        const initialVisibilityState = columns.reduce((acc, column, index) => {
            acc[column] = index < 8;
            return acc;
        }, {});
        setSelectedFields(initialVisibilityState);
        if (onVisibilityChange) {
            onVisibilityChange(initialVisibilityState);
        }
    }, [columns]);

    const toggleAttributeVisibility = (field) => {
        setSelectedFields(prevState => {
            const updatedFields = { ...prevState, [field]: !prevState[field] };
            if (onVisibilityChange) {
                onVisibilityChange(updatedFields);
            }
            return updatedFields;
        });
    };

    const hideAll = () => {
        const updatedFields = columns.reduce((acc, column) => {
            acc[column] = false;
            return acc;
        }, {});
        setSelectedFields(updatedFields);
        if (onVisibilityChange) {
            onVisibilityChange(updatedFields);
        }
    };

    const showAll = () => {
        const updatedFields = columns.reduce((acc, column) => {
            acc[column] = true;
            return acc;
        }, {});
        setSelectedFields(updatedFields);
        if (onVisibilityChange) {
            onVisibilityChange(updatedFields);
        }
    };

    return (
        <div className='Option_DDM_Container' ref={dropdownRef}>
            <button
                className="btn compact-btn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <i className="bi bi-three-dots-vertical icon"></i>
            </button>
            {isDropdownOpen && (
                <div className='dropdown-menu show' style={{ position: 'absolute', left: '61%', top: '17%', zIndex: 2 }}>
                    <h3 className='option_h2'>Options d'affichage</h3>
                    <div className='default_view'>Default view</div>
                    <div className='options_header'>
                        <span>Colonnes présentées</span>
                        <a href="#" onClick={(e) => { e.preventDefault(); hideAll(); }}>Masquer Tout</a>
                    </div>
                    <div className='main_options'>
                        {columns.filter(field => selectedFields[field]).map((field) => (
                            <button key={field} name={field} className='dropdown-item option_button' onClick={() => toggleAttributeVisibility(field)}>
                                <span>{field}</span><img src={eye} alt="eye" />
                            </button>
                        ))}
                    </div>
                    <div className='options_HL'></div>
                    <div className='options_header'>
                        <span>Colonnes masquées</span>
                        <a href="#" onClick={(e) => { e.preventDefault(); showAll(); }}>Afficher Tout</a>
                    </div>
                    <div className='main_options'>
                        {columns.filter(field => !selectedFields[field]).map((field) => (
                            <button key={field} name={field} className='dropdown-item option_button' onClick={() => toggleAttributeVisibility(field)}>
                                <span>{field}</span><img src={eyeslash} alt="eyeslash" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OptionAffichage;
