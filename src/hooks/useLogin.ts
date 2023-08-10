import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import PATH from "../constants/path";

export default function useLogin() {
    const navige = useNavigate();

    // const mutateLogin = useMutation();


    return;
}