<template>
    <div>
        <v-dialog v-model="dialog" max-width="600px" :persistent="true">
            <v-card>
                <v-card-title class="headline">{{ title }}</v-card-title>
                <v-card-text v-html="value"></v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="showNextDialog">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" timeout="-1">
            {{ text }}
        </v-snackbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            value: "",
            dialog: false,
            snackbar: false,
            text: "",
        };
    },
    methods: {
        showNextDialog() {
            this.dialog = false;
            this.$store.commit("getAlert");
        },
        showNextSnackbar() {
            this.snackbar = false;
            this.$store.commit("getSnackBar");
        },
    },
    watch: {
        "$store.state.dialogs": function (newv, old) {
            //alert("测试")
            if (this.$store.state.dialogs.length > 0) {
                this.dialog = true;
                this.title = this.$store.state.dialogs[0].title;
                this.value = this.$store.state.dialogs[0].value;
            }
        },
        "$store.state.snackbar": function (newv, old) {
            if (this.$store.state.snackbar.length > 0) {
                this.snackbar = true;
                this.text = this.$store.state.snackbar[0];
                var that = this;
                setTimeout(() => {
                    this.showNextSnackbar();
                }, 3000);
            }
        },
    },
    mounted() {
        /*
        if (this.$store.state.dialogs.length > 0) {
            this.dialog = true
            this.title = this.$store.state.dialogs[0].title
            this.value = this.$store.state.dialogs[0].value
        } else {
            this.dialog = false
        }
                    if (this.$store.state.snackbar.length > 0) {
            this.snackbar = true
            this.text = this.$store.state.snackbar[0]
        } else {
            this.snackbar = false
        }*/
    },
};
</script>

<style>
</style>
