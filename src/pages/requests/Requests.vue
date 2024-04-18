<template>
  <div>
  <base-dialog :show="!!error" title="error" @close="handleError"></base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>You don't have any requests</h3>
      </base-card>
  </section>
</div>
</template>

<script>
import requestItem from '../../components/requests/requestItem.vue';

export default {
  components: {
    requestItem,
  },
  data() {
    return { isLoading: false, error: null };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        console.error(error); 
        this.error = error.message || 'something is not right';
      }
      this.isLoading = false;
    },
    handleError(){
      this.error = null;
    }
  },
  created(){
    this.loadRequests();
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
