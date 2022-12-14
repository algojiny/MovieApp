import { useState, useRef } from "react";
import styled from "styled-components";
import Loading from "../components/Loading";
import { useUser } from "../util/useUser";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  max-width: 1920px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  margin-top: 100px;
  color: #f9f9f9;
`;

const Main = styled.main`
  position: relative;
  width: 70%;
  margin: 0 auto;
  min-height: 700px;
  height: max-content;
  font-size: 16px;
  line-height: 40px;
  h2 {
    font-size: 32px;
    font-weight: 600;
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: center;
  }
  .imgBtn {
    display: block;
    margin: 20px;
    font-size: 12px;
    color: #333;
    background-color: #f9f9f9;
    line-height: 1;
    padding: 7px;
    cursor: pointer;
    :active {
      transform: scale(0.96);
    }
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 170px;
  margin: 0px auto;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  svg {
    color: #d9d9d9;
    width: 170px;
    height: 170px;
  }
`;
const ImgLabel = styled.label`
  display: block;
  position: absolute;
  top: 120px;
  left: calc(50% - 85px);
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  :hover {
    filter: brightness(0.5);
  }
`;
const ImgInput = styled.input`
  display: none;
`;
const Form = styled.form`
  width: 50%;
  max-width: 500px;
  min-width: 300px;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto 0;
  color: #f9f9f9;

  input {
    width: 100%;
    height: 50px;
    padding: 0px 10px;
    font-size: 16px;
    outline: none;
  }
  em {
    font-size: 12px;
    color: red;
  }
  strong {
    font-size: 12px;
    color: #f9f9f9;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    color: #f9f9f9;
    background-color: #a40000;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin-top: 0px;
    :hover {
      filter: brightness(0.9);
    }
  }
`;
export default function Profile() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [previewUrl, setPreviewUrl] = useState(user?.profileUrl);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const onValid = (form) => {
    const existingUser = user;
    let profileUrl = "";
    if (form.password !== form.checkpassword) {
      return setError("notMatch", {
        type: "custom",
        message: "??????????????? ???????????? ????????????.",
      });
    }
    if (
      form.nickname === existingUser.nickname &&
      form.password === existingUser.password &&
      !previewUrl
    ) {
      return setError("alreadyUse", {
        type: "custom",
        message: "????????? ????????? ????????????.",
      });
    }
    if (!previewUrl) {
      profileUrl = user?.profileUrl;
    } else {
      profileUrl = previewUrl;
    }

    existingUser.nickname = form.nickname;
    existingUser.password = form.password;
    existingUser.profileUrl = profileUrl;
    localStorage.setItem("user", JSON.stringify(existingUser));
    localStorage.setItem("loginUser", JSON.stringify(existingUser));
    navigate("/");
  };

  useEffect(() => {
    setValue("profileImg", user?.profileUrl);
    setValue("nickname", user?.nickname);
    setValue("password", user?.password);
    setValue("checkpassword", user?.password);
  }, [user]);

  const onLoadFile = (e) => {
    clearErrors();
    let reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const fileUrl = reader.result;

      if (fileUrl) {
        setPreviewUrl(fileUrl);
      }
    };
  };

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <Wrapper>
        <Main>
          <h2>?????? ??????</h2>
          <Form onSubmit={handleSubmit(onValid)}>
            <ImgBox
              url={
                previewUrl
                  ? previewUrl
                  : user?.profileUrl
                  ? user?.profileUrl
                  : null
              }
            >
              {!user?.profileUrl && !previewUrl ? (
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
              ) : null}
            </ImgBox>
            <ImgLabel htmlFor="userImg"></ImgLabel>
            <ImgInput
              id="userImg"
              type="file"
              accept="image/*"
              onInput={onLoadFile}
              {...register("profileImg")}
            />
            <span
              onClick={() => {
                setPreviewUrl(null);
              }}
              className="imgBtn"
            >
              ???????????????
            </span>
            <input
              onInput={() => {
                clearErrors();
              }}
              {...register("nickname", {
                required: { value: true, message: "???????????? ???????????????." },
                minLength: {
                  value: 3,
                  message: "???????????? ?????? 3?????? ??????????????? ?????????.",
                },
                maxLength: {
                  value: 12,
                  message: "???????????? ?????? 12????????? ????????? ????????????.",
                },
              })}
              type="text"
              placeholder="?????????"
            />
            {errors?.nickname ? (
              <em>{errors.nickname.message}</em>
            ) : (
              <strong>????????? ???????????? ????????? ?????????.</strong>
            )}
            <input
              onInput={() => {
                clearErrors();
              }}
              {...register("password", {
                required: { value: true, message: "??????????????? ??????????????????." },
                minLength: {
                  value: 6,
                  message: "??????????????? ?????? 6???????????????.",
                },
                maxLength: {
                  value: 18,
                  message: "??????????????? ?????? 18???????????????.",
                },
              })}
              type="password"
              placeholder="?????? ????????????"
            />
            {errors?.password ? (
              <em>{errors.password.message}</em>
            ) : (
              <strong>????????? ??????????????? ????????? ?????????.</strong>
            )}
            <input
              onInput={() => {
                clearErrors();
              }}
              {...register("checkpassword", {
                required: {
                  value: true,
                  message: "???????????? ???????????? ??????????????????.",
                },
                minLength: {
                  value: 6,
                  message: "??????????????? ?????? 6???????????????.",
                },
                maxLength: {
                  value: 18,
                  message: "??????????????? ?????? 18???????????????.",
                },
              })}
              type="password"
              placeholder="???????????? ??????"
            />
            {errors?.checkpassword ? (
              <em>{errors.checkpassword.message}</em>
            ) : (
              <strong>????????? ??????????????? ?????? ??? ??????????????????.</strong>
            )}
            <button>???????????? ????????????</button>
            {errors?.alreadyUse ? (
              <em>{errors.alreadyUse.message}</em>
            ) : (
              <strong></strong>
            )}
          </Form>
        </Main>
      </Wrapper>
    </>
  );
}
