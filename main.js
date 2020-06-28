if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


const titleValue = document.querySelector('.title-form')
const noteValue = document.querySelector('.note-form')
const saveButton = document.querySelector('.btn-save')
const noteList = document.querySelector('.main-content')

const total = document.querySelector('#total-notes')


if (saveButton) {
  saveButton.addEventListener("click", addNote);
} else {
  immediateLoadEventListeners();

  function immediateLoadEventListeners() {
    document.addEventListener("DOMContentLoaded", getNotes);
    noteList.addEventListener("click", deleteNote)
  }
  (function countAllNotes() {
    let notes = getItemFromLocalStorage()
    let count = 0
    notes.forEach(note => {
      return count++
    })
    total.innerHTML = `${count} notes`
  })();
}




function addNote(e) {
  e.preventDefault()

  if (titleValue.value && noteValue.value) {
    addNoteToLocalStorage(titleValue.value, noteValue.value)
    titleValue.value = ""
    noteValue.value = ""
    window.location.href = "index.html";
  } else {
    alert("Cannot Empty")
  }
}

function getNotes() {
  let notes = getItemFromLocalStorage()

  notes.forEach(note => {
    createNotesElement(note)
  })
}

function deleteNote(e) {
  e.preventDefault()

  if (e.target.classList.contains("delete-note")) {
    if (confirm("Yakin ingin hapus?")) {
      const parent = e.target.parentElement
      parent.remove()

      deleteNoteInLocalStorage(parent)
    }
  }
}


function createNotesElement(value) {

  const div = document.createElement('div') // note
  const h5 = document.createElement('h5') // note content h5
  const p = document.createElement('p') // note content p
  const img = document.createElement('img') // note img
  const content = document.createElement('div') //note content

  div.className = "note d-flex justify-content-between align-items-start "

  content.className = "content"
  content.style.wordBreak = "break-word"
  h5.textContent = value.title
  p.textContent = value.note
  img.src = "assets/images/trash.png"
  img.className = "delete-note"

  content.appendChild(h5)
  content.appendChild(p)

  div.appendChild(content)
  div.appendChild(img)

  noteList.appendChild(div)
}


// Local Storage Func
function getItemFromLocalStorage() {
  let eventData

  if (localStorage.getItem('eventData') == null) {
    eventData = []
  } else {
    eventData = JSON.parse(localStorage.getItem('eventData'))
  }

  return eventData
}

function addNoteToLocalStorage(title, note) {
  let eventData = getItemFromLocalStorage()
  let details = {}

  details['title'] = title
  details['note'] = note

  eventData.push(details)

  setItemToLocalStorage(eventData)
}

function setItemToLocalStorage(eventData) {
  localStorage.setItem('eventData', JSON.stringify(eventData))
}

function deleteNoteInLocalStorage(noteValue) {
  let notes = getItemFromLocalStorage()
  const deleteNote = noteValue.firstChild.firstChild.textContent

  notes.forEach((note, i) => {
    if (deleteNote === note.title) {
      notes.splice(i, 1)
    }
  })

  setItemToLocalStorage(notes)
}