import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

function Modal({
    handleModalVisibility,
    defaultValue,
    headerText,
    submitText,
    token,
    userID,
    requestAndSaveLocalStartingData,
}) {
    const empt = {
        name: null,
        lastname: null,
        address: null,
        email: null,
        number: null,
        relationship: "friend",
    };

    const { data, setData, put } = useForm(defaultValue ?? empt);
    const [showError, setShowError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        const isCompleteData =
            data.name &&
            data.lastname &&
            data.address &&
            data.email &&
            data.number &&
            data.relationship;

        console.log(data);

        if (defaultValue && isCompleteData) {
            // for updating data
            fetch("/api/update", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({ id: defaultValue.id, ...data }),
            })
                .then((response) => {
                    requestAndSaveLocalStartingData(userID);
                })
                .catch((error) => console.error(error));
            handleModalVisibility(false);
        } else if (isCompleteData) {
            //for adding data

            fetch("/api/add", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({ userID: userID, ...data }),
            })
                .then((response) => {
                    if (response.status === 200) {
                        requestAndSaveLocalStartingData(userID);
                    }
                })
                .catch((error) => console.error(error));

            handleModalVisibility(false);
        } else {
            setShowError(true);
        }
    }

    console.log(userID);

    return (
        <div id="modal-background">
            <form onSubmit={handleSubmit}>
                <div id="modal-container">
                    <ModalHeader
                        handleModalVisibility={handleModalVisibility}
                        headerText={headerText}
                    />
                    <div id="modal-body">
                        <div>
                            <label htmlFor="first-name">first name</label>
                            <input
                                name="first-name"
                                type="text"
                                placeholder="Juan"
                                defaultValue={data.name}
                                onChange={(e) => {
                                    setData("name", e.target.value);
                                }}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="last-name">last name</label>
                            <input
                                name="last-name"
                                type="text"
                                placeholder="Dela cruz"
                                defaultValue={data.lastname}
                                onChange={(e) => {
                                    setData("lastname", e.target.value);
                                }}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="address">address</label>
                            <input
                                name="address"
                                type="text"
                                placeholder="#17 Sampaloc Street..."
                                defaultValue={data.address}
                                onChange={(e) => {
                                    setData("address", e.target.value);
                                }}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="email">email</label>
                            <input
                                name="email"
                                type="text"
                                placeholder="juan123@gmail.com"
                                defaultValue={data.email}
                                onChange={(e) => {
                                    setData("email", e.target.value);
                                }}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="tel">phone number</label>
                            <input
                                name="tel"
                                type="number"
                                placeholder="+63123456789"
                                defaultValue={data.number}
                                onChange={(e) => {
                                    setData("number", e.target.value);
                                }}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="relationship">relationship</label>
                            <select
                                name="relationship"
                                defaultValue={data.relationship}
                                onChange={(e) => {
                                    setData("relationship", e.target.value);
                                }}
                            >
                                <option value="friend">friend</option>
                                <option value="family">family</option>
                                <option value="classmate">classmate</option>
                                <option value="neighboor">neighboor</option>
                                <option value="teacher">teacher</option>
                            </select>
                        </div>
                        {showError && (
                            <div id="error" style={{ color: "red" }}>
                                please complete the form.
                            </div>
                        )}
                    </div>
                    <ModalFooter
                        handleModalVisibility={handleModalVisibility}
                        submitText={submitText}
                    />
                </div>
            </form>
        </div>
    );
}

function ModalHeader({ handleModalVisibility, headerText }) {
    return (
        <>
            <div id="close-modal-wrapper">
                {" "}
                <div
                    id="close-modal"
                    onClick={(e) => handleModalVisibility(false)}
                >
                    &#10005;
                </div>
            </div>
            <div id="modal-header">{headerText}</div>
        </>
    );
}

function ModalFooter({ handleModalVisibility, submitText }) {
    return (
        <div id="modal-footer">
            <button
                id="btn-cancle"
                onClick={(e) => handleModalVisibility(false)}
            >
                cancel
            </button>
            <button type="submit" id="btn-submit">
                {submitText}
            </button>
        </div>
    );
}

export default Modal;
