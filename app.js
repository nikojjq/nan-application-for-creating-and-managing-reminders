// Функция для загрузки напоминаний
document.getElementById("reminderForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const reminderText = document.getElementById("reminderText").value;
    const reminderDate = document.getElementById("reminderDate").value;

    // Получение существующих напоминаний из локального хранилища
    const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.push({ text: reminderText, date: reminderDate }); // Добавление нового напоминания

    // Сохранение обновленного массива напоминаний в локальном хранилище
    localStorage.setItem("reminders", JSON.stringify(reminders));
    document.getElementById("reminderText").value = ""; // Очистка поля ввода
    document.getElementById("reminderDate").value = "";
    loadReminders(); // Перезагрузка списка напоминаний
});

// Функция для загрузки напоминаний из локального хранилища
function loadReminders() {
    const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    const reminderItems = document.getElementById("reminderItems");
    reminderItems.innerHTML = ""; // Очистка текущего списка напоминаний

    // Создание элементов для каждого напоминания
    reminders.forEach((reminder, index) => {
        const reminderItem = document.createElement("div");
        reminderItem.innerHTML = `
            <p>${reminder.text} - <strong>${new Date(reminder.date).toLocaleString()}</strong></p>
            <button onclick="deleteReminder(${index})"><i class="fas fa-trash"></i> Удалить</button>
        `;
        reminderItems.appendChild(reminderItem);
    });
}

// Функция для удаления напоминания
function deleteReminder(index) {
    const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.splice(index, 1); // Удаление напоминания
    localStorage.setItem("reminders", JSON.stringify(reminders));
    loadReminders(); // Перезагрузка списка напоминаний
}

// Заметки
document.getElementById("noteForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const noteText = document.getElementById("noteText").value;

    // Получение существующих заметок из локального хранилища
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText); // Добавление новой заметки

    // Сохранение обновленного массива заметок в локальном хранилище
    localStorage.setItem("notes", JSON.stringify(notes));
    document.getElementById("noteText").value = ""; // Очистка поля ввода
    loadNotes(); // Перезагрузка списка заметок
});

// Функция для загрузки заметок из локального хранилища
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const notesItems = document.getElementById("notesItems");
    notesItems.innerHTML = ""; // Очистка текущего списка заметок

    // Создание элементов для каждой заметки
    notes.forEach((note, index) => {
        const noteItem = document.createElement("div");
        noteItem.classList.add("note");
        noteItem.innerHTML = `
            <p>${note}</p>
            <button onclick="deleteNote(${index})"><i class="fas fa-trash"></i> Удалить</button>
        `;
        notesItems.appendChild(noteItem);
    });
}

// Функция для удаления заметки
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1); // Удаление заметки
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes(); // Перезагрузка списка заметок
}

// Первоначальная загрузка напоминаний и заметок при загрузке страницы
loadReminders();
loadNotes();
