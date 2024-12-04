import { useState, useEffect, useRef } from 'react';
import menuIcon from './assets/menu.svg';
import crossIcon from './assets/x.svg';
import downIcon from './assets/chevron-down.svg';
import rightIcon from './assets/chevron-right.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(true); // Open by default
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Initially closed

  // Ref to the menu so we can detect outside clicks
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null); // Ref for the hamburger button

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const toggleAdd = () => {
    setIsAddOpen(prev => !prev);
    setIsSettingsOpen(false); // Close settings when add is opened
  };

  const toggleSettings = () => {
    setIsSettingsOpen(prev => !prev);
    setIsAddOpen(false); // Close add when settings is opened
  };

  // Close menu if click is outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) && // Check if the click is outside the menu
        !menuButtonRef.current.contains(event.target) // Check if the click is outside the hamburger button
      ) {
        setIsMenuOpen(false);
        setIsAddOpen(false);
        setIsSettingsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="frame-wrapper">
      <div className="row">
        <div className="col-md-6">
          <div className="logo">
            <img
              src="https://assets.nicepagecdn.com/51f4b7da/6305210/images/LeasePixie.png"
              alt="Logo"
              className="logo-img"
              style={{
                height: '23px',
                width: '104px',
                filter: 'invert(0)',
                marginLeft: '56px',
                marginTop: '7px'
              }}
            />
          </div>
        </div>
        <div className="text-right">
          <button
            className="hamburger-button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click outside handler from being triggered
              toggleMenu();
            }}
            ref={menuButtonRef}
            aria-label="Toggle Menu"
          >
            <img
              src={isMenuOpen ? crossIcon : menuIcon}
              alt="Toggle Menu"
              className="hamburger"
            />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="hamburger-menu" ref={menuRef}>
          <div className="header_menu">
            <ul>
              {/* Add Section */}
              <li 
                onClick={toggleAdd} 
                style={{ fontWeight: isAddOpen ? 'bold' : 'normal' }}  // Apply bold font-weight when Add is open
              >
                Add
                <div className="sub_menu_arrow">
                  <img
                    src={isAddOpen ? downIcon : rightIcon}
                    alt="Toggle Add"
                    className={`sub_menu_arrow ${isAddOpen ? 'rotate' : ''}`}
                  />
                </div>
                {isAddOpen && (
                  <ul className="sub_menu">
                    <li>User</li>
                    <li>Property</li>
                    <li>Portfolio</li>
                  </ul>
                )}
              </li>

              {/* Settings Section */}
              <li 
                onClick={toggleSettings} 
                style={{ fontWeight: isSettingsOpen ? 'bold' : 'normal' }}  // Apply bold font-weight when Settings is open
              >
                Settings
                <div className="sub_menu_arrow">
                  <img
                    src={isSettingsOpen ? downIcon : rightIcon}
                    alt="Toggle Settings"
                    className={`sub_menu_arrow ${isSettingsOpen ? 'rotate' : ''}`}
                  />
                </div>
                {isSettingsOpen && (
                  <ul className="sub_menu">
                    <li>User</li>
                    <li>Portfolio</li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="signOut" style={{marginTop:'20px'}}>Sign out</div>
        </div>
      )}
    </header>
  );
};

export default Header;
