<template>
    <v-dialog v-model="openDialog" scrollable persistent transition max-width="500px">
        <template v-slot:default="{}">
            <v-card>
                <v-card-title class="text-red">Warning</v-card-title>
                <v-card-text>{{
                    message
                        ? message
                        : 'Do You Really want to delete this item?'
                }}</v-card-text>

                <v-card-actions class="justify-end">
                    <v-btn
                        :loading="loading"
                        color="error"
                        class="ml-auto"
                        variant="elevated"
                        @click="onConfirm()"
                        >Confirm</v-btn
                    >
                    <v-btn
                        :loading="loading"
                        class="update-btn text-white"
                        @click="onCancel()"
                        >Cancel</v-btn
                    >
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
    <!-- old dialogue v-model issue resolved vy template slot -->

    <!-- <v-dialog v-model="popup" scrollable persistent transition max-width="500px">
        <v-card>
            <v-card-title class="text-red">Warning</v-card-title>
            <v-card-text>{{(message) ? message : "Do You Really want to delete this item?"}}</v-card-text>
            <v-card-actions>
                <v-btn :loading="loading" color="error" class="ml-auto" @click="onConfirm()">Confirm</v-btn>
                <v-btn :loading="loading" class="update-btn text-white" @click="onCancel()">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> -->
</template>
<script>
export default {
    props: ['popup', 'onConfirm', 'onCancel', 'loading', 'message'],
    data(){
        return {
            openDialog:false
        }
    },
    watch:{
        popup(val){
            this.openDialog = val
        }
    },
    mounted(){
        this.openDialog = this.popup
    }
};
</script>
<style lang="scss" scoped>
.v-card__text {
    color: rgba(0, 0, 0, 1) !important;
}
.update-btn {
    background: #0c3cac !important;
}
.create-btn {
}
.cancel-btn {
    background: #d90000 !important;
}
</style>
