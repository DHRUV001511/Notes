document.addEventListener("DOMContentLoaded", function () {
    const createNoteButton = document.getElementById("createNote");
    const notesContainer = document.getElementById("notesContainer");
    const searchBox = document.getElementById("searchBox");

    // Load notes from localStorage
    function loadNotes() {
        notesContainer.innerHTML = "";
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.forEach((note) => {
            addNoteToDOM(note.title, note.content);
        });
    }

    // Save notes to localStorage
    function saveNotes() {
        let notes = [];
        document.querySelectorAll(".note").forEach(note => {
            notes.push({
                title: note.querySelector(".note-title").value,
                content: note.querySelector(".note-content").value
            });
        });
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    // Create a new note
    createNoteButton.addEventListener("click", function () {
        addNoteToDOM("", "");
    });

    // Add note to DOM
    function addNoteToDOM(title, content) {
        const note = document.createElement("div");
        note.classList.add("note", "fade-in");
        note.innerHTML = `
            <input type="text" class="note-title" placeholder="Title" value="${title}"/>
            <textarea class="note-content" placeholder="Write your note...">${content}</textarea>
            <img src="images/delete.png" class="delete" alt="Delete Note"/>
        `;

        note.querySelector(".delete").addEventListener("click", function () {
            note.classList.add("fade-out");
            setTimeout(() => {
                note.remove();
                saveNotes();
            }, 300);
        });

        note.querySelector(".note-title").addEventListener("input", saveNotes);
        note.querySelector(".note-content").addEventListener("input", saveNotes);

        notesContainer.appendChild(note);
        saveNotes();
    }

    // Search functionality
    searchBox.addEventListener("input", function () {
        const searchTerm = searchBox.value.toLowerCase();
        document.querySelectorAll(".note").forEach(note => {
            const title = note.querySelector(".note-title").value.toLowerCase();
            const content = note.querySelector(".note-content").value.toLowerCase();
            note.style.display = title.includes(searchTerm) || content.includes(searchTerm) ? "block" : "none";
        });
    });

    // Load notes on page load
    loadNotes();
});
