import { FaGithub } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { router } from "@inertiajs/react";
function Footer() {
    return (
        <div>
            <div id="back-btn-wrapper">
                <div
                    role="button"
                    id="back-btn"
                    onClick={(_) => {
                        router.visit(`/`);
                    }}
                >
                    <RiArrowGoBackFill size={40} />
                </div>
            </div>

            <div id="footer">
                <div id="footer-title">
                    <div id="footer-group-name"> Group 2</div>
                    <div id="footer-course">Course: Software Design</div>
                    <div id="footer-teacher">Teacher: Glen Paul D. Choco</div>
                </div>
                <div id="group">
                    <div>
                        <div>Leader:</div>
                        <div id="member">Joseph Maynite</div>
                    </div>
                    <div>
                        <div>Members:</div>
                        <div id="member">Jihad Mangaruma</div>
                        <div id="member">Jermain Villasanta</div>
                        <div id="member">Tim Kelly Espiritu</div>
                        <div id="member">Nataniel Valencia</div>
                    </div>
                </div>
            </div>

            <div id="footer-about">
                <a href="https://github.com/seph1709" target="_blank">
                    <FaGithub size={35} color="white" />
                </a>
                <a href="https://github.com/seph1709" target="_blank">
                    seph1709
                </a>
            </div>
        </div>
    );
}

export default Footer;
