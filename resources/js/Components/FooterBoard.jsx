function FooterBoard({ data }) {
    const dateNow = new Date();
    return (
        <div id="footer-desc">
            You have a total of {data.length} contacts as of today{" "}
            {dateNow.toDateString()}.
        </div>
    );
}

export default FooterBoard;
