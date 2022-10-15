import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../common/Containers';
import NavBar from '../Nav/NavBar';
import { ROUTE } from '../../constant/route';
import AlertIcon from "../../assets/images/icons/icon_alert.png";
import ProfileIcon from "../../assets/images/icons/icon_profile.png";
import { useState, useRef, useEffect } from "react";

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid rgba(191, 177, 186, .5);
  z-index: 1000;
`;

const HeaderContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 0 80px;
`;

const Logo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    font-family: 'SANGJUGyeongcheonIsland';
    font-size: 28px;
  }
`;

const HeaderUtils = styled.div`
  position: absolute;
  top: 50%;
  right: 80px;
  transform: translate(0, -50%);
  z-index: 10;

  display: flex;
  justify-content: flex-end;
`;

const HeaderUtilButton = styled.div`
  width: 32px;
  height: 32px;
  background: no-repeat 50% 50%/contain;
  cursor: pointer;

  & + & {
    margin-left: 30px;
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const NoticeButton = styled(HeaderUtilButton)`
  background-image: url(${AlertIcon});
`;

const MeButton = styled(HeaderUtilButton)`
  background-image: url(${ProfileIcon});
`;

const HeaderUtilBox = styled.div`
  position: absolute;
  top: 40px;
  right: -20px;
  width: 180px;
  padding: 20px 0;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: #fff;
  border: 1px solid #E7E5E0;
  box-shadow: 5px 5px 10px rgb(84, 79, 67, .15);

  li {
    padding: 8px 0;

    & > a {
      display: block;
      width: 100%;
      padding-left: 30px;
      transition: padding .3s, color .3s;
    }

    &:hover {
      background: #eff7f6;

      a {
        padding-left: 35px;
        color: ${({ theme }) => theme.colors.dasidaGreen};
        font-weight: 500;
      }
    }
  }
`;


export default function Header() {

  const navigate = useNavigate();
  const [utilBox, setUtilBox] = useState(false);

  const utilBoxRef = useRef<HTMLDivElement>(null);
  const utilButtonRef = useRef<HTMLDivElement>(null);

  // Utilbox 이외의 영역 클릭 시 Utilbox 닫힘
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (utilBoxRef.current && !utilBoxRef.current.contains(e.target) && !utilButtonRef.current?.contains(e.target)) {
        setUtilBox(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [utilBoxRef]);


  const handleUtilBox = () => {
    setUtilBox(!utilBox);
  }

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate(ROUTE.LOGIN.link);
  }

  return (
    <HeaderWrap>
      <HeaderContainer>
        <Logo>
          <Link to={ROUTE.HOME.link}>ㄷㅅ, ㄷ</Link>
        </Logo>
        <NavBar />
        <HeaderUtils>
          <NoticeButton />
          <MeButton ref={utilButtonRef} onClick={handleUtilBox} />
          {
            utilBox && (
              <HeaderUtilBox ref={utilBoxRef}>
                <ul>
                  <li><Link to={ROUTE.MY_PAGE.link}>마이페이지</Link></li>
                  <li><Link to={ROUTE.MY_PROFILE.link}>계정관리</Link></li>
                  <li><Link to={ROUTE.LOGIN.link} onClick={handleLogout}>로그아웃</Link></li>
                </ul>
              </HeaderUtilBox>
            )
          }
        </HeaderUtils>
      </HeaderContainer>
    </HeaderWrap>
  );
}
