<template>
  <div class="draggable">
    <div>
      <div v-if="!isPanelVisible">
        <button @click="togglePanel">Открыть панель</button>
      </div>

      <div v-if="isPanelVisible" ref="draggable" id="draggable" @mousedown="onMouseDown"
        :style="[draggableStyle, isDraggable ? glowingStyle : {}]">
        <div class="draggableCross">
          <button class="draggableCrossButton" @click="closeCross"><img src="../../public/Vector.svg" alt=""></button>
        </div>
        <div class="block">
          <label>Описание:</label>
          <textarea v-model="task.description" placeholder="Введите описание" @blur="autoSave" @input="autoSave"
            class="transparentInput"></textarea>
        </div>
      </div>
    </div>

  </div>
</template>

<script>export default {
  data() {
    return {
      isPanelVisible: false,
      isDraggable: false,
      isEditable: false,
      coordinateX: 0,
      coordinateY: 0,
      holdTimeout: null,
      draggableStyle: {
        position: 'fixed',
        cursor: 'grab',
        left: '20px',
        top: '20px',
        transition: 'box-shadow 0.3s ease',
      },
      glowingStyle: {
        boxShadow: '0 0 15px 5px rgba(52, 152, 219, 0.8)',
      },
      task: {
        description: '',
      },
      savedTask: null,
    };
  },
  methods: {
    closeCross() {
      this.isPanelVisible = false;
    },
    togglePanel() {
      this.isPanelVisible = !this.isPanelVisible;
    },
    onMouseDown(e) {
      const draggable = this.$refs.draggable;

      this.isDraggable = true;
      this.coordinateX = e.clientX - draggable.offsetLeft;
      this.coordinateY = e.clientY - draggable.offsetTop;
      draggable.style.cursor = 'grabbing';

      const onMouseMove = (e) => {
        if (this.isDraggable) {
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          const elementWidth = draggable.offsetWidth;
          const elementHeight = draggable.offsetHeight;

          let newLeft = e.clientX - this.coordinateX;
          let newTop = e.clientY - this.coordinateY;

          if (newLeft < 20) newLeft = 20;
          if (newLeft > windowWidth - elementWidth - 20)
            newLeft = windowWidth - elementWidth - 20;

          if (newTop < 20) newTop = 20;
          if (newTop > windowHeight - elementHeight - 20)
            newTop = windowHeight - elementHeight - 20;

          this.draggableStyle.left = `${newLeft}px`;
          this.draggableStyle.top = `${newTop}px`;
        }
      };

      const onMouseUp = () => {
        this.isDraggable = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        draggable.style.cursor = 'grab';
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    autoSave() {
      if (this.task.description) {
        this.savedTask = { ...this.task };
        console.log(this.savedTask);
      }
    },
    updatePositionOnResize() {
      const draggable = this.$refs.draggable;

      if (draggable) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const elementWidth = draggable.offsetWidth;
        const elementHeight = draggable.offsetHeight;

        let newLeft = parseInt(this.draggableStyle.left);
        let newTop = parseInt(this.draggableStyle.top);

        if (newLeft + elementWidth + 20 > windowWidth) {
          newLeft = windowWidth - elementWidth - 20;
        }
        if (newTop + elementHeight + 20 > windowHeight) {
          newTop = windowHeight - elementHeight - 20;
        }

        this.draggableStyle.left = `${Math.max(newLeft, 20)}px`;
        this.draggableStyle.top = `${Math.max(newTop, 20)}px`;
      }
    },
    onTouchStart(e) {
      const draggable = this.$refs.draggable;
      const touch = e.touches[0];

      this.coordinateX = touch.clientX - draggable.offsetLeft;
      this.coordinateY = touch.clientY - draggable.offsetTop;

      this.holdTimeout = setTimeout(() => {
        this.isDraggable = true; 

        if (navigator.vibrate) {
          navigator.vibrate(200); 
        }
      }, 2000); 

      const onTouchMove = (e) => {
        if (this.isDraggable) {
          const touch = e.touches[0];
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          const elementWidth = draggable.offsetWidth;
          const elementHeight = draggable.offsetHeight;

          let newLeft = touch.clientX - this.coordinateX;
          let newTop = touch.clientY - this.coordinateY;

          if (newLeft < 30) newLeft = 30;
          if (newLeft > windowWidth - elementWidth - 30)
            newLeft = windowWidth - elementWidth - 30;

          if (newTop < 30) newTop = 30;
          if (newTop > windowHeight - elementHeight - 30)
            newTop = windowHeight - elementHeight - 30;

          this.draggableStyle.left = `${newLeft}px`;
          this.draggableStyle.top = `${newTop}px`;
        }
      };

      const onTouchEnd = () => {
        clearTimeout(this.holdTimeout);
        this.isDraggable = false; 
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
      };

      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
    },


  },
  mounted() {
    window.addEventListener('resize', this.updatePositionOnResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updatePositionOnResize);
  },
};
</script>

<style>
.draggableCross {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.draggableCrossButton {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 7px 0;
}

.draggableCrossButton img {
  width: 20px;
  height: 20px;
}


.transparentInput {
  max-width: 330px;
  max-height: 330px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  resize: none;
  color: #000;
}

.transparentInput::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.saveWidget {
  background: #ffffff;
  border: 1px solid #000000;
  color: black;
  transition: 0.5s;
}

.saveWidget:hover {
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
  max-width: 350px;
  width: 100%;
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

.createWidget:hover {
  transition: 0.5s;
  background: #000;
  color: #ffffff;
}

.draggable {
  width: 100%;
}

.hr {
  width: 100%;
  height: 1px;
  background: #000;
  border: 1px solid #000000;
}

#draggable {
  max-width: 350px;
  max-height: 200px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  user-select: none;
  padding: 20px;
  opacity: 0.8;
}
</style>
