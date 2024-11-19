import { useState } from "react";



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
  margin: "0px 0px 0px 10px"
}


let rawData = [
  {
    name: "Joseph",
    lastname: "Maynite",
    relationship: "friend",
    address: "#17 Rosal Street Katipunan Vill. Taguig City.",
    number: "09123456789",
    email: "josephmaynite99@gmail.com",
  },
  {
    name: "Tim Kelly",
    lastname: "Espiritu",
    relationship: "classmate",
    address: "#45 Bayabas Street, Manila City.",
    number: "09234567890",
    email: "timmyEspiritu11@gmail.com",
  },
  {
    name: "Jethrick",
    lastname: "Guareno",
    relationship: "classmate",
    address: "#55 Kamatis Street, Bohol City.",
    number: "09234567890",
    email: "jethrickguareno@gmail.com",
  },
  {
    name: "Jihad",
    lastname: "Mangaruma",
    relationship: "classmate",
    address: "#9 Luna Street, Manila City.",
    number: "09345678901",
    email: "jihad.mangaruma.coi@pcu.edu.ph",
  },
  {
    name: "Anna",
    lastname: "Reyes",
    relationship: "neighbor",
    address: "#123 Bluebird Street, Quezon City.",
    number: "09456789012",
    email: "anna.reyes@yahoo.com",
  },
  {
    name: "David",
    lastname: "Smith",
    relationship: "friend",
    address: "#88 Pine Road, Mandaluyong City.",
    number: "09567890123",
    email: "david.smith@schoolmail.edu",
  },
  {
    name: "Sophie",
    lastname: "Garcia",
    relationship: "teacher",
    address: "#33 Redwood Avenue, San Juan City.",
    number: "09678901234",
    email: "sophie.garcia@gmail.com",
  }
];

export default function App() {
  const [openModal, setOpenModal] = useState(false)
  const [openModalUpdate, setOpenModalUpdate] = useState(false)
  const [data, setData] = useState([...rawData])
  const [itemSelected, setItemSelected] = useState(null);
  let indexItemToUpdate;

  function handleModalVisibility(value) {

    if (openModalUpdate) {
      setOpenModalUpdate(value)
    }
    else {
      setOpenModal(value);
    }
  }

  function handleAddData(addedData) {
    if (itemSelected) {
      const updatedData = [...data].map((v, i) => {
        if (v === itemSelected) {
          return addedData;
        } else {
          return v;
        }
      });
      console.log("itemslected");
      setItemSelected(null);
      rawData = [...updatedData];
      setData(updatedData)

    } else {
      rawData = [addedData, ...rawData];
      setData((d) => [addedData, ...d])
      console.log("added");

    }
  }


  function handleSelected(index) {
    indexItemToUpdate = index
    const removedItemToUpdate = [...data][indexItemToUpdate];
    setItemSelected(removedItemToUpdate);
    setOpenModalUpdate(true);
  }

  function handleUpdateData(newData) {
    setData(newData);
  }


  function handleDeleteItem(index) {
    const newUpdatedData = [...data].filter((v, i) => !(i === index))
    rawData = newUpdatedData;
    setData(rawData);
  }
  return (
    <>
      {openModal && <Modal handleModalVisibility={handleModalVisibility} onUpdateData={handleAddData} headerText="Add Contact" submitText="submit" />}
      {openModalUpdate && <Modal handleModalVisibility={handleModalVisibility} onUpdateData={handleAddData} defaultValue={itemSelected} headerText="Update Contact" submitText="update" />}
      <Hero></Hero>
      <Board handleModalVisibility={handleModalVisibility} data={data} handleUpdateData={handleUpdateData} onItemSelected={handleSelected} handleDeleteItem={handleDeleteItem}></Board >
      <FooterBoard data={data}></FooterBoard>
      <Footer></Footer>
    </>
  );
}


function Hero() {
  return <div id="hero">
    <div id="title-hero-wrapper">
      <div id="title-hero">Contact Management System &#9743;  </div>

      <a href="#main"> <div id="try-now" >TRY NOW</div></a>
      <svg id="arrow-down-hero" fill="#52b282" height="40px" width="70px" viewBox="0 0 330 330">
          <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
        </svg>
      </div>
   
    <div id="bg-hero">

    </div>

  </div>
}

function Footer() {
  return <div id="footer">
    <div id="footer-title">
      <div id="footer-group-name"> Group 2</div>
      <div id="footer-course">Course: Software Design</div>
      <div id="footer-teacher">Teacher: Glen Paul D. Choco</div>
    </div>
    <div id="group">
      <div><div>Leader:</div>
        <div id="member">Joseph Maynite</div></div>
      <div>
        <div>Members:</div>
        <div id="member">Jihad Mangaruma</div>
        <div id="member">Jermain Villasanta</div>
        <div id="member">Tim Kelly Espiritu</div>
        <div id="member">Nataniel Valencia</div>
      </div>
    </div>
  </div>
}
function FooterBoard({ data }) {
  const dateNow = new Date();
  return <div id="footer-desc">You have a total of {data.length} contacts as of today {dateNow.toDateString()}.</div>
}

function Modal({ handleModalVisibility, onUpdateData, defaultValue, headerText, submitText }) {

  const empt = { name: "", lastname: "", address: "", email: "", number: "", relationship: "friend" };


  let { name, lastname, address, email, number, relationship = "friend" } = defaultValue ?? empt;



  function handleSubmit(e) {
    e.preventDefault();
    if (name && lastname && address && email && number && relationship) {
      onUpdateData({ name, lastname, address, email, number, relationship })
      handleModalVisibility(false);
    }

  }
  return <div id="modal-background">
    <form onSubmit={handleSubmit}>
      <div id="modal-container">
        <ModalHeader handleModalVisibility={handleModalVisibility} headerText={headerText} />
        <div id="modal-body">
          <div> <label htmlFor="first-name">first name</label>
            <input name="first-name" type="text" placeholder="Juan" defaultValue={name} onChange={(e) => name = e.target.value}></input></div>
          <div><label htmlFor="last-name">last name</label>
            <input name="last-name" type="text" placeholder="Dela cruz" defaultValue={lastname} onChange={(e) => lastname = e.target.value}></input></div>
          <div><label htmlFor="address">address</label>
            <input name="address" type="text" placeholder="#17 Sampaloc Street..." defaultValue={address} onChange={(e) => address = e.target.value}></input></div>
          <div> <label htmlFor="email">email</label>
            <input name="email" type="text" placeholder="juan123@gmail.com" defaultValue={email} onChange={(e) => email = e.target.value}></input></div>
          <div> <label htmlFor="tel">phone number</label>
            <input name="tel" type="number" placeholder="+63123456789" defaultValue={number} onChange={(e) => number = e.target.value}></input></div>
          <div> <label htmlFor="relationship" >relationship</label>
            <select name="relationship" defaultValue={relationship} onChange={(e) => relationship = e.target.value}>
              <option value="friend">friend</option>
              <option value="family">family</option>
              <option value="classmate">classmate</option>
              <option value="neighboor">neighboor</option>
              <option value="teacher">teacher</option>
            </select></div>
        </div>
        <ModalFooter handleModalVisibility={handleModalVisibility} submitText={submitText} />
      </div>
    </form>
  </div>
}

function ModalHeader({ handleModalVisibility, headerText }) {
  return <>
    <div id="close-modal-wrapper"> <div id="close-modal" onClick={(e) => handleModalVisibility(false)}>&#10005;</div></div>
    <div id="modal-header">{headerText}</div></>
}

function ModalFooter({ handleModalVisibility, submitText }) {
  return <div id="modal-footer">
    <button id="btn-cancle" onClick={(e) => handleModalVisibility(false)}>cancel</button>
    <button type="submit" id="btn-submit">{submitText}</button>
  </div>
}

function Board({ handleModalVisibility, data, handleUpdateData, onItemSelected, handleDeleteItem }) {
  const [sortBy, setSortBy] = useState("default")




  function sortToAlphabetical() {
    const sorted = [...rawData].sort((a, b) => a.name.localeCompare(b.name));
    console.log(sorted);
    return sorted;

  }

  function handleSortBy(value) {
    console.log(value)
    const sorted = sortedData(value);
    setSortBy(value);
    handleUpdateData(sorted)


  }

  function sortedData(value) {
    return value === "default" ? [...rawData] : sortToAlphabetical()
  }

  function handleSearch(value) {
    const filterdData = value.toString() !== "" ? [...data].filter((v) => (v.name + v.lastname).toLowerCase().includes(value)) : rawData;
    console.log(filterdData);
    handleUpdateData(filterdData)
  }

  return (
    <div id="main">
      <FormContainer>
        <Search onSearchChange={handleSearch} />
        <SortBy onSortChange={handleSortBy} value={sortBy} />
        <AddButton setModalVisibility={handleModalVisibility} />
      </FormContainer>
      <BoardBody data={data} onItemSelected={onItemSelected} handleDeleteItem={handleDeleteItem} />
    </div>
  );
}



function BoardBody({ data, onItemSelected, handleDeleteItem }) {
  return <div id="board-body">
    <div style={{ display: "inline-block" }}>
      <HeaderContacts />
      <div id="cells-container">
        {data.map((details, i) => (
          <Contacts details={details} key={i} index={i} onItemSelected={onItemSelected} handleDeleteItem={handleDeleteItem} />
        ))}
      </div>
    </div>
  </div>
}

function FormContainer({ children }) {
  return <div id="form-container">
    {children}
  </div>
}

function Search({ onSearchChange }) {


  return <div id="search"><label htmlFor="search-input">search</label><input id="search-input" type="text" placeholder="search a name..." onChange={(e) => onSearchChange(e.target.value)}></input></div>
}

function SortBy({ onSortChange, value }) {

  return <div id="sort-by-wrapper">
    <div>sort by</div>
    <select name="sortBy" id="sort-by" defaultValue={value} onChange={(e) => onSortChange(e.target.value)}>
      <option value="default">default</option>
      <option value="alphabetical">alphabetical</option>
    </select>
  </div>
}
function HeaderContacts() {
  return (
    <div id="header-contacts">
      <div style={{ width: "300px" }}>name</div>
      <div style={{ width: "240px" }}>address</div>
      <div style={{ width: "210px" }}>tel. number</div>
      <div style={{ width: "200px" }}>email</div>
      <div >relationship</div>
    </div>
  );
}
function Contacts({ details, onItemSelected, index, handleDeleteItem }) {


  const { name, lastname, address, number, email, relationship } = details;

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
        <div id="edit" onClick={(e) => onItemSelected(index)}>edit</div>
        <div id="delete" onClick={(e) => handleDeleteItem(index)}>delete</div>
      </div>
    </>
  );
}

function AddButton({ setModalVisibility }) {
  return <div className="add-btn-wrapper">
    <div role="button" id="add-btn" onClick={(e) => setModalVisibility(true)}>add contact +</div>
  </div>
}


