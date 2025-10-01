import Loader from "../../Common/Loader";
import { ReveiwSummary } from "./ReveiwSummary";
import { ReveiwsDisplay } from "./ReveiwsDisplay";
import { AddReveiwForm } from "./AddReveiwForm";
import useReveiwHooks from "../../../hooks/ProductHooks/useReveiwHooks";



export const Review = ({ item, calculateAverageRating}) => {
 const { 
    getRatingDistribution,handleAddReview,writeReview,showReviewForm,loading,setNewReview,newReview,reviews,setShowReviewForm
} = useReveiwHooks({item});
if(loading) return <Loader/>
  return (
    <div>
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
          {!writeReview && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Write Review
            </button>
          )}
        </div>

        {/* Review Summary */}
     <ReveiwSummary getRatingDistribution={getRatingDistribution} reviews={reviews}  calculateAverageRating={calculateAverageRating}/>

        {/* Add Review Form */}
        {showReviewForm && (
          <AddReveiwForm handleAddReview={handleAddReview} setNewReview={setNewReview} setShowReviewForm={setShowReviewForm} newReview={newReview}/>
        )}
        {/*reveiw display*/}
        <ReveiwsDisplay reviews={reviews}/>
      </div>
    </div>
  );
};
