import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { useState } from "react";
import { IoLogIn } from "react-icons/io5";

export default function Login() {
    const { get, data, setData, errors } = useForm();
    const [errorMessage, setErrorMessage] = useState();
    function handleSubmit(e) {
        e.preventDefault();
        fetch("/api/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                console.log(response);
                if (response.status !== 200) {
                    setErrorMessage(response.statusText);
                }

                return response.json();
            })
            .then((dataRaw) => {
                const { token: rawToken, user, startingData } = dataRaw;
                const { name } = user;
                const { id } = user;

                console.log(id);
                console.log(dataRaw);
                console.log(name);
                console.log(startingData);

                localStorage.setItem(
                    "startingData",
                    JSON.stringify(startingData)
                );
                localStorage.setItem("userName", name);
                localStorage.setItem("rawToken", rawToken);
                localStorage.setItem("userID", id);
                // localStorage.setItem("startingData", startingData);

                router.visit(`workplace`);
            })
            .catch((error) => {
                setErrorMessage("wrong email or password.");
            });

        console.log(data);
    }
    return (
        <div id="login-wrapper">
            <div id="bg-register">
                <div id="register-container">
                    <div id="register-header">Login</div>
                    <form onSubmit={handleSubmit}>
                        <div id="register-body">
                            <div>
                                <label htmlFor="email">
                                    email{" "}
                                    <span>
                                        <HiOutlineMail
                                            size={17}
                                            style={{
                                                display: "inline",
                                                color: "#444444",
                                            }}
                                        />
                                    </span>
                                </label>
                                <input
                                    name="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="password">
                                    password{" "}
                                    <span>
                                        <RiLockPasswordLine
                                            size={17}
                                            style={{
                                                display: "inline",
                                                color: "#444444",
                                            }}
                                        />
                                    </span>
                                </label>
                                <input
                                    name="password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    type="password"
                                ></input>
                            </div>
                            {errorMessage && (
                                <div style={{ color: "red" }}>
                                    {errorMessage}
                                </div>
                            )}
                            <div id="btn-container">
                                <button type="submit" id="submit-register">
                                    submit
                                </button>
                            </div>
                            <div
                                role="button"
                                id="register-text"
                                onClick={(_) => {
                                    router.visit("register");
                                }}
                            >
                                register
                            </div>
                        </div>
                        {/* <button type="submit" id="register-footer"></button> */}
                    </form>
                </div>
            </div>
            <div id="login-img">
                <div id="login-notice">
                    Please{" "}
                    <div style={{ display: "block" }}>
                        <span style={{ display: "inline" }}>
                            login
                            <IoLogIn size={70} style={{ display: "inline" }} />
                        </span>
                    </div>{" "}
                    to continue.
                </div>
            </div>
        </div>
    );
}