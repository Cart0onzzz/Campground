const Campground=require('../models/campground')
const Review=require('../models/review')
const {isLoggedIn, isAuthor, validateReview}=require('../midddleware')


module.exports.createReview=async (req, res)=>{
    // res.send('Thanks for leaving a review');
    const campground=await Campground.findById(req.params.id);
    const review=new Review(req.body.review)
    review.author=req.user._id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'Added your review, thanks !')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview=async(req, res)=>{
    const { id, reviewId }=req.params;
    await Campground.findByIdAndUpdate(id, {$pull:{reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review Deleted ')
    res.redirect(`/campgrounds/${id}`)
}