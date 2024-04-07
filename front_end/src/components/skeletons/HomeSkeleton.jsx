import './css/homeSkeleton.css'

const HomeSkeleton = () => {

    const cardNumbers = Array.from({length: 25}, (_, index) => index + 1)


    return (
        <>
            {cardNumbers.map(() => (
                <div className='skeleton-card'>
                    <div className="skeleton-image"></div>
                    <div className='skeleton-card-content'>
                        <div className="skeleton-home-title"></div>
                        <div className="skeleton-paragraph"></div>
                        <div className="skeleton-paragraph"></div>
                        <div className="skeleton-paragraph"></div>
                        <div className="skeleton-paragraph"></div>
                        <div className="skeleton-paragraph"></div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default HomeSkeleton