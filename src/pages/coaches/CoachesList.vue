<template>
  <div>
  <section class="section"><coach-filter @change-filter="setFilters"></coach-filter>></section>
  <section class="section">
    <base-card>
    <div class="controls">
      <button class="button" @click="loadCoaches(true)">Refresh</button>
      <router-link class="button is-primary" v-if="!isLogged" to="/auth?redirect=register">Login to Register as a coach</router-link>
      <router-link v-if="!isCoach && !isLoading && isLogged" to="/register" class="button is-primary"
        >Register as Coach</router-link
      >
    </div>
    <div v-if="isLoading"><base-spinner></base-spinner></div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError"><p>{{ error }}</p></base-dialog>
    <ul class="title" v-if="hasCoaches">
      List of coaches
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>No coaches found</h3>
  </base-card>
  </section>
</div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
export default {
  components: { CoachItem, CoachFilter},
  data(){
    return{
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      }
    };
  },
  computed: {
    isLogged(){
      return this.$store.getters.isAuth;
    },
    isCoach(){
        return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter(coach => {
        if(this.activeFilters.frontend && coach.areas.includes('frontend')){
          return true;
        }
        if(this.activeFilters.backend && coach.areas.includes('backend')){
          return true;
        }
        if(this.activeFilters.career && coach.areas.includes('career')){
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    async loadCoaches(refresh = false){
      this.isLoading = true;
      try{
        await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh});
      } catch(error){
        this.error = error.message || 'Something went wrong...';
      }
      this.isLoading = false;

    },
    setFilters(updatedFilters){
      this.activeFilters = updatedFilters;
    },
    handleError(){
      this.erorr=null;
    }
  }
};
</script>

<style style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
