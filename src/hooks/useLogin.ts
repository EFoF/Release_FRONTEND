import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import PATH from "../constants/path";

export default function useLogin() {
    const navigate = useNavigate();

    const mutateLogin = useMutation(["login"], login, {
        onSuccess: (data) => {
            console.log("로그인 성공 ", data.headers.authorization)        
          localStorage.setItem("accessToken", data.headers.authorization);
          navigate(`${PATH.HOME}`);
        },
        onError: ({
          response: {
            data: { errorCode, message },
          },
        }) => {
        //   toastMsg(`${errorCode} / ${message}`);
            console.log(`${errorCode} / ${message}`)
        },
      });


    return {
        mutateLogin,
    };
}