<template>
  <div>
    <v-subheader class="d-flex justify-space-between align-center">
      <h3>Suivi des absences</h3>
    </v-subheader>
    <v-alert dense type="info" color="#757575">
      Vérifier la recente frequence des agents
    </v-alert>


    <v-row>
      <v-col lg="6" cols="12">
        <v-alert dense type="success" color="#0091EA">
           L'hotel Kamanunga vous souhaite une bonne <strong>Concentration</strong>!
        </v-alert>
      </v-col>
  
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import msg from "@/views/messages/listemessage.vue"
export default {
  name: 'Messages',
  components: {
    msg
  },

  data: () => ({
    specificResult: [],
    created_at: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    timerDefined: ''
  }),
  methods: {
    async getInfoByid(item) {
      try {
        const response = await axios.post('user/getInfoByid/' + item)
        return response.data.id
      } catch (error) {
        console.log(error)
      }
    },
    async getDashboardanalysis() {
      try {
        const response = await axios.post('resultController/countActesWeeks/' + this.getDate())
        let result = response.data
        this.specificResult = [
          { title: "Total des déclarants", timer: 'Sommation', color: "indigo", amounts: result.totaldeclarant.numberDeclarant },
          { title: "Total acte de naissance", timer: '2 dernières semaines', color: '#5F9FFFFF', amounts: result.totalactenaissance.numberActe },
        ]
        this.DetailsItems = result.DetailsItems
      } catch (e) {
        console.log(e)
      }
    },
    getDate() {
      var twoWeeks = 1000 * 60 * 60 * 24 * 14;
      var twoWeeksTime = new Date(new Date().getTime() - twoWeeks);
      let formattedDate = twoWeeksTime.getFullYear() + '-' + (twoWeeksTime.getMonth() + 1) + '-' + twoWeeksTime.getDate();
      return formattedDate
    }
  },
  beforeMount(){
  //  this.getDashboardanalysis() 
  
  }
}

</script>