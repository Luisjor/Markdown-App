import React from "react"

export default function Header(props) {

    return(
        <header>
            <button className="menuBtn" onClick={props.showMenu}><i className="fa-solid fa-bars"></i></button>
            <h1>MARKDOWN</h1>
            <hr/>
            <div className="newTitle">
                <p className="docTitle">Document Name:</p>
                <div className="form">
                <input
                    className="input"
                    placeholder="Type your text"
                    type="text"
                    value={props.title}
                    onChange={(e) => {props.updateTitle(e)}}
                    required
                    />
                <span className="input-border"></span>
                </div>
            </div>
            
        </header>
    )
}