<template>
<!-- v-model="popup" -->
    <v-dialog  v-model="openPopup" scrollable persistent transition max-width="500px">
        <template v-slot:default="{}">
        <v-card>
            <v-card-title class=" bg-info">Confirmation</v-card-title>
            <v-card-text class="my-1">{{(message) ? message : "Do You Really want to Book this appointment?"}}</v-card-text>
            <v-card-actions>
                <v-btn :loading="loading" color="info" variant="elevated" class="ml-auto" @click="onConfirm()">Confirm</v-btn>
                <v-btn :loading="loading" class="bg-error text-white" variant="elevated" @click="onCancel()">Cancel</v-btn>
            </v-card-actions>
        </v-card>
        </template>
    </v-dialog>
</template>
<script>
export default {
    props: ['popup', 'onConfirm', 'onCancel', 'loading', 'message'],
    data(){
        return {
            openPopup:false
        }
    },
    mounted(){
        this.openPopup = this.popup
    },
    watch:{
        popup(val){
            this.openPopup = val
        }
    }

};
</script>
<style lang="scss" scoped>
.v-card__text{
    color: rgba(0, 0, 0, 1) !important;
}
</style>
