<template>
  <button v-if="!task" class="createWidget" @click="createWidget">создай виджет</button>
  <div v-if="task" class="widget">
    <div class="block"><label>название:</label>
      <input v-model="task.name" placeholder="Введите название виджета" />
    </div>
    <div class="block"><label>описание:</label>
      <textarea v-model="task.description" placeholder="введите описание"></textarea>
    </div>


    <button class="saveWidget" @click="saveWidget">сохранить</button>
  </div>
  <Draggable v-if="savedTask" :task="savedTask" />
</template>

<script>
import Draggable from "../components/Draggable.vue";
export default {
  data() {
    return {
      task: null,
      savedTask: null
    }
  },
  methods: {
    createWidget() {
      this.task = {
        name: '',
        description: "",
      }
    },
    saveWidget() {
      if (this.task.name && this.task.description) {
        this.savedTask = { ...this.task };
        this.task = null;
        console.log('Виджет сохранен:(⁠^⁠.⁠_⁠.⁠^⁠)⁠ﾉ', this.savedTask);
      } else {
        alert('заполни все поля(⁠･ั⁠ω⁠･ั⁠)!');
      }
    },
  },
  components: {
    Draggable,
  },
}
</script>


<style>
.saveWidget{
  background: #ffffff;
  border: 1px solid #000000;
  color: black;
  transition: 0.5s;
}
.saveWidget:hover{
  transition: 0.5s;
  border: 1px solid #000000;
  background: #000;
  color: rgb(255, 255, 255);
}

input {
  padding: 10px;
  border-radius: 10px;
  background: #ffffff;
  color: #000;
}

textarea {
  padding: 10px;
  border-radius: 10px;
  background: #ffffff;
  color: #000;
}

.block {
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 10px;
}

.widget {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: black;
  padding: 25px;
  width: 300px;
  gap: 20px;
  border-radius: 10px;
}

.createWidget {
  background: #ffffff;
  color: #000;
  position: fixed;
  display: flex;
  transition: 0.5s;
  bottom: 50px;
  right: 50px;
}

.createWidget:hover{
  transition: 0.5s;
  background: #000;
  color: #ffffff;
}
</style>
