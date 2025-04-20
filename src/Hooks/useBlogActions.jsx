import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addBlog,
  showAllBlogs,
  updateBlog,
  deleteBlogById,
  deleteBlogsByQuery,
  showBlogById,
} from '../Services/blogServices';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../Contexts/NotificationContext';
export const useAddBlog = () =>{
  const navigate = useNavigate();
  const { TriggerNotification } = useNotification();
  return useMutation({
    mutationFn:addBlog,
    onSuccess:()=>{
      navigate(-1);
      TriggerNotification({
        type:"success",
        message:"Blog Added Successfully"
      });
    }
  })
}
export const useShowAllBlogs = () => {
  return useQuery({
    queryKey:['blogs'],
    queryFn:showAllBlogs
  });
}
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { TriggerNotification } = useNotification();
  return useMutation({
    mutationFn:updateBlog,
    onSuccess:()=>{
      TriggerNotification({
        type:"success",
        message:"Blog Updated Successfully"
      });
      queryClient.invalidateQueries({
        queryKey: ['blogs']
      });
      navigate(-1);

    },
    onError:(error)=>{
      console.log(error);
    }
  })
}
export const useDeleteBlogById = () =>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:deleteBlogById,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey: ['blogs']
      });
    },
    onError:(error)=>{
      console.log(error);
    }
  })
}
export const useDeleteBlogsByQuery = () => useMutation(deleteBlogsByQuery);

export const useGetBlogById = (id) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn:()=> showBlogById(id),
    enabled: !!id,
    select:(data)=> data.data
  });
}
