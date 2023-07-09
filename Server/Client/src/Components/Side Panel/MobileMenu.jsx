import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const MobileMenu = () => {
  const [expandedMenus, setExpandedMenus] = useState([]);
  const {user} = useContext(UserContext);

  const isCandidate = user?.User?.UserType === "Candidate";
  const isCompany = user?.User?.UserType === "Company";

  const handleMenuClick = (index) => {
    const updatedMenus = [...expandedMenus];
    if (updatedMenus.includes(index)) {
      updatedMenus.splice(updatedMenus.indexOf(index), 1);
    } else {
      updatedMenus.push(index);
    }
    setExpandedMenus(updatedMenus);
  };

  const isMenuExpanded = (index) => {
    return expandedMenus.includes(index);
  };

  return (
    <div className="jm-sidebar-menu-wrapper fix">
      <div className="jm-mobile-menu mean-container">
        <div className="mean-bar">
          <Link to="#nav" className="meanmenu-reveal">
            <span><span><span /></span></span>
          </Link>
          <nav className="mean-nav">
            <div className="mean-bar">
              <Link to="#nav" className="meanmenu-reveal">
                <span><span><span /></span></span>
              </Link>
            </div>
            <ul>
             <li className="menu-has-children">
             {isCompany ? (<Link to="/">Home</Link>) :
             (<Link to="/homePage2">Home</Link>)}
                <Link className={`mean-expand ${isMenuExpanded(0) ? 'mean-clicked' : ''}`} role='button' to="#" onClick={() => handleMenuClick(0)}>{isMenuExpanded(0) ? '-' : '+'}</Link>
              </li>
              <li className="menu-has-children">
                <Link to="/jobPage">Jobs</Link>
                <ul className={`sub-menu ${isMenuExpanded(1) ? '' : 'd-none'}`}>
                  <li><Link to="/jobListPage">Jobs List</Link></li>
                  <li><Link to="/jobCategoryPage">Jobs By Category</Link></li>
                  <li><Link to="/employerListPage">Employer List</Link></li>
                  {isCompany &&
                      <li><Link to="/postJobPage">Post a Job</Link></li>}
                </ul>
                <Link className={`mean-expand ${isMenuExpanded(1) ? 'mean-clicked' : ''}`} role='button' to="#" onClick={() => handleMenuClick(1)}>{isMenuExpanded(1) ? '-' : '+'}</Link>
              </li>
              {isCompany && <li className="menu-has-children">
                <Link to="/candidateListPage">Candidates</Link>
                <ul className={`sub-menu ${isMenuExpanded(2) ? '' : 'd-none'}`}>
                </ul>
                <Link className={`mean-expand ${isMenuExpanded(2) ? 'mean-clicked' : ''}`} role='button' to="#" onClick={() => handleMenuClick(2)}>{isMenuExpanded(2) ? '-' : '+'}</Link>
              </li>}
              <li className="menu-has-children">
                <Link to="#">Pages</Link>
                <ul className={`sub-menu ${isMenuExpanded(3) ? '' : 'd-none'}`}>
                  <li><Link to="/aboutPage">About</Link></li>
                  <li><Link to="/servicePage">Services</Link></li>
                  <li><Link to="/serviceDetailsPage">Services Details</Link></li>
                  <li><Link to="/contactPage">Contact</Link></li>
                </ul>
                <Link className={`mean-expand ${isMenuExpanded(3) ? 'mean-clicked' : ''}`} role='button' to="#" onClick={() => handleMenuClick(3)}>{isMenuExpanded(3) ? '-' : '+'}</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
