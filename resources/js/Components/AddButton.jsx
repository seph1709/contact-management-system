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

export default AddButton;
