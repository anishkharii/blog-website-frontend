// src/hooks/useUserActions.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
  addUser,
  verifyUser,
  loginUser,
  getAllUsers,
  forgotPasswordStep1,
  forgotPasswordStep2,
  getUser,
  updateUser,
  deleteUser,
  getUserName,
} from '../Services/userServices';
import { setOtpRequired, setUser, updateUser as reduxUpdateUser, setIsAuthLoading } from '../Redux/authSlice';
import { useNotification } from '../Contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useLogin = () => {
  const dispatch = useDispatch();
  const {TriggerNotification} = useNotification();
  const navigate = useNavigate();
  const {mutate:userData} = useGetUser();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role);
      userData({id:data.id, token:data.token}); 
      TriggerNotification({
        type: "success",
        message: data.msg,
        duration: 3500,
      });
      navigate("/");
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();
  const {TriggerNotification} = useNotification();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: addUser,
    onSuccess:(data)=>{
      dispatch(setOtpRequired(true));
      console.log(data)
      navigate("/otp-verification",{state:{from:"signup", id:data.data.id}});
    },
    onError:(error)=>{
      const err = JSON.parse(error.message);
      console.log(err)
      TriggerNotification({
        type: "error",
        message: err.msg,
        duration: 3500,
      });
    }
  })
};
export const useVerifyUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {TriggerNotification} = useNotification();
  return useMutation({
    mutationFn: verifyUser,
    onSuccess: (data) => {
      TriggerNotification({
        type: "success",
        message: data.msg,
        duration: 3500,
      });

      navigate("/login");
    },
    onError: (error) => {
      const err = JSON.parse(error.message);
      console.log(err)
      TriggerNotification({
        type: "error",
        message: err.msg,
        duration: 3500,
      });
    },
  });
}
export const useForgotPasswordStep1 = () => useMutation(forgotPasswordStep1);
export const useForgotPasswordStep2 = () => useMutation(forgotPasswordStep2);
export const useDeleteUser = () => useMutation(deleteUser);

export const useAutoLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: getUser,
    mutationKey: ["user"],
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
  });
}

export const useGetUser = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: getUser,
    mutationKey: ["user"],
    onSuccess: (data) => dispatch(setUser(data)),
  });
};

export const useUpdateUser = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {TriggerNotification} = useNotification();
  return useMutation({
    mutationFn: updateUser,
    onSuccess:(data)=>{
      dispatch(reduxUpdateUser(data.data));  
      TriggerNotification({
        type: "success",
        message: data.msg,
        duration: 3500,
      });
      queryClient.refetchQueries(["user"]);
    },
    onError:(error)=>{
      const err = JSON.parse(error.message);
      console.log(err)
      
    }
  })
};
export const useGetAllUsers = () => useMutation(getAllUsers);
export const useGetUserName = () => useMutation(getUserName);
