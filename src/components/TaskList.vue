<template>
   <button class="openCreate" @click="openCreate()">Создать задание</button>
  <div>
    <h2>Список задач</h2>
    <ul class="taskContainer">
      <li v-for="task in tasks" :key="task.id" @click="open(task)" class="cardStyle">
        <h2>{{ task.title }}</h2>
         <hr>
        <p class="description">{{ task.description }}</p>

        <button class="updatedTasks" @click.stop="updatedTasks(task)">Изменить</button>
        <button class="detailsTask" @click.stop="detailsTask(task)">Детали</button>
        <button class="deleteTask" @click.stop="deleteTask(task.id)">Удалить</button>
      </li>
    </ul>
    <div v-if="showModal" class="modal">

      <div class="modal_content">

        <h2 v-if="updatedTask">Редактировать задание</h2>
        <h2 v-else>Создать задание</h2>
        <label>
          <h3>Название:</h3>
          <input v-model="taskForm.title" />
        </label>
        <label>
          <h3>Описание:</h3>
          <textarea class="textarea" v-model="taskForm.description"></textarea>
        </label>
        <button class="saveTask" @click="saveTask()">Сохранить</button>
        <button class="closeModal" @click="closeModal()">Закрыть</button>

      </div>
    </div>

    <div v-if="selectedTask" class="modal">
      <div class="modal_content">
        <h2>Детали задания</h2>
        <p>ID: {{ selectedTask.id }}</p>
        <p>Название: {{ selectedTask.title }}</p>
        <p><strong>Описание:</strong> {{ selectedTask.description }}</p>
        <button class="close" @click="close()">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { id: 1, title: "Задание 1", description: "не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти" },
        { id: 2, title: "Задание 2", description: "не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума " },
        { id: 3, title: "Задание 3", description: "не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума не сойти с ума " },
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
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  border: 1px solid #36bdb6;
  max-width: 300px;
  width: 100%;
  max-height: 350px;
  gap: 15px;
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
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #36bdb6;
  max-width: 500px;
  text-align: center;
}

.taskContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  max-height: 120px;
  line-height: 1.3em;
  -webkit-line-clamp: 4;
}

.textarea{
  max-width: 400px;
  width: 100%;
  max-height: 400px;
  height: 100%;
  border: 2px solid #36bdb6;
  border-radius: 8px 12px;
  padding: 8px;
}

input{
  border: 2px solid #36bdb6;
  border-radius: 5px;
  max-width: 300px;
  height: 30px;
  width: 100%;
  padding: 8px;
}

.updatedTasks{
  background: #b7edeb;
}
.updatedTasks:hover{
  background: #36bdb6;
}
.detailsTask{
  background: #dbbdf8;
}
.detailsTask:hover{
  background: #7c36bd;
}
.deleteTask{
  background: #e5a9a9;
}
.deleteTask:hover{
  background: #bd3636;
}
.openCreate{
  background: #36bd38;
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 50px;
}
.saveTask{
  background: #e1e1a6;
}
.saveTask:hover{
  background: #bdbd36;
}
.closeModal{
  background: #dca4a4;
}
.closeModal:hover{
  background: #bd3636;
}
.close{
  background: #dfa0cd;
}
.close:hover{
  background: #bd3697;
}

button{
  color: white;
  border: none;
}
</style>
