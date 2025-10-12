import { useEffect, useState } from "react";
import { useCheckUserQuery } from "../../services/user/userApi";
import { usePostReviewMutation } from "../../services/user/productApi";

function useReveiwHooks({item}) {
  
    const {data:user} = useCheckUserQuery();
     const [reviews,_] = useState(item.reviews ?? []);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });
  const[addReveiw] =   usePostReviewMutation()
  const [writeReview, setwriteReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setloading] = useState(false);
  
   useEffect(() => {
    if (user && reviews.some((review) => review.user._id === user.id)) {
      setwriteReview(true);
    }
  }, [reviews, user]);

  const handleAddReview = async () => {
    if (newReview.comment.trim()) {
      setloading(true);
    await addReveiw({
        id: item._id,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      setwriteReview(true);
      setNewReview({ rating: 5, comment: "" });
      setShowReviewForm(false);
      setloading(false)
    }
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating]++;
    });
    return distribution;
  };
  return{
    getRatingDistribution,handleAddReview,writeReview,showReviewForm,loading,setNewReview,newReview,reviews,setShowReviewForm
  }
}
export default useReveiwHooks;