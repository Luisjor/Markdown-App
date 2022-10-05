import React from "react";
import ReactMarkdown from 'react-markdown'
import Header from "./Components/Header"
import Menu from "./Components/Menu"
import remarkGfm from 'remark-gfm'
import { nanoid } from 'nanoid'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./App.css";

export default function App() {
  const [showMenu, setShowMenu] = React.useState(false)
  const [showInput, setShowInput] = React.useState(true)
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
)
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )
  const [entryData, setEntryData] = React.useState("")

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  React.useEffect(() => {
    fetch('https://raw.githubusercontent.com/Luisjor/Markdown-App/main/src/Components/TextArea.js')
      .then(r => r.text())
      .then(text => setEntryData(text))
  }, [])

  function newNote() {
    var today = new Date()
    const newNote = {
      id:nanoid(),
      key:nanoid(),
      date: today.toLocaleDateString("en-US"),
      title: "untitled-doc.md",
      body: entryData
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(event) {
    setNotes(oldNotes => {
      const newArray = []
      for(let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i]
        if(oldNote.id === currentNoteId) {
            newArray.unshift({ ...oldNote, body: event.target.value })
        } else {
            newArray.push(oldNote)
        }
    }
    return newArray
})
}

  function updateTitle(event) {
    setNotes(oldNotes => oldNotes.map(oldNote => {
        return oldNote.id === currentNoteId
            ? { ...oldNote, title: event.target.value }
            : oldNote
    }))
  }

  function findCurrentNote() {
      return notes.find(note => {
          return note.id === currentNoteId
      }) || notes[0]
  }

  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
  }

  function menu() {
    setShowMenu(oldValue => !oldValue)
  }

  function showmarkdown() {
    setShowInput(oldValue => !oldValue)
  }

  return (
    <>        
      {(showMenu || notes.length === 0) &&
        <Menu
          onClick={newNote}
          notes={notes}
          deleteNote={deleteNote}
          setCurrentNoteId={setCurrentNoteId}/>}

      {notes.length > 0 ?
      <main>
        <Header
          showMenu={menu}
          title={findCurrentNote().title}
          updateTitle={updateTitle}
          />

        <section className="main">
        
            {showInput &&
            <section className='markdownInput'>
              <div className='sectionTitle'>
                <h2>MARKDOWN</h2>
              </div>
              <textarea
                    autoFocus
                    className="textInput"
                    value={findCurrentNote().body}
                    onChange={updateNote}
                />
            </section>}

            <section className='markdownResult'>
              <div className='sectionTitle'>
                <h2>PREVIEW</h2>
                <button
                  className='expandPreview'
                  onClick={showmarkdown}><i className="fa-solid fa-up-right-and-down-left-from-center"></i></button>
              </div>
              <div className='textOutput'>

              
              <ReactMarkdown
                children={findCurrentNote().body}
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={atomDark} // theme
                        showLineNumbers={true}
                        wrapLines={true}
                        PreTag='section' // parent tag
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              />


              </div>
            </section>

        </section>
      </main>
      :
      ""
}
  </>
  );
}

