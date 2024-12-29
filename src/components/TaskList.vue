<template>
  <div>
    <h2>Список задач</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id" @click="open(task)" class="cardStyle">
        {{ task.title }}
        <button @click.stop="updatedTasks(task)">Изменить</button>
        <button @click.stop="detailsTask(task)">Детали</button>
        <button @click.stop="deleteTask(task.id)">Удалить</button>
      </li>
    </ul>
    <button @click="openCreate()">Создать задание</button>

    <div v-if="showModal" class="modal">
      <div class="modal_content">
        <h2 v-if="updatedTask">Редактировать задание</h2>
        <h2 v-else>Создать задание</h2>
        <label>
          Название:
          <input v-model="taskForm.title" />
        </label>
        <button @click="saveTask()">Сохранить</button>
        <button @click="closeModal()">Закрыть</button>
      </div>
    </div>

    <div v-if="selectedTask" class="modal">
      <div class="modal_content">
        <h2>Детали задания</h2>
        <p>ID: {{ selectedTask.id }}</p>
        <p>Название: {{ selectedTask.title }}</p>
        <button @click="close()">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { id: 1, title: "Задание 1" },
        { id: 2, title: "Задание 2" },
        { id: 3, title: "Задание 3" },
      ],
      selectedTask: null,
      showModal: false,
      taskForm: { id: null, title: "" },
      updatedTask: false,
    };
  },
  methods: {
    openCreate() {
      this.taskForm = { id: null, title: "" };
      this.updatedTask = false;
      this.showModal = true;
    },
    updatedTasks(task) {
      this.taskForm = { ...task };
      this.updatedTask = true;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    saveTask() {
      if (this.updatedTask) {
        const index = this.tasks.findIndex((t) => t.id === this.taskForm.id);
        if (index !== -1) {
          this.tasks.splice(index, 1, { ...this.taskForm });
        }
      } else {
        const newTask = {
          ...this.taskForm,
          id: this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1,
        };
        this.tasks.push(newTask);
      }
      this.closeModal();
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    detailsTask(task) {
      this.selectedTask = task;
    },
    close() {
      this.selectedTask = null;
    },
  },
};
</script>

<style scoped>
.cardStyle {
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.modal_content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  text-align: center;
}
</style>
