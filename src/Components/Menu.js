import React from "react"

export default function Menu(props) {

    const notesTitles = props.notes.map((element) =>
        <div
            className="menuSelect"
            key={element.id}>

            <button
                className="selectNote"
                onClick={() => props.setCurrentNoteId(element.id)}
                key={props.id}>

                <i className="fa-regular fa-file"></i>
                <div className="elementsMenu">
                    <p>{element.date}</p>
                    <p><b>{element.title}</b></p>
                </div>
            </button>

            <button
                className="deleteNote"
                onClick={(event) => props.deleteNote(event, element.id)}>
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
        
            
            
        )

return (
    <section className="menuOpen">
        <h1>MARKDOWN</h1>
        <h2>MY DOCUMENTS</h2>
        <button
        className="newDoc"
        onClick={props.onClick}
        >+ New Document</button>
        <div className="notesMenu">
            {notesTitles}
        </div>
        <div className="themeToggler">
                <label className="switch">
                <input type="checkbox" onClick={props.toggleTheme}/>
                <span className="slider"></span>
                </label>
        </div>
    </section>
)
}