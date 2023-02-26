import React from 'react';

const StarRating = ({rating}) => {
    const stars = []

    for(let i = 1; i <= 5; i++) {
        if( i <= rating) {
            stars.push(<i key={i} className={"fas fa-star"}/>)
        }
        else if( i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<i key={i} className={"fas fa-star-half-alt"}/>)
        }
        else {
            stars.push(<i key={i} className={"far fa-star"}/>)
        }
    }

    return (
        <>
            {stars}
        </>
    );
};

export default StarRating;