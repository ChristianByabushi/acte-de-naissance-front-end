<template>
  <div>
    <div class="mb-5">
      <h1>{{ msg }}</h1>
    </div>
    <form action="">
      <div class="d-flex">
        <input v-model="task" type="text" class="w-auto form-control selectCategorie" name="">
        <div class="row">
          <div class="col-lg-md-6">
            <div class="form-floating">
              <select class="form-select" v-model="selectedCategorie">
                <option v-for="status in listStatues" v-bind:key="status">
                  {{ status }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <v-select :items="listStatues" tabindex="item in listStatues"  label="Categorie Statue"></v-select>
        <button @click="submitTask" aria-expanded="true" aria-haspopup="true" role="button" type="button">
          Submit
        </button>
      </div>


   


      <v-simple-table class="mt-5">
        <template v-slot:default>
          <thead>
            <tr  class="text-center">
              <th>
                Name
              </th>
              <th >
                Calories
              </th>
              <th >
                Delete
              </th>
              <th >
                edit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tasks" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.status }}</td>
              <td @click="deleteTask(index)">
                <span class="fa fa-pen"></span>
              </td>
              <td @click="editTask(index)"></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </form>

  </div>
</template>


<script>

export default {
  name: "Todolist",
  props: {
    msg: String
  },
  data() {
    return {
      task: '',
      indexEdit: null,
      selectedCategorie: 'in-progress',
      listStatues: ['to-do', 'in-progress'],
      tasks: [
        {
          name: "Steal banans from store",
          status: "to-do",
        },
        {
          name: "Eat 1Kg chocolate in 1 hour",
          status: "in-progress"
        }
      ]
    };
  },
  methods: {
    submitTask() {
      if (this.task.length === 0) return
      if (this.indexEdit === null) { // if we can edit  
        this.tasks.push({
          name: this.task,
          status: this.selectedCategorie
        })
      } else {
        this.tasks[this.indexEdit].name = this.task

        this.indexEdit = ''
      }
      this.task = ''
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    editTask(index) {
      this.task = this.tasks[index].name;
      this.indexEdit = index
    },
    subChangeStatus(index) {
      let newIndex = this.listStatues.indexOf(this.tasks[index].status);
      if (++newIndex > 1) newIndex = 0;
      this.tasks[index].status = this.listStatues[newIndex]
    },
    firstUpperCase(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
};
</script>
<style scoped>
.cursor {
  cursor: pointer
}

.finished {
  text-decoration: line-through;
}

.selectCategorie {
  height: 50px;

}
</style>