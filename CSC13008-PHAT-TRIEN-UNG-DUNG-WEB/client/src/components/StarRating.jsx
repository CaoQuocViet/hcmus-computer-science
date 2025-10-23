export default function StarRating({ rating }) {
     return (
        <>
            {Array.from({ length: 5 }, (_, index) => (
                <i
                    key={index}
                    className={`fa fa-star ${index < rating ? "text-warning" : "text-secondary"}`}
                />
            ))}
        </>
    );
}