import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../util/useUser";

const HeaderWrap = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 70px;
  z-index: 1;
  transition: all linear 0.2s;
  &.hidden {
    opacity: 0;
    pointer-events: none;
    z-index: -10;
  }
  :hover {
    background-color: #111;
  }
`;
const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  height: 100%;
  padding: 0px 30px;
  margin: 0px auto;
  left: 0px;
  right: 0px;
  background-color: transparent;
  transition: all linear 0.2s;
`;
const Nav = styled.ul`
  display: flex;
  align-items: center;
  position: relative;
  width: 70%;
  svg {
    width: 150px;
    transition: all ease-in-out 0.2s;
  }
`;
const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: max-content;
  height: 50px;
  &:first-child {
    width: max-content;
    margin-right: 50px;
  }
  :not(:nth-of-type(1)) a {
    margin: 0px 30px;
    :hover {
      color: #ff8181;
    }
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: all linear 0.2s;
    color: #f9f9f9;
    text-align: center;
    text-transform: uppercase;
    &.on {
      transition: all ease-in-out 0.2s;
      color: #ff3d3d;
      font-weight: bold;
    }
  }
`;

const UserInfo = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  align-items: center;
  /* margin-right: 30px; */
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
    background-color: #f9f9f9;
  }
  a {
    color: #f9f9f9;
    transition: all linear 0.2s;
    :hover {
      color: #ff8181;
    }
  }
`;
const ProfileMenu = styled.ul`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  flex-direction: column;
  width: 80px;
  border: 1px solid #333;
  border-radius: 5px;
  overflow: hidden;
  li {
    padding: 10px;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    border-top: 1px solid #333;
    background-color: #d9d9d9;
    :hover {
      opacity: 0.9;
    }
    :first-child {
      border: none;
    }
  }
`;

export default function NavBar() {
  const homeMatch = useMatch("/");
  const searchMatch = useMatch("/search");
  const tvMatch = useMatch("/tv");
  const movieMatch = useMatch("/movies");
  const genreMatch = useMatch("/genre");
  const { user } = useUser();
  const [showNav, setShowNav] = useState(true);
  const profileMenu = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    if (window.confirm("로그아웃을 하시겠습니까?")) {
      localStorage.removeItem("loginUser");
      navigate("/");
      window.location.reload();
    }
    return;
  };

  const [pageY, setPageY] = useState(window.scrollY);
  const [clientY, setCLientY] = useState(window.clientY);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      // if (y > window.scrollY) {
      //   setShowNav(false);
      // } else if (y < window.scrollY) {
      //   setShowNav(true);
      // }
      if (window.scrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setPageY(window.scrollY);
    },
    [pageY]
  );
  const handleMouseMove = useCallback(
    (event) => {
      setCLientY(event.clientY);
      if (window.scrollY > 80) {
        if (event.clientY < 70 || menuOver) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      }
    },
    [clientY, pageY]
  );

  useEffect(() => {
    setPageY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleNavigation, handleMouseMove]);

  const [menuOver, setMenuOver] = useState(false);
  const mouseOver = () => {
    setMenuOver(true);
    profileMenu.current.style.display = "flex";
  };
  const mouseLeave = () => {
    setMenuOver(false);
    profileMenu.current.style.display = "none";
  };

  return (
    <HeaderWrap className={showNav ? "" : "hidden"}>
      <Header>
        <Nav>
          <Li>
            <Link id="logo" to="/">
              <svg
                width="181"
                height="34"
                viewBox="0 0 181 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.52148 0.0371094C2.31315 0.061849 3.00586 0.0742188 3.59961 0.0742188C4.19336 0.0494792 4.67578 0.0371094 5.04688 0.0371094H6.12305C6.39518 0.0123698 6.72917 0 7.125 0C7.47135 0 7.89193 0 8.38672 0C8.88151 0 9.45052 0.0123698 10.0938 0.0371094C10.2917 0.729818 10.5143 1.41016 10.7617 2.07812C11.0339 2.72135 11.2689 3.30273 11.4668 3.82227C11.7142 4.44076 11.9616 5.02214 12.209 5.56641C12.4564 6.11068 12.7533 6.76628 13.0996 7.5332C13.3965 8.17643 13.7552 8.9681 14.1758 9.9082C14.5964 10.8236 15.0911 11.875 15.6602 13.0625C15.9323 12.2956 16.1797 11.5905 16.4023 10.9473C16.6497 10.304 16.86 9.7474 17.0332 9.27734C17.2311 8.73307 17.3919 8.23828 17.5156 7.79297C17.6393 7.34766 17.7754 6.80339 17.9238 6.16016C18.0475 5.61589 18.1836 4.96029 18.332 4.19336C18.5052 3.42643 18.6784 2.53581 18.8516 1.52148C19.569 1.52148 20.2122 1.52148 20.7812 1.52148C21.3503 1.52148 21.8451 1.50911 22.2656 1.48438C22.7357 1.48438 23.1562 1.47201 23.5273 1.44727C23.9232 1.44727 24.4551 1.42253 25.123 1.37305C25.6921 1.32357 26.4466 1.28646 27.3867 1.26172C28.3516 1.21224 29.5391 1.15039 30.9492 1.07617C30.4297 1.44727 30.0091 1.81836 29.6875 2.18945C29.3906 2.53581 29.1556 2.84505 28.9824 3.11719C28.7845 3.4388 28.6608 3.74805 28.6113 4.04492C28.5618 4.29232 28.5124 4.86133 28.4629 5.75195C28.4382 6.64258 28.401 7.70638 28.3516 8.94336C28.3268 10.1556 28.3021 11.4544 28.2773 12.8398C28.2773 14.2253 28.2897 15.5365 28.3145 16.7734C28.3392 18.0104 28.3763 19.0866 28.4258 20.002C28.5 20.8926 28.599 21.4616 28.7227 21.709C28.8958 22.0059 29.1309 22.3522 29.4277 22.748C29.6999 23.0944 30.0462 23.4902 30.4668 23.9355C30.9121 24.3809 31.4935 24.8757 32.2109 25.4199C31.0729 25.4694 30.1204 25.5065 29.3535 25.5312C28.6113 25.556 27.9928 25.5807 27.498 25.6055C26.929 25.6302 26.4714 25.6426 26.125 25.6426C25.7539 25.6426 25.2467 25.6549 24.6035 25.6797C24.0345 25.7044 23.2799 25.7415 22.3398 25.791C21.3997 25.8158 20.1875 25.8652 18.7031 25.9395C19.0495 25.5436 19.3711 25.1478 19.668 24.752C19.9648 24.3561 20.2122 23.9974 20.4102 23.6758C20.6576 23.3047 20.8678 22.946 21.041 22.5996C21.2142 22.1296 21.3503 21.276 21.4492 20.0391C21.5482 18.9753 21.6224 17.4538 21.6719 15.4746C21.7214 13.4707 21.7214 10.7865 21.6719 7.42188C21.2018 8.1888 20.7812 8.95573 20.4102 9.72266C20.0638 10.4648 19.7546 11.1452 19.4824 11.7637C19.1855 12.4811 18.9134 13.1738 18.666 13.8418C18.4186 14.5345 18.1589 15.3014 17.8867 16.1426C17.6393 16.86 17.3424 17.7135 16.9961 18.7031C16.6745 19.6927 16.3034 20.7812 15.8828 21.9688L14.4727 22.043C14.2747 21.0534 14.0768 20.1628 13.8789 19.3711C13.681 18.5547 13.4831 17.862 13.2852 17.293C13.0625 16.625 12.8398 16.0312 12.6172 15.5117C12.3698 14.9922 12.0977 14.4108 11.8008 13.7676C11.5286 13.2233 11.1947 12.5801 10.7988 11.8379C10.4277 11.0957 9.99479 10.2669 9.5 9.35156C9.2526 11.875 9.10417 13.9284 9.05469 15.5117C9.00521 17.0703 9.00521 18.2826 9.05469 19.1484C9.10417 20.1875 9.17839 20.9421 9.27734 21.4121C9.42578 21.8327 9.66081 22.3027 9.98242 22.8223C10.2546 23.2676 10.6257 23.7995 11.0957 24.418C11.5905 25.0117 12.2214 25.6797 12.9883 26.4219C12.444 26.4219 11.875 26.4219 11.2812 26.4219C10.6875 26.4219 10.1432 26.4342 9.64844 26.459C9.05469 26.4837 8.47331 26.4961 7.9043 26.4961C7.31055 26.5208 6.61784 26.5579 5.82617 26.6074C5.13346 26.6569 4.30469 26.7064 3.33984 26.7559C2.375 26.8053 1.26172 26.8919 0 27.0156C0.544271 26.6693 0.989583 26.3353 1.33594 26.0137C1.68229 25.6673 1.95443 25.3581 2.15234 25.0859C2.39974 24.7643 2.58529 24.4427 2.70898 24.1211C2.7832 23.9232 2.84505 23.4902 2.89453 22.8223C2.96875 22.1543 3.0306 21.3379 3.08008 20.373C3.1543 19.4082 3.20378 18.332 3.22852 17.1445C3.27799 15.957 3.3151 14.7572 3.33984 13.5449C3.38932 12.3079 3.42643 11.1081 3.45117 9.94531C3.47591 8.75781 3.48828 7.69401 3.48828 6.75391C3.51302 5.78906 3.52539 4.98503 3.52539 4.3418C3.52539 3.69857 3.52539 3.29036 3.52539 3.11719C3.45117 2.74609 3.33984 2.375 3.19141 2.00391C3.06771 1.68229 2.86979 1.34831 2.59766 1.00195C2.32552 0.655599 1.9668 0.333984 1.52148 0.0371094Z"
                  fill={
                    homeMatch || searchMatch || genreMatch ? "#ff3d3d" : "white"
                  }
                />
                <path
                  d="M41.7852 10.0195C42.4284 10.0195 43.0964 10.1432 43.7891 10.3906C44.4818 10.6133 45.1497 10.9102 45.793 11.2812C46.4362 11.6276 47.0176 12.0111 47.5371 12.4316C48.0814 12.8275 48.5267 13.2109 48.873 13.582C49.4915 14.25 49.9121 15.153 50.1348 16.291C50.3822 17.4043 50.4316 18.5547 50.2832 19.7422C50.1348 20.9049 49.7884 22.0059 49.2441 23.0449C48.6999 24.084 47.9453 24.8509 46.9805 25.3457C46.2878 25.6921 45.6074 25.9642 44.9395 26.1621C44.2715 26.36 43.6283 26.5085 43.0098 26.6074C42.3913 26.7064 41.8099 26.7559 41.2656 26.7559C40.7214 26.7559 40.2513 26.7435 39.8555 26.7188C39.1133 26.6693 38.334 26.4095 37.5176 25.9395C36.7259 25.4694 35.9714 24.888 35.2539 24.1953C34.5612 23.5026 33.9674 22.748 33.4727 21.9316C32.9779 21.0905 32.681 20.2988 32.582 19.5566C32.4336 18.5423 32.4089 17.4785 32.5078 16.3652C32.6068 15.252 32.9655 14.2253 33.584 13.2852C34.2272 12.3451 35.1921 11.5658 36.4785 10.9473C37.7897 10.3288 39.5586 10.0195 41.7852 10.0195ZM40.5605 24.418C40.8327 24.4674 41.2038 24.4056 41.6738 24.2324C42.1439 24.0345 42.6016 23.7253 43.0469 23.3047C43.5169 22.8841 43.9251 22.3522 44.2715 21.709C44.6426 21.041 44.8652 20.237 44.9395 19.2969C45.0137 18.3815 45.0137 17.5404 44.9395 16.7734C44.89 16.0065 44.7786 15.3385 44.6055 14.7695C44.4323 14.1758 44.2344 13.6934 44.0117 13.3223C43.7891 12.9512 43.554 12.6914 43.3066 12.543C42.8861 12.3203 42.3789 12.1471 41.7852 12.0234C41.1914 11.875 40.6842 11.8997 40.2637 12.0977C40.0658 12.1966 39.8184 12.4069 39.5215 12.7285C39.2246 13.0501 38.9277 13.4583 38.6309 13.9531C38.334 14.4232 38.0618 14.9674 37.8145 15.5859C37.5918 16.2044 37.431 16.8477 37.332 17.5156C37.2331 18.1836 37.2083 18.901 37.2578 19.668C37.332 20.4349 37.4928 21.1647 37.7402 21.8574C37.9876 22.5254 38.334 23.1068 38.7793 23.6016C39.2493 24.0716 39.8431 24.3438 40.5605 24.418Z"
                  fill={
                    homeMatch || searchMatch || genreMatch ? "#ff3d3d" : "white"
                  }
                />
                <path
                  d="M48.4648 6.19727C48.8854 6.27148 49.3184 6.33333 49.7637 6.38281C50.1842 6.40755 50.5677 6.43229 50.9141 6.45703C51.3099 6.48177 51.6934 6.49414 52.0645 6.49414C52.4355 6.49414 52.8561 6.48177 53.3262 6.45703C53.722 6.43229 54.1921 6.39518 54.7363 6.3457C55.3053 6.29622 55.9238 6.22201 56.5918 6.12305C56.196 6.3457 55.8867 6.58073 55.6641 6.82812C55.4414 7.07552 55.2682 7.29818 55.1445 7.49609C54.9961 7.74349 54.8971 7.96615 54.8477 8.16406C54.7982 8.36198 54.8105 8.77018 54.8848 9.38867C54.959 10.0072 55.0579 10.7246 55.1816 11.541C55.3301 12.3574 55.4909 13.2109 55.6641 14.1016C55.8372 14.9922 56.0104 15.8086 56.1836 16.5508C56.3815 17.293 56.5547 17.9115 56.7031 18.4062C56.8763 18.901 57.0124 19.1361 57.1113 19.1113C57.2103 19.1113 57.3587 18.8639 57.5566 18.3691C57.7793 17.8743 58.0267 17.2682 58.2988 16.5508C58.571 15.8086 58.8555 15.0046 59.1523 14.1387C59.4492 13.248 59.709 12.4193 59.9316 11.6523C60.1543 10.8854 60.3275 10.2422 60.4512 9.72266C60.5996 9.17839 60.6615 8.85677 60.6367 8.75781C60.5625 8.65885 60.4759 8.52279 60.377 8.34961C60.2038 8.07747 59.8203 7.60742 59.2266 6.93945C59.944 6.98893 60.5625 7.03841 61.082 7.08789C61.6016 7.11263 62.0221 7.14974 62.3438 7.19922C62.7148 7.2487 63.0117 7.28581 63.2344 7.31055C63.457 7.33529 63.7786 7.33529 64.1992 7.31055C64.5456 7.31055 65.0033 7.29818 65.5723 7.27344C66.166 7.22396 66.8958 7.14974 67.7617 7.05078C67.1185 7.42188 66.5866 7.75586 66.166 8.05273C65.7702 8.32487 65.4609 8.5599 65.2383 8.75781C64.9661 9.00521 64.7682 9.21549 64.6445 9.38867C64.4714 9.71029 64.1621 10.4772 63.7168 11.6895C63.5189 12.209 63.2715 12.8522 62.9746 13.6191C62.7025 14.3861 62.3685 15.3138 61.9727 16.4023C61.6016 17.4661 61.1562 18.7155 60.6367 20.1504C60.1172 21.5853 59.5358 23.2305 58.8926 25.0859L55.293 25.457C54.8229 23.8984 54.4395 22.5996 54.1426 21.5605C53.8704 20.4967 53.6478 19.6432 53.4746 19C53.2767 18.2578 53.1283 17.6764 53.0293 17.2559C52.9056 16.7858 52.7572 16.1055 52.584 15.2148C52.4108 14.2995 52.2376 13.3717 52.0645 12.4316C51.8913 11.4915 51.7181 10.6504 51.5449 9.9082C51.3717 9.14128 51.2357 8.67122 51.1367 8.49805C51.0378 8.37435 50.8646 8.20117 50.6172 7.97852C50.4193 7.7806 50.1471 7.54557 49.8008 7.27344C49.4544 6.97656 49.0091 6.61784 48.4648 6.19727Z"
                  fill={
                    homeMatch || searchMatch || genreMatch ? "#ff3d3d" : "white"
                  }
                />
                <path
                  d="M65.8691 10.0566L72.6973 10.1309C72.3014 11.64 72.0046 12.9264 71.8066 13.9902C71.6335 15.054 71.5221 15.9447 71.4727 16.6621C71.3737 17.4785 71.349 18.1712 71.3984 18.7402C71.4727 19.2598 71.5964 19.8164 71.7695 20.4102C71.918 20.9049 72.1406 21.474 72.4375 22.1172C72.7344 22.7604 73.1302 23.4036 73.625 24.0469C73.3281 23.9479 73.0065 23.8737 72.6602 23.8242C72.3138 23.7747 71.9922 23.7376 71.6953 23.7129C71.349 23.6882 71.0026 23.6882 70.6562 23.7129C70.3099 23.7376 69.9264 23.7747 69.5059 23.8242C69.1595 23.8737 68.7389 23.9355 68.2441 24.0098C67.7493 24.084 67.2298 24.1829 66.6855 24.3066C67.0566 23.1934 67.3411 22.2285 67.5391 21.4121C67.7617 20.5957 67.9225 19.9154 68.0215 19.3711C68.1204 18.7279 68.1823 18.2083 68.207 17.8125C68.207 17.3177 68.207 16.7611 68.207 16.1426C68.207 15.4993 68.207 14.8809 68.207 14.2871C68.207 13.6934 68.1947 13.1738 68.1699 12.7285C68.1452 12.2585 68.0957 11.9616 68.0215 11.8379L67.6504 11.4668C67.502 11.3431 67.2793 11.1699 66.9824 10.9473C66.7103 10.6999 66.3392 10.403 65.8691 10.0566ZM68.5039 4.3418C69.0234 4.06966 69.543 3.99544 70.0625 4.11914C70.6068 4.24284 71.0273 4.47786 71.3242 4.82422C71.6211 5.17057 71.7201 5.57878 71.6211 6.04883C71.5469 6.51888 71.151 6.97656 70.4336 7.42188C69.7161 7.84245 69.0853 7.99089 68.541 7.86719C67.9967 7.74349 67.6133 7.48372 67.3906 7.08789C67.168 6.69206 67.1309 6.23438 67.2793 5.71484C67.4277 5.17057 67.8359 4.71289 68.5039 4.3418Z"
                  fill={
                    homeMatch || searchMatch || genreMatch ? "#ff3d3d" : "white"
                  }
                />
                <path
                  d="M84.6094 20.6699C85.3021 20.6699 85.9453 20.5957 86.5391 20.4473C87.0339 20.3236 87.5039 20.1257 87.9492 19.8535C88.4193 19.5566 88.7285 19.1237 88.877 18.5547C89.3717 18.6536 89.7923 18.7402 90.1387 18.8145C90.485 18.8639 90.7819 18.9134 91.0293 18.9629C91.3014 19.0371 91.5365 19.0866 91.7344 19.1113C91.9323 19.1608 92.1673 19.2103 92.4395 19.2598C92.6868 19.3092 92.9837 19.3711 93.3301 19.4453C93.7012 19.4948 94.1341 19.569 94.6289 19.668C94.2578 19.6185 93.8743 19.6556 93.4785 19.7793C93.1074 19.903 92.7487 20.0391 92.4023 20.1875C92.0065 20.3607 91.6354 20.571 91.2891 20.8184C91.0664 20.9668 90.8066 21.1895 90.5098 21.4863C90.2376 21.7832 89.8418 22.0677 89.3223 22.3398C88.8027 22.612 88.11 22.847 87.2441 23.0449C86.403 23.2181 85.3145 23.2799 83.9785 23.2305C82.3704 23.181 81.0221 22.8965 79.9336 22.377C78.8451 21.8327 77.9668 21.1771 77.2988 20.4102C76.6309 19.6185 76.1484 18.765 75.8516 17.8496C75.5547 16.9342 75.3939 16.0807 75.3691 15.2891C75.3444 14.4974 75.5794 13.6686 76.0742 12.8027C76.569 11.9368 77.2617 11.1452 78.1523 10.4277C79.0677 9.71029 80.1686 9.12891 81.4551 8.68359C82.7415 8.21354 84.1517 7.97852 85.6855 7.97852C86.5762 7.97852 87.3926 8.08984 88.1348 8.3125C88.9017 8.51042 89.5944 8.78255 90.2129 9.12891C90.8561 9.47526 91.4128 9.87109 91.8828 10.3164C92.3529 10.737 92.7487 11.1699 93.0703 11.6152C93.3919 12.0853 93.6641 12.5801 93.8867 13.0996C94.0846 13.5449 94.2454 14.0521 94.3691 14.6211C94.4928 15.1901 94.5299 15.7715 94.4805 16.3652C92.6003 16.4147 91.0788 16.4518 89.916 16.4766C88.778 16.5013 87.8874 16.5137 87.2441 16.5137H84.3125C83.8672 16.5137 83.2858 16.526 82.5684 16.5508C81.8509 16.5755 80.9727 16.6126 79.9336 16.6621C80.0573 17.6517 80.3665 18.4186 80.8613 18.9629C81.3809 19.4824 81.9251 19.8783 82.4941 20.1504C83.1374 20.4473 83.8424 20.6204 84.6094 20.6699ZM81.2695 13.9902C82.0612 14.0397 82.7168 14.0768 83.2363 14.1016C83.7806 14.1263 84.2259 14.151 84.5723 14.1758C84.9434 14.2005 85.2402 14.2129 85.4629 14.2129H86.3906C87.0091 14.2129 88.1595 14.1758 89.8418 14.1016C89.7676 13.013 89.5326 12.1842 89.1367 11.6152C88.7656 11.0462 88.3698 10.6257 87.9492 10.3535C87.4544 10.0566 86.9102 9.88346 86.3164 9.83398C84.7083 9.85872 83.5085 10.1927 82.7168 10.8359C81.9499 11.4792 81.4674 12.5306 81.2695 13.9902Z"
                  fill={
                    homeMatch || searchMatch || genreMatch ? "#ff3d3d" : "white"
                  }
                />
                <path
                  d="M113.592 1.52148C114.829 1.5957 115.868 1.65755 116.709 1.70703C117.575 1.73177 118.292 1.75651 118.861 1.78125C119.505 1.80599 120.049 1.80599 120.494 1.78125C120.939 1.75651 121.546 1.69466 122.312 1.5957C122.956 1.52148 123.809 1.41016 124.873 1.26172C125.962 1.08854 127.31 0.865885 128.918 0.59375C128.349 1.16276 127.904 1.68229 127.582 2.15234C127.285 2.59766 127.05 2.98112 126.877 3.30273C126.679 3.69857 126.543 4.03255 126.469 4.30469C126.419 4.55208 126.469 5.17057 126.617 6.16016C126.766 7.14974 126.976 8.32487 127.248 9.68555C127.52 11.0215 127.817 12.4564 128.139 13.9902C128.46 15.4993 128.782 16.9219 129.104 18.2578C129.425 19.569 129.71 20.6947 129.957 21.6348C130.229 22.5501 130.427 23.0944 130.551 23.2676C130.922 23.7871 131.157 24.1335 131.256 24.3066C131.355 24.4551 131.528 24.5911 131.775 24.7148C131.874 24.7643 132.035 24.8385 132.258 24.9375C132.456 25.0365 132.715 25.1602 133.037 25.3086C133.383 25.457 133.816 25.6302 134.336 25.8281C133.371 25.8776 132.542 25.9147 131.85 25.9395C131.157 25.9395 130.588 25.9518 130.143 25.9766C129.623 26.0013 129.178 26.026 128.807 26.0508C128.436 26.0508 127.99 26.0755 127.471 26.125C127.025 26.1745 126.444 26.224 125.727 26.2734C125.034 26.3229 124.217 26.3724 123.277 26.4219C123.772 26.0755 124.168 25.7663 124.465 25.4941C124.786 25.1973 125.034 24.9499 125.207 24.752C125.405 24.5046 125.541 24.2819 125.615 24.084C125.665 23.8613 125.702 23.5273 125.727 23.082C125.751 22.6862 125.751 22.1667 125.727 21.5234C125.702 20.8555 125.64 19.9896 125.541 18.9258L115.781 19.9277C115.534 20.3483 115.348 20.7194 115.225 21.041C115.101 21.3379 115.014 21.5977 114.965 21.8203C114.891 22.0924 114.866 22.3151 114.891 22.4883C114.94 22.6862 115.027 22.9212 115.15 23.1934C115.274 23.4408 115.447 23.7376 115.67 24.084C115.917 24.4056 116.276 24.7891 116.746 25.2344C116.128 25.2096 115.497 25.1973 114.854 25.1973C114.21 25.1973 113.617 25.2096 113.072 25.2344C112.429 25.2591 111.798 25.2839 111.18 25.3086C110.561 25.3333 109.856 25.3704 109.064 25.4199C108.396 25.4694 107.617 25.5312 106.727 25.6055C105.811 25.6549 104.834 25.7292 103.795 25.8281C104.438 25.5312 104.982 25.2344 105.428 24.9375C105.873 24.6159 106.244 24.319 106.541 24.0469C106.887 23.75 107.184 23.4655 107.432 23.1934C107.605 22.946 107.951 22.377 108.471 21.4863C108.99 20.571 109.572 19.4948 110.215 18.2578C110.883 17.0208 111.576 15.6973 112.293 14.2871C113.035 12.877 113.703 11.5534 114.297 10.3164C114.891 9.05469 115.373 7.96615 115.744 7.05078C116.115 6.13542 116.301 5.54167 116.301 5.26953C116.251 4.94792 116.128 4.58919 115.93 4.19336C115.757 3.84701 115.484 3.45117 115.113 3.00586C114.767 2.56055 114.26 2.06576 113.592 1.52148ZM125.096 16.1797C124.947 15.3138 124.811 14.5716 124.688 13.9531C124.564 13.3099 124.465 12.778 124.391 12.3574C124.292 11.8626 124.217 11.4297 124.168 11.0586C124.094 10.7122 124.007 10.2669 123.908 9.72266C123.809 9.2526 123.686 8.67122 123.537 7.97852C123.413 7.26107 123.253 6.40755 123.055 5.41797C121.645 8.23828 120.544 10.4277 119.752 11.9863C118.985 13.5202 118.428 14.6458 118.082 15.3633C117.661 16.2044 117.426 16.6992 117.377 16.8477L125.096 16.1797Z"
                  fill={
                    homeMatch || searchMatch || genreMatch ? "#ff3d3d" : "white"
                  }
                />
                <path
                  d="M131.479 9.35156C132.27 9.22786 132.913 9.12891 133.408 9.05469C133.928 8.95573 134.348 8.88151 134.67 8.83203C135.041 8.75781 135.326 8.69596 135.523 8.64648C135.721 8.59701 136.006 8.52279 136.377 8.42383C136.699 8.32487 137.119 8.21354 137.639 8.08984C138.158 7.94141 138.814 7.74349 139.605 7.49609C139.408 7.74349 139.247 7.96615 139.123 8.16406C139.024 8.33724 138.925 8.48568 138.826 8.60938C138.727 8.75781 138.641 8.89388 138.566 9.01758C138.492 9.14128 138.418 9.32682 138.344 9.57422C138.294 9.77214 138.232 10.0566 138.158 10.4277C138.084 10.7741 138.022 11.2318 137.973 11.8008C139.309 10.9596 140.533 10.3288 141.646 9.9082C142.785 9.48763 143.774 9.19076 144.615 9.01758C145.605 8.81966 146.495 8.74544 147.287 8.79492C148.277 8.86914 149.192 9.0918 150.033 9.46289C150.899 9.80924 151.678 10.2298 152.371 10.7246C153.064 11.2194 153.67 11.7637 154.189 12.3574C154.709 12.9512 155.117 13.5449 155.414 14.1387C155.612 14.5345 155.736 15.1035 155.785 15.8457C155.859 16.5879 155.785 17.3796 155.562 18.2207C155.34 19.0618 154.944 19.8906 154.375 20.707C153.831 21.4987 153.051 22.1296 152.037 22.5996C150.281 23.3913 148.536 23.8366 146.805 23.9355C146.062 23.985 145.296 23.9603 144.504 23.8613C143.737 23.7624 142.958 23.5521 142.166 23.2305C141.399 22.9089 140.657 22.4512 139.939 21.8574C139.222 21.2389 138.566 20.4473 137.973 19.4824C137.775 20.7441 137.626 21.8451 137.527 22.7852C137.453 23.7005 137.404 24.4674 137.379 25.0859C137.354 25.8034 137.354 26.4095 137.379 26.9043C137.428 27.3991 137.527 27.931 137.676 28.5C137.799 28.9948 137.973 29.5638 138.195 30.207C138.443 30.875 138.752 31.5677 139.123 32.2852C138.975 32.2357 138.764 32.1986 138.492 32.1738C138.245 32.1738 137.985 32.1986 137.713 32.248C137.416 32.2975 137.082 32.347 136.711 32.3965C136.365 32.4707 135.981 32.5573 135.561 32.6562C135.214 32.7305 134.806 32.8171 134.336 32.916C133.891 33.0397 133.433 33.1758 132.963 33.3242C133.235 33.0026 133.445 32.6315 133.594 32.2109C133.767 31.8151 133.903 31.444 134.002 31.0977C134.101 30.6771 134.188 30.2565 134.262 29.8359C134.286 29.4648 134.324 28.7598 134.373 27.7207C134.447 26.7064 134.509 25.5312 134.559 24.1953C134.608 22.8346 134.645 21.4121 134.67 19.9277C134.719 18.4434 134.744 17.0703 134.744 15.8086C134.769 14.5221 134.769 13.4336 134.744 12.543C134.719 11.6523 134.67 11.1328 134.596 10.9844C134.497 10.8112 134.311 10.6257 134.039 10.4277C133.816 10.2546 133.495 10.0814 133.074 9.9082C132.678 9.73503 132.146 9.54948 131.479 9.35156ZM140.311 16.1055C140.137 16.6745 140.1 17.2311 140.199 17.7754C140.298 18.3197 140.546 18.8268 140.941 19.2969C141.362 19.7669 141.943 20.1875 142.686 20.5586C143.452 20.9049 144.405 21.1647 145.543 21.3379C146.681 21.5111 147.547 21.4863 148.141 21.2637C148.734 21.041 149.167 20.6947 149.439 20.2246C149.736 19.7298 149.934 19.1608 150.033 18.5176C150.132 17.8496 150.256 17.1569 150.404 16.4395C150.553 15.7467 150.528 15.0417 150.33 14.3242C150.132 13.582 149.848 12.9141 149.477 12.3203C149.13 11.7266 148.734 11.2441 148.289 10.873C147.868 10.4772 147.497 10.2793 147.176 10.2793C146.409 10.2793 145.654 10.4772 144.912 10.873C144.17 11.2689 143.49 11.7637 142.871 12.3574C142.253 12.9512 141.708 13.5944 141.238 14.2871C140.793 14.9551 140.484 15.5612 140.311 16.1055Z"
                  fill={
                    homeMatch || searchMatch || genreMatch ? "#ff3d3d" : "white"
                  }
                />
                <path
                  d="M156.193 9.35156C156.985 9.22786 157.628 9.12891 158.123 9.05469C158.643 8.95573 159.063 8.88151 159.385 8.83203C159.756 8.75781 160.04 8.69596 160.238 8.64648C160.436 8.59701 160.721 8.52279 161.092 8.42383C161.413 8.32487 161.834 8.21354 162.354 8.08984C162.873 7.94141 163.529 7.74349 164.32 7.49609C164.122 7.74349 163.962 7.96615 163.838 8.16406C163.739 8.33724 163.64 8.48568 163.541 8.60938C163.442 8.75781 163.355 8.89388 163.281 9.01758C163.207 9.14128 163.133 9.32682 163.059 9.57422C163.009 9.77214 162.947 10.0566 162.873 10.4277C162.799 10.7741 162.737 11.2318 162.688 11.8008C164.023 10.9596 165.248 10.3288 166.361 9.9082C167.499 9.48763 168.489 9.19076 169.33 9.01758C170.32 8.81966 171.21 8.74544 172.002 8.79492C172.992 8.86914 173.907 9.0918 174.748 9.46289C175.614 9.80924 176.393 10.2298 177.086 10.7246C177.779 11.2194 178.385 11.7637 178.904 12.3574C179.424 12.9512 179.832 13.5449 180.129 14.1387C180.327 14.5345 180.451 15.1035 180.5 15.8457C180.574 16.5879 180.5 17.3796 180.277 18.2207C180.055 19.0618 179.659 19.8906 179.09 20.707C178.546 21.4987 177.766 22.1296 176.752 22.5996C174.995 23.3913 173.251 23.8366 171.52 23.9355C170.777 23.985 170.01 23.9603 169.219 23.8613C168.452 23.7624 167.673 23.5521 166.881 23.2305C166.114 22.9089 165.372 22.4512 164.654 21.8574C163.937 21.2389 163.281 20.4473 162.688 19.4824C162.49 20.7441 162.341 21.8451 162.242 22.7852C162.168 23.7005 162.118 24.4674 162.094 25.0859C162.069 25.8034 162.069 26.4095 162.094 26.9043C162.143 27.3991 162.242 27.931 162.391 28.5C162.514 28.9948 162.688 29.5638 162.91 30.207C163.158 30.875 163.467 31.5677 163.838 32.2852C163.689 32.2357 163.479 32.1986 163.207 32.1738C162.96 32.1738 162.7 32.1986 162.428 32.248C162.131 32.2975 161.797 32.347 161.426 32.3965C161.079 32.4707 160.696 32.5573 160.275 32.6562C159.929 32.7305 159.521 32.8171 159.051 32.916C158.605 33.0397 158.148 33.1758 157.678 33.3242C157.95 33.0026 158.16 32.6315 158.309 32.2109C158.482 31.8151 158.618 31.444 158.717 31.0977C158.816 30.6771 158.902 30.2565 158.977 29.8359C159.001 29.4648 159.038 28.7598 159.088 27.7207C159.162 26.7064 159.224 25.5312 159.273 24.1953C159.323 22.8346 159.36 21.4121 159.385 19.9277C159.434 18.4434 159.459 17.0703 159.459 15.8086C159.484 14.5221 159.484 13.4336 159.459 12.543C159.434 11.6523 159.385 11.1328 159.311 10.9844C159.212 10.8112 159.026 10.6257 158.754 10.4277C158.531 10.2546 158.21 10.0814 157.789 9.9082C157.393 9.73503 156.861 9.54948 156.193 9.35156ZM165.025 16.1055C164.852 16.6745 164.815 17.2311 164.914 17.7754C165.013 18.3197 165.26 18.8268 165.656 19.2969C166.077 19.7669 166.658 20.1875 167.4 20.5586C168.167 20.9049 169.12 21.1647 170.258 21.3379C171.396 21.5111 172.262 21.4863 172.855 21.2637C173.449 21.041 173.882 20.6947 174.154 20.2246C174.451 19.7298 174.649 19.1608 174.748 18.5176C174.847 17.8496 174.971 17.1569 175.119 16.4395C175.268 15.7467 175.243 15.0417 175.045 14.3242C174.847 13.582 174.562 12.9141 174.191 12.3203C173.845 11.7266 173.449 11.2441 173.004 10.873C172.583 10.4772 172.212 10.2793 171.891 10.2793C171.124 10.2793 170.369 10.4772 169.627 10.873C168.885 11.2689 168.204 11.7637 167.586 12.3574C166.967 12.9512 166.423 13.5944 165.953 14.2871C165.508 14.9551 165.199 15.5612 165.025 16.1055Z"
                  fill={
                    homeMatch || searchMatch || genreMatch ? "#ff3d3d" : "white"
                  }
                />
              </svg>
            </Link>
          </Li>
          <Li>
            <Link to="/movies" className={movieMatch ? "on" : ""}>
              Movie
            </Link>
          </Li>
          <Li>
            <Link to="/tv" className={tvMatch ? "on" : ""}>
              Tv
            </Link>
          </Li>
        </Nav>
        <UserInfo
          onMouseOver={
            user
              ? mouseOver
              : () => {
                  return;
                }
          }
          onMouseLeave={
            user
              ? mouseLeave
              : () => {
                  return;
                }
          }
        >
          {user ? (
            <>
              {user?.profileUrl ? (
                <img src={user?.profileUrl} />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="#f9f9f9"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <ProfileMenu ref={profileMenu}>
                <li onClick={() => navigate(`/profile`)}>Profile</li>
                <li
                  onClick={() => {
                    if (location.pathname === "/favorits") return;
                    navigate(`/favorits`);
                  }}
                >
                  Favorits
                </li>
                <li onClick={logout}>Log out</li>
              </ProfileMenu>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </UserInfo>
      </Header>
    </HeaderWrap>
  );
}
