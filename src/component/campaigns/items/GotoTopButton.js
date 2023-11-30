import { useEffect, useState } from "react";

function GoToTopButton() {
    const [toggleBtn, setToggleBtn] = useState(true);

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleScroll = () => {
        const { scrollY } = window;

        scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <img src="/campaigns/default/topButton.png" className="goToTop-button-style" onClick={goToTop}>
        </img>
    );
}

export default GoToTopButton;