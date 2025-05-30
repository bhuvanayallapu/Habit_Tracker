const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.className = "habit-item";

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.completed;
    checkbox.addEventListener("change", () => {
      habits[index].completed = checkbox.checked;
      saveHabits();
      renderHabits();
    });

    const span = document.createElement("span");
    span.textContent = habit.name;
    span.className = "habit-text";
    if (habit.completed) {
      span.classList.add("completed");
    }

    label.appendChild(checkbox);
    label.appendChild(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.border = "none";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener("click", () => {
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
    });

    li.appendChild(label);
    li.appendChild(deleteBtn);
    habitList.appendChild(li);
  });
}

habitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newHabit = habitInput.value.trim();
  if (newHabit) {
    habits.push({ name: newHabit, completed: false });
    habitInput.value = "";
    saveHabits();
    renderHabits();
  }
});

renderHabits();
