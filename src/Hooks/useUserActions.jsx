// src/hooks/useUserActions.js
import { useMutation } from '@tanstack/react-query';
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
} from '../services/userServices';
import { setUser } from '../Redux/authSlice';

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setUser(data));
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role);
    },
  });
};

export const useAddUser = () => useMutation(addUser);
export const useVerifyUser = () => useMutation(verifyUser);
export const useForgotPasswordStep1 = () => useMutation(forgotPasswordStep1);
export const useForgotPasswordStep2 = () => useMutation(forgotPasswordStep2);
export const useDeleteUser = () => useMutation(deleteUser);

export const useAutoLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: getUser,
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
  });
}

export const useGetUser = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: getUser,
    onSuccess: (data) => dispatch(setUser(data)),
  });
};

export const useUpdateUser = () => useMutation(updateUser);
export const useGetAllUsers = () => useMutation(getAllUsers);
export const useGetUserName = () => useMutation(getUserName);
