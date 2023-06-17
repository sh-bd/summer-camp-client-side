import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useInstructor = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem('access-token');

  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ['isInstructor', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`https://summer-camp-server-sh4mim.vercel.app/users/instructor/${user?.email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data.instructor;
    }
  });

  return [isInstructor, isInstructorLoading];
};

export default useInstructor;
