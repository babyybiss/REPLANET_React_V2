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
        <div className="goToTop-button-style" onClick={goToTop}>
            <i class="fa-solid fa-angle-up"></i>
        </div>
    );
}

export default GoToTopButton;