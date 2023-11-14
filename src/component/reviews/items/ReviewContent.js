export function ReviewContent ({review}) {

    return (
        <div className="my-3" dangerouslySetInnerHTML={{ __html: review.reviewDescription }} />
    );
}