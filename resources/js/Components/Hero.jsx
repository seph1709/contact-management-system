import { router } from "@inertiajs/react";
function Hero() {
    return (
        <div id="hero">
            <div id="title-hero-wrapper">
                <div id="title-hero">Contact Management System &#9743; </div>

                <span id="home-option">
                    <button
                        onClick={(_) => {
                            router.visit("login");
                        }}
                    >
                        <div id="try-now">Login</div>
                    </button>
                    <div id="or" style={{ display: "inline" }}>
                        {" "}
                        |
                    </div>
                    <button
                        style={{ display: "inline" }}
                        onClick={(_) => {
                            router.visit("register");
                        }}
                    >
                        <div id="login-now">Register</div>
                    </button>
                </span>
                <div
                    id="about"
                    role="button"
                    onClick={(e) => {
                        router.visit("about");
                    }}
                >
                    about
                </div>
                {/* <svg
                    id="arrow-down-hero"
                    fill="#52b282"
                    height="40px"
                    width="70px"
                    viewBox="0 0 330 330"
                >
                    <path
                        id="XMLID_225_"
                        d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                    />
                </svg> */}
            </div>

            <div id="bg-hero"></div>
        </div>
    );
}

export default Hero;
