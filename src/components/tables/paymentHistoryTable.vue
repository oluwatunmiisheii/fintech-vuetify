<template>
  <v-card>
    <v-card-title>
      Payment History
      <v-spacer></v-spacer>
      <!-- search field -->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <!-- table -->
    <v-data-table
      :headers="headers"
      :items="paymentHistories"
      :sort-by="['name', 'amount', 'payment_date']"
      :sort-desc="[false, true]"
      :loading="loadingPaymentHistory"
      :search="search"
    > 
      <template v-slot:top>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.customer_name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.amount"
                      label="Amount"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.customer_name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-autocomplete
                      v-model="editedItem.payment_method"
                      :items="methods"
                      label="Payment method"
                      placeholder="Select..."
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    
      <template v-slot:item.anssid_no="{}">
        {{anssidNumber}}
      </template>
      <template v-slot:item.id="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
    </template>

    </v-data-table>
</v-card>
</template>

<script>
  import {notifications} from "@/mixins/notifications"
  export default {
    mixins: [notifications],
    props: {
      anssidNumber: {
        type: String
      }
    },
    data () {
      return {
        methods: ['cash', 'POS', 'Bank'],
        editedIndex: -1,
        editedItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
        },
        defaultItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
        },
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            text: 'Anssid No',
            align: 'start',
            sortable: false,
            value: 'anssid_no',
          },
          { text: 'Name', value: 'customer_name' },
          { text: 'Amount', value: 'amount' },
          { text: 'Payment Ref', value: 'payment_reference' },
          { text: 'Bank', value: 'bank_name' },
          { text: 'Date', value: 'payment_date' },
          { text: 'Actions', value: 'id', sortable: false, },
        ],
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.paymentHistories.indexOf(item)
        console.log(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      // show delete modal
      deleteItem (item) {
        this.editedIndex = this.paymentHistories.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      // confirm delete
      async deleteItemConfirm () {
        try {
          const response = await this.$store.dispatch('paymentHistory/deletePaymentHistory', this.editedItem.id)
          this.paymentHistories.splice(this.editedIndex, 1)
          this.showSuccessNotification(response.message)
          this.closeDelete()
        }catch(error) {
          console.log(error)
          this.showErrorNotification('Something went wrong')
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          try {
            const response = await this.$store.dispatch('paymentHistory/editPaymentHistory', this.editedItem)
            Object.assign(this.paymentHistories[this.editedIndex], this.editedItem)
            this.showSuccessNotification(response.message)
          }catch(error) {
            console.log(error)
            this.showErrorNotification('Something went wrong')
          }
          
        }
        this.close()
      },
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Payment History'
      },
      paymentHistories() {
        return this.$store.state.paymentHistory.paymentHistories?.data?.data ?? []
      },
      loadingPaymentHistory() {
        return this.$store.state.paymentHistory.loading
      }
    }
  }
</script>