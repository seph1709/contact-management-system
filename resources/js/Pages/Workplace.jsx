import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Board from "../Components/Board";
import Modal from "../Components/Modal";
import { router } from "@inertiajs/react";

export default function Workplace() {
    let startingDataLocal, rawTokenLocal, userIDLocal, userNameLocal;

    startingDataLocal = JSON.parse(localStorage.getItem("startingData"));
    rawTokenLocal = localStorage.getItem("rawToken");
    userIDLocal = localStorage.getItem("userID");
    userNameLocal = localStorage.getItem("userName");

    if (!(startingDataLocal && rawTokenLocal && userIDLocal && userNameLocal)) {
        router.visit("login");
    }

    console.log(startingDataLocal);

    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const { data, setData } = useForm();
    const [token] = useState(rawTokenLocal);

    function handleModalVisibility(value) {
        setData(null);
        setOpenModal(value);
    }

    function handleModalUpdateVisibility(value) {
        setOpenModalUpdate(value);
    }

    function handleSelected(id) {
        startingDataLocal.forEach((v, i) => {
            if (v.id === id) {
                setData(v);
                setOpenModalUpdate(true);
            }
        });
    }

    function requestAndSaveLocalStartingData(user_id) {
        fetch("/api/userdata", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + rawTokenLocal,
            },
            body: JSON.stringify({ userID: user_id }),
        })
            .then((res) => res.json())
            .then((startingData) => {
                console.log(startingData);

                localStorage.setItem(
                    "startingData",
                    JSON.stringify(startingData)
                );
                router.visit("workplace", { preserveScroll: true });
            });
    }

    function handleDeleteItem(index) {
        let isDelete = confirm(
            "Are you sure you want to delete the selected contact?"
        );

        if (!isDelete) {
            return;
        }
        fetch("/api/delete", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ id: index }),
        })
            .then((response) => {
                if (response.status === 200) {
                    requestAndSaveLocalStartingData(userIDLocal);
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            {openModal && (
                <Modal
                    handleModalVisibility={handleModalVisibility}
                    headerText="Add Contact"
                    submitText="submit"
                    token={token}
                    userID={userIDLocal}
                    requestAndSaveLocalStartingData={
                        requestAndSaveLocalStartingData
                    }
                />
            )}
            {openModalUpdate && (
                <Modal
                    handleModalVisibility={handleModalUpdateVisibility}
                    defaultValue={data}
                    headerText="Update Contact"
                    submitText="update"
                    token={token}
                    userID={userIDLocal}
                    requestAndSaveLocalStartingData={
                        requestAndSaveLocalStartingData
                    }
                />
            )}
            <Board
                handleModalVisibility={handleModalVisibility}
                data={startingDataLocal}
                token={token}
                onItemSelected={handleSelected}
                handleDeleteItem={handleDeleteItem}
                startingData={startingDataLocal}
                userID={userIDLocal}
                userName={userNameLocal}
            ></Board>

            {/* <Footer></Footer> */}
        </>
    );
}
