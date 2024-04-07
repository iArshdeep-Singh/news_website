import './css/readSkeleton.css'

const ReadMoreSkeleton = () => {

    const cardNumbers = Array.from({length: 13}, (_, index) => index + 1)

    return (
        <>
            <div id="skeleton-image"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-title" id="last-title"></div>
            <div className="skeleton-article" id="first-article"></div>
            <div className="skeleton-article" id="second-article"></div>
            <div className="skeleton-article" id="third-article"></div>
            <div className="skeleton-article" id="fourth-article"></div>

            {cardNumbers.map(() => (
                <div className="skeleton-article"></div>
            ))}
        </>
    )
}


export default ReadMoreSkeleton