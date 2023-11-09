export function ReviewContent ({review}) {

    return (
        <div dangerouslySetInnerHTML={{ __html: review.reviewDescription }} />
    );
}