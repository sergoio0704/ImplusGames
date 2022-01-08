import { useEffect, useRef, useState } from "react"
import { useAccount } from "../../context/accountContext"
import { useImg } from "../../hooks/img.hooks"

export const Header = () => {
    const { headerLogo, profileLogo, adminLogo } = useImg()
    const [isDropdownVisible, setDropdownVisible] = useState(false)

    const {account} = useAccount()

    const showDropdownHandler = (e) => {
        if (!isDropdownVisible && e.target.closest('.header-profile-logo'))
        {
            setDropdownVisible(true)
        }      
    }

    const hideDropdownHandler = (e) => {
        if (isDropdownVisible) {
            setDropdownVisible(false)
        } 
    }

    useEffect(() => {
        document.addEventListener('click', hideDropdownHandler, false)
        return () => {
            document.removeEventListener('click', hideDropdownHandler, false)
        }
    }, [isDropdownVisible])

    return (
        <div className="header">
            <img src={headerLogo} alt="header-logo" />
            <div className="header-navigation">
                <ul className="header-list">
                    <li className="header-list-item">
                        <a className="header-list-item-link" href="/">Главная</a>
                    </li>
                    <li className="header-list-item">
                        <a className="header-list-item-link" href="/">Рейтинг</a>
                    </li>
                </ul>
                <div className="header-profile-wrapper">
                    { 
                        account.isAdmin && 
                        <div className="header-profile-admin">
                            <span class="header-profile-admin-tooltip">Admin</span>
                            <img src={adminLogo} className="header-profile-admin-logo" alt="admin-logo" /> 
                        </div>
                    }
                    <div className="header-profile-info">
                        <div className="header-profile-name">
                            {account.name}
                        </div>
                        <div className="header-profile-email">
                            {account.email}
                        </div>
                    </div>
                    <div className="header-profile">
                        <img src={profileLogo} className="header-profile-logo" alt="profile-logo" onClick={showDropdownHandler} />
                    </div>
                </div>
            </div>
            {isDropdownVisible && <HeaderDropdown isActive={isDropdownVisible}/>}       
        </div>
    )
}

const HeaderDropdown = ({isActive}) => {
    const {account} = useAccount()
    return (
        <div className={`header-dropdown ${isActive && 'header-dropdown-visible'}`}>
            <ul className="header-dropdown-list">
                <li className="header-dropdown-item">
                    <a className="header-dropdown-link" href="/">Профиль</a>
                </li>
                <li className="header-dropdown-item">
                    <a className="header-dropdown-link" href="/">Выйти</a>
                </li>
            </ul>
        </div>
    )
}