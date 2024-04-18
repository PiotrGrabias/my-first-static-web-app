<template>
    <div>
    <base-dialog :show="!!error" titlt="An error occurred" @close="handleClose">
        <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" fixed title="Authenticating...">
        <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
    <form @submit.prevent="submitLogin">
        <div class="form-control">
            <label for="email">Email</label>
            <input type="email" id="email" v-model.trim="email">
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input type="password" id="password" v-model.trim="password">
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password(at least 6 characters long)</p>
        <button class="button is-primary" @click="submitLogin">{{submitButton}}</button>
        <button class="button is-secondary" @click="switchAuth" type="button" mode="flat">{{ submitMode }}</button>
    </form>
    </base-card>
</div>
</template>
<script>
export default{
    data(){
        return{
            email:'',
            password:'',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        };
    },
    computed:{
        submitButton(){
            if(this.mode === 'login'){
                return 'Login';
            } else {
                return 'Signup';
            }
        },
        submitMode(){
            if(this.mode === 'login'){
                return 'Signup instead';
            } else {
                return 'Login instead';
            }
        }
    },
    methods: {
        handleClose(){
            this.error = null;
        }, 
        async submitLogin(){
            this.formIsValid = true;
            if(this.email === '' || !this.email.includes('@') || this.password.length<6){
              this.formIsValid = false;
              return;  
            }
            this.isLoading = true;
            try{if(this.mode === 'login'){
              await this.$store.dispatch('login',{
                    email: this.email,
                    password: this.password
                })  
                const redirectIrl = '/' + (this.$route.query.redirect || 'coaches');
                this.$router.replace(redirectIrl);
            }else{
                await this.$store.dispatch('signup', {
                    email: this.email,
                    password: this.password
                })
            }} catch(error){
                this.error = error.message || 'Failed to authenticate';
            }
            this.isLoading = false;
        },
        switchAuth(){
            if (this.mode === 'login'){
                this.mode = 'signup';
                return;
            }else {
                this.mode = "login";
            }
        }
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>