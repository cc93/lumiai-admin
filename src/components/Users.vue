<style>

</style>
<template>
    <div class="users">
        <vue-bootstrap-table
                :columns="columns"
                :values="values"
                :show-filter="true"
                :show-column-picker="true"
                :sortable="true"
        >
        </vue-bootstrap-table>
    </div>
</template>
<script>
    import VueBootstrapTable from './VueBootstrapTable.vue';

    export default {
        components: {
            'vue-bootstrap-table': VueBootstrapTable,

        },
        data:function(){
            return {
                columns: [
                    {
                        title: "id",
                    },
                    {
                        title: "username",
                    },
                    {
                        title: "password",
                    },
                    {
                        title: "role",
                    }
                ],
                values: []
            }

        },
        ready: function(){
            this.requestData();

        },
        methods: {
            requestData: function(){
                $.ajax({
                    type: "GET",
                    url: 'http://127.0.0.1:3000/lumiai/api/users',
                    dataType: 'json',
                    data: {
                    },
                    xhrFields: {
                        withCredentials: true   //支持跨域发送cookies
                    },
                    crossDomain: true,
                    success: function (data) {
                        this.values = data;
                    }.bind(this),
                    error: function (xhr, status, err) {
                        console.error('xhr = ' + JSON.stringify(xhr), 'status = ' + status, 'err = ' + JSON.stringify(err));
                    }.bind(this)
                });
            }
        }
    }
</script>