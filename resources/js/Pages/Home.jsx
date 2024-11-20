import { useState } from "react";
import { useForm } from "@inertiajs/react";

const relationshiptStyle = {
    background: "#52B282",
    padding: "3px 6px",
    display: "inline-block",
    color: "#ffffff",
    borderRadius: "20px",
};

const relationshiptWrapperStyle = {
    width: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px 0px 0px 10px",
};

export default function App({ startingData }) {
    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const { delete: destroy, data, setData } = useForm(null);

    function handleModalVisibility(value) {
        setData(null);
        setOpenModal(value);
    }

    function handleModalUpdateVisibility(value) {
        setOpenModalUpdate(value);
    }

    function handleSelected(id) {
        startingData.forEach((v, i) => {
            if (v.id === id) {
                setData(v);
                setOpenModalUpdate(true);
            }
        });
    }

    function handleDeleteItem(index) {
        console.log(index);
        destroy(`/contact/delete/${index}`, { preserveScroll: true });
    }
    return (
        <>
            {openModal && (
                <Modal
                    handleModalVisibility={handleModalVisibility}
                    headerText="Add Contact"
                    submitText="submit"
                />
            )}
            {openModalUpdate && (
                <Modal
                    handleModalVisibility={handleModalUpdateVisibility}
                    defaultValue={data}
                    headerText="Update Contact"
                    submitText="update"
                />
            )}
            <Hero></Hero>
            <Board
                handleModalVisibility={handleModalVisibility}
                data={startingData}
                onItemSelected={handleSelected}
                handleDeleteItem={handleDeleteItem}
            ></Board>
            <FooterBoard data={startingData}></FooterBoard>
            <Footer></Footer>
        </>
    );
}

function Hero() {
    return (
        <div id="hero">
            <div id="title-hero-wrapper">
                <div id="title-hero">Contact Management System &#9743; </div>

                <a href="#main">
                    {" "}
                    <div id="try-now">TRY NOW</div>
                </a>
                <svg
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
                </svg>
            </div>

            <div id="bg-hero"></div>
        </div>
    );
}

function Footer() {
    return (
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
    );
}
function FooterBoard({ data }) {
    const dateNow = new Date();
    return (
        <div id="footer-desc">
            You have a total of {data.length} contacts as of today{" "}
            {dateNow.toDateString()}.
        </div>
    );
}

function Modal({
    handleModalVisibility,
    defaultValue,
    headerText,
    submitText,
}) {
    const empt = {
        name: null,
        lastname: null,
        address: null,
        email: null,
        number: null,
        relationship: "friend",
    };

    const { data, setData, post, put } = useForm(defaultValue ?? empt);
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
            put(`/contact/update/${defaultValue.id}`, {
                preserveScroll: true,
            });
            handleModalVisibility(false);
        } else if (isCompleteData) {
            //for adding data
            post("/contact/add", { preserveScroll: true });
            handleModalVisibility(false);
        } else {
            setShowError(true);
        }
    }
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

function Board({
    handleModalVisibility,
    data,
    onItemSelected,
    handleDeleteItem,
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
        // intercep the data if true then sort to alphabetical
        boardData = sortToAlphabetical();
    }

    return (
        <div id="main">
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

function FormContainer({ children }) {
    return <div id="form-container">{children}</div>;
}

function Search({ onSearchChange }) {
    return (
        <div id="search">
            <label htmlFor="search-input">search</label>
            <input
                id="search-input"
                type="text"
                placeholder="search a name..."
                onChange={(e) => onSearchChange(e.target.value)}
            ></input>
        </div>
    );
}

function SortBy({ onSortChange, value }) {
    return (
        <div id="sort-by-wrapper">
            <div>sort by</div>
            <select
                name="sortBy"
                id="sort-by"
                defaultValue={value}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="default">default</option>
                <option value="alphabetical">alphabetical</option>
            </select>
        </div>
    );
}
function HeaderContacts() {
    return (
        <div id="header-contacts">
            <div style={{ width: "300px" }}>name</div>
            <div style={{ width: "240px" }}>address</div>
            <div style={{ width: "210px" }}>tel. number</div>
            <div style={{ width: "200px" }}>email</div>
            <div>relationship</div>
        </div>
    );
}
function Contacts({ details, onItemSelected, handleDeleteItem }) {
    const { name, lastname, address, number, email, relationship, id } =
        details;

    return (
        <>
            <div id="cell">
                <div style={{ width: "180px" }}>
                    {name} {lastname}
                </div>
                <div style={{ width: "350px" }}>{address}</div>
                <div style={{ width: "130px" }}>{number}</div>
                <div style={{ width: "250px" }}>{email}</div>
                <div style={relationshiptWrapperStyle}>
                    <div style={relationshiptStyle}>{relationship}</div>
                </div>
                <div id="edit" onClick={(e) => onItemSelected(id)}>
                    edit
                </div>
                <div
                    id="delete"
                    onClick={(e) => {
                        handleDeleteItem(id);
                        console.log("selected", details);
                    }}
                >
                    delete
                </div>
            </div>
        </>
    );
}

function AddButton({ setModalVisibility }) {
    return (
        <div className="add-btn-wrapper">
            <div
                role="button"
                id="add-btn"
                onClick={(e) => setModalVisibility(true)}
            >
                add contact +
            </div>
        </div>
    );
}
