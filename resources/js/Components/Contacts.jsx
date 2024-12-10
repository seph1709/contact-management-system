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

export default Contacts;
