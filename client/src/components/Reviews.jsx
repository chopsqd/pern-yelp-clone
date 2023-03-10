import React from 'react';
import {StarRating} from "./index";

const Reviews = ({reviews}) => {
    return (
        <div className={"row row-cols-3 my-3 d-flex justify-content-between flex-nowrap"}
             style={reviews?.length >= 3 ? {overflowX: 'scroll', overflowY: 'hidden'} : {}}>
            {reviews && reviews.map(review =>
                <div className="card text-white bg-primary mb-3" style={{maxWidth: "30%", marginRight: 55}}
                     key={review.id}>
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