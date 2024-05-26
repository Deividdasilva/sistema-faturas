import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome
} from '@fortawesome/free-solid-svg-icons';

const Menu: React.FC = () => {

    return (
        <div style={{ backgroundColor: '#005780', color: 'white', width: '250px', height: '100vh', overflow: 'auto' }}>
            <div style={{ padding: '20px', fontSize: '24px', fontWeight: 'bold', borderBottom: '1px solid gray', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Lumi</span>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>
                    <NavLink to="/" style={{ padding: '15px', display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/extract-invoice" style={{ padding: '15px', display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                        Extrair Fatura
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/list" style={{ padding: '15px', display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                        Faturas
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
