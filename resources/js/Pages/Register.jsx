import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { IoMdPersonAdd } from "react-icons/io";
import { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
export default function Register() {
    const { get, data, setData, errors } = useForm();
    const [errorMessage, setErrorMessage] = useState();

    function loginUser() {
        fetch("/api/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((dataRaw) => {
                const { token: rawToken, user } = dataRaw;
                const { name } = user;
                const { id } = user;

                router.visit(`workplace`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + rawToken,
                    },
                    data: {
                        rawToken: rawToken,
                        userID: id,
                        userName: name,
                    },
                });
            })
            .catch((error) => console.error(error));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e);

        // post("/api/register", { preserveScroll: true });
        fetch("/api/register", {
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
                } else {
                    loginUser();
                }
            })
            .catch((error) => {
                setErrorMessage("error occur");
            });
        console.log(data);
        console.log(errors);
    }
    return (
        <div id="login-wrapper">
            <div id="bg-register">
                <div id="register-container">
                    <div id="register-header">
                        Register{"  "}
                        <span>
                            <IoMdPersonAdd
                                size={22}
                                style={{ display: "inline" }}
                            />
                        </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div id="register-body">
                            <div>
                                <label htmlFor="username">username</label>
                                <input
                                    name="username"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input
                                    name="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input
                                    name="password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="confirm-password">
                                    confirm password
                                </label>
                                <input
                                    name="confirm-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                ></input>
                            </div>
                            {errorMessage && (
                                <div style={{ color: "red", fontSize: "14px" }}>
                                    {errorMessage}
                                </div>
                            )}
                            <div id="submit-register-wrapper">
                                <button role="button" id="submit-register">
                                    submit
                                </button>
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
                            register{" "}
                            <FaPenToSquare
                                size={55}
                                style={{ display: "inline" }}
                            />
                        </span>
                    </div>{" "}
                    to continue.
                </div>
            </div>
        </div>
    );
}
