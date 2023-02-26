import React from 'react';
import StarRating from "./StarRating";

const Reviews = ({reviews}) => {
    return (
        <div className={"row row-cols-3 my-3 d-flex justify-content-between"}>
            {reviews && reviews.map(review =>
                <div className="card text-white bg-primary mb-3" style={{maxWidth: "30%"}} key={review.id}>
                    <div className="card-header d-flex justify-content-between">
                        <span>{review.name}</span>
                        <span><StarRating rating={review.rating}/></span>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{review.review}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;