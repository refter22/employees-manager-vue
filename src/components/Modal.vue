<template>
  <div v-if="showModal" class="modal-overlay" @click="closeModal">
    <div class="modal-wrapper" @click.stop>
      <component :is="modalComponent" v-bind="modalProps" @close="closeModal"></component>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { modalActions } from '@/store/modules/modal/modal.actions'

export default {
  name: 'Modal',
  computed: {
    ...mapState('modal', ['showModal', 'modalComponent', 'modalProps'])
  },
  methods: {
    closeModal () {
      modalActions.hideModal()
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-wrapper {
  background-color: white;
  padding: var(--spacing-large);
  border-radius: var(--border-radius);
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
