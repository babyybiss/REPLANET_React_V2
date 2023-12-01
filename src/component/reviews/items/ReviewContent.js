export function ReviewContent ({ review }) {

    return (
        <div className="my-4" dangerouslySetInnerHTML={{ __html: review.reviewDescription }} />
    );
}