import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const useMealDetails = (id) => {
    const axiosPublic = useAxiosPublic();

    return useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals/id/${id}`);
            return res.data.data;
        },
    });
};

export default useMealDetails;
