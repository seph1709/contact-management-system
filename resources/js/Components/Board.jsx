import { useState } from "react";
import FormContainer from "./FormContainer";
import SortBy from "../Components/Sortby";
import Search from "../Components/Search";
import AddButton from "../Components/AddButton";
import HeaderContacts from "../Components/HeaderContacts";
import Contacts from "../Components/Contacts";
import Modal from "../Components/Modal";
import FooterBoard from "../Components/FooterBoard";
import { router } from "@inertiajs/react";
import { IoLogOut } from "react-icons/io5";

function Board({
    handleModalVisibility,
    data,
    onItemSelected,
    handleDeleteItem,
    startingData,
    userID,
    token,
    userName,
}) {
    let boardData = data;

    const [sortBy, setSortBy] = useState("default");
    const [searchInput, setSearchInput] = useState("");

    function sortToAlphabetical() {
        const sorted = [...boardData].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        console.log(sorted);

        return sorted;
    }

    function handleSortBy(value) {
        console.log(value);
        setSortBy(value);
    }

    function handleSearch(value) {
        setSearchInput(value);
    }

    if (searchInput) {
        //intercept the data if the searching is true then sort it base on searching input
        const filterdData = [...boardData].filter((v) =>
            (v.name + v.lastname).toLowerCase().includes(searchInput)
        );
        boardData = filterdData;
    }

    if (sortBy === "alphabetical") {
        // intercept the data if true then sort to alphabetical
        boardData = sortToAlphabetical();
    }

    function logout() {
        fetch("/api/logout", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ userID: userID }),
        })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem("rawToken");
                    localStorage.removeItem("userID");
                    localStorage.removeItem("userName");
                    localStorage.removeItem("startingData");
                    router.visit("/");
                }
            })
            .catch((error) => console.error(error));
    }

    console.log(userID, token);

    return (
        <div id="main">
            <div id="workplace-header">
                <div id="workplace-welcome">Welcome, {userName}!</div>
                <div
                    role="button"
                    id="workplace-logout"
                    onClick={logout}
                    style={{ display: "inline" }}
                >
                    logout <IoLogOut size={20} style={{ display: "inline" }} />
                </div>
            </div>
            <FormContainer>
                <Search onSearchChange={handleSearch} />
                <SortBy onSortChange={handleSortBy} value={sortBy} />
                <AddButton setModalVisibility={handleModalVisibility} />
            </FormContainer>
            <BoardBody
                data={boardData}
                boardData
                onItemSelected={onItemSelected}
                handleDeleteItem={handleDeleteItem}
            />
            <FooterBoard data={startingData}></FooterBoard>
        </div>
    );
}

function BoardBody({ data, onItemSelected, handleDeleteItem }) {
    return (
        <div id="board-body">
            <div style={{ display: "inline-block" }}>
                <HeaderContacts />
                <div id="cells-container">
                    {data.map((details, i) => (
                        <Contacts
                            details={details}
                            key={i}
                            onItemSelected={onItemSelected}
                            handleDeleteItem={handleDeleteItem}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Board;
