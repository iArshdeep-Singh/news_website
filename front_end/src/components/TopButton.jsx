import './top.css'

const TopButton = () => {

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    return <button id="top" onClick={goToTop}>&#8593;</button>
}


export default TopButton