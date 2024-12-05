import { useState, useEffect, useRef } from 'react';
import menuIcon from '../../../assets/menu.svg';
import crossIcon from '../../../assets/x.svg';
import downIcon from '../../../assets/chevron-down.svg';
import rightIcon from '../../../assets/chevron-right.svg';
import style from './header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState('add'); // 'add' is open by default

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const toggleSection = (section) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setOpenSection(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const renderMenuItem = (title, items) => (
    <li 
      onClick={() => toggleSection(title.toLowerCase())}
      className={`${style.menuItem} ${openSection === title.toLowerCase() ? style.menuItemOpen : ''}`}
    >
      <span className={`${style.menuItemTitle} ${openSection === title.toLowerCase() ? style.menuItemTitleBold : style.menuItemTitle}`}>
        {title}
      </span>
      <div className={style.sub_menu_arrow}>
        <img
          src={openSection === title.toLowerCase() ? downIcon : rightIcon}
          alt={`Toggle ${title}`}
          className={`${style.sub_menu_arrow} ${openSection === title.toLowerCase() ? style.rotate : ''}`}
        />
      </div>
      {openSection === title.toLowerCase() && (
        <ul className={style.sub_menu}>
          {items.map((item, index) => (
            <li key={index} className={style.subMenuItem}>{item}</li>
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <header className={style.frame_wrapper}>
      <div className={style.row}>
        <div className={style.col_md_6}>
          <div className={style.logo}>
            <img
              src="https://assets.nicepagecdn.com/51f4b7da/6305210/images/LeasePixie.png"
              alt="Logo"
              className={style.logo_img}
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
        <div className={style.text_right}>
          <button
            className={style.hamburger_button}
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
            ref={menuButtonRef}
            aria-label="Toggle Menu"
          >
            <img
              src={isMenuOpen ? crossIcon : menuIcon}
              alt="Toggle Menu"
              className={style.hamburger}
            />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={style.hamburger_menu} ref={menuRef}>
          <div className={style.header_menu}>
            <ul>
              {renderMenuItem('Add', ['User', 'Property', 'Portfolio'])}
              {renderMenuItem('Settings', ['User', 'Portfolio'])}
            </ul>
          </div>
          <div className={style.signOut} style={{marginTop:'20px'}}>Sign out</div>
        </div>
      )}
    </header>
  );
};

export default Header;