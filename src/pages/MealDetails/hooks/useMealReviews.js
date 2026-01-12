import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const useMealReviews = (id) => {
    const axiosPublic = useAxiosPublic();

    return useQuery({
        queryKey: ["reviews", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews/id/${id}`);
            return res.data.data;
        },
    });
};

export default useMealReviews;
