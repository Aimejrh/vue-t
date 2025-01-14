<template>
  <div class="draggable">
    <div ref="draggable" id="draggable" @mousedown="onMouseDown" :style="[draggableStyle, isDraggable ? glowingStyle : {}]">
      <h2>{{ task.name }}</h2>
      <div class="hr"></div>
      <p>{{ task.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isDraggable: false,
      coordinateX: 0,
      coordinateY: 0,
      draggableStyle: {
        position: 'absolute',
        cursor: 'grab',
        left: '0px',
        top: '0px',
        transition: 'box-shadow 0.3s ease'
      },
      glowingStyle: {
        boxShadow: '0 0 15px 5px rgba(52, 152, 219, 0.8)', // Эффект свечения
      },
    };
  },
  methods: {
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

          if (newLeft < 0) newLeft = 0;
          if (newLeft > windowWidth - elementWidth) newLeft = windowWidth - elementWidth;

          if (newTop < 0) newTop = 0;
          if (newTop > windowHeight - elementHeight) newTop = windowHeight - elementHeight;

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
  },
};
</script>

<style scoped>
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
  width: 200px;
  height: 150px;
  background-color: #ffffff;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  user-select: none;
  gap: 15px;
  padding: 20px;
}
</style>
