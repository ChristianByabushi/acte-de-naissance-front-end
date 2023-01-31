<template>
  <div>
    <v-card>
      <h3>Suivi des activités</h3>
    </v-card>
    <v-subheader class="d-flex justify-space-between align-center">
    </v-subheader>

    <v-col lg="6" cols="12">
      <v-alert dense type="success" color="#0091EA">
        L'hotel Kamanunga vous souhaite une bonne <strong>Concentration</strong>!
      </v-alert>
    </v-col>
    <v-row>

      <v-col lg="6" cols="12">
        <v-card>
          <v-card-title>Suivi des dettes</v-card-title>
          <v-card-content>
            <listedette></listedette>
          </v-card-content>
        </v-card>
      </v-col>
      <v-col lg="6" cols="12">
        <v-card>
          <v-card-title>Suivi des absences</v-card-title>
          <v-card-content>
            <listeabsence></listeabsence>
          </v-card-content>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import msg from "@/views/messages/listemessage.vue"
import listedette from "@/views/dette/liste-dette.vue"
import listeabsence from "@/views/absence/liste-absence.vue"
export default {
  name: 'Messages',
  components: {
    msg,
    listedette,
    listeabsence
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
  beforeMount() {
    //  this.getDashboardanalysis() 

  }
}

</script>