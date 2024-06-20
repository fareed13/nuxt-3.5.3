
<template>
    <div>
        <v-container fluid class="sell-product app-white-background py-0">
            <v-container class="py-0">
                <v-row class="py-0">
                    <v-col md="12" class="py-0">
                        <div class="arrow mx-auto hidden-sm-and-down">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1497 513"
                            >
                                <path
                                    :d="'M11.63 3.02c.38 24.21 24.36 312.91 957.95 171.32 487.59-73.95 513.64 230.88 511.61 315.92'"
                                    fill="none"
                                    reverse
                                    stroke="#e4eafa"
                                    stroke-width="3"
                                    stroke-miterlimit="10"
                                />
                                <path
                                    transform="rotate(-.922 11.64 3.013)"
                                    class="st1"
                                    d="M1.23 1.42h20.86v3.21H1.23z"
                                />
                                <path
                                    class="st1"
                                    d="M1466.35 485.04l13.48 26.71 16.39-25.03z"
                                />
                            </svg>
                        </div>
                            <!-- error =>  src="../../assets/img/left-to-right.png" -->
                        <v-img
                            class="mx-auto hidden-md-and-up"
                            style="transform: scaleX(-1);"
                            max-width="200px"
                            width="100%"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="scss" scoped>
@import '../../assets/sass/colors';
.sell-product {
    margin-top: -135px;
    margin-bottom: 0px;
    .st1 {
        fill: #e4eafa;
    }
    .arrow {
        width: 100%;
        max-width: 70%;
        transform: scaleX(-1);
    }
    @media (max-width: 991px) {
        margin: 0;
    }
}
</style>
