<style>
    .vue-table {

    }

    table.vue-table thead > tr > th {
        cursor: pointer;
        padding-right: 30px !important;
    }

    /*.vue-table th.active {
        color: red;
    }*/

    .vue-table .arrow {
        opacity: 1;
        position: relative;
    }

    .vue-table .arrow:after {
        position: absolute;
        bottom: 8px;
        right: 8px;
        display: block;
        font-family: 'Glyphicons Halflings';
        content: "\e150";
        /*
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;*/
    }

    .vue-table .arrow.asc:after {
        content: "\e155";
        /*
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #000;
        */
    }

    .vue-table .arrow.dsc:after {
        content: "\e156";
    }

    /*.vue-table .selected-cell {
        background-color: #F7C072;
    }

    .vue-table .selected-row {
        background-color: #FAE1BE !important;
    }*/
</style>
<template>
    <div class="jj-container container-fluid" @click="closeDropdown" @keyup.esc="closeDropdown">
        <!--<pre>{{columns | json}}</pre>-->
        <!--<pre>{{$data | json}}</pre>-->

        <div class="row" style="margin: 12px 0;">
            <!-- searchbox-->
            <div class="col-md-4">
                <div v-if="showFilter">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Filter" v-model="filterKey">
                        <div class="input-group-addon">
                            <i class="glyphicon glyphicon-search"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /searchbox-->
            <!-- btngroup -->
            <div class="col-md-4 col-md-offset-4">
                <button class="btn btn-success pull-right" @click="addItemClick">Add item</button>
                <div class="btn-group pull-right" :class="{'open' : columnMenuOpen}" v-if="showColumnPicker">
                    <button @click.stop.prevent="columnMenuOpen = !columnMenuOpen" @keyup.esc="columnMenuOpen = false"
                            type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true">
                        Columns <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li v-for="column in displayCols">
                            <a href="#" @click.stop.prevent="toggleColumn(column)">
                                <i v-if="column.visible" class="glyphicon glyphicon-ok"></i> {{column.title}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /btngroup -->
        </div>

        <div class="row">
            <div class="col-md-12">
                <table class="table table-bordered table-hover table-condensed table-striped vue-table">
                    <thead>
                    <tr>
                        <th v-for="column in displayCols | filterBy true in 'visible'" @click="sortBy(column.title)"
                            track-by="$index"
                            :class="getClasses(column.title)">
                            {{ column.title }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="entry in filteredValues | orderBy sortKey sortOrders[sortKey]" track-by="$index">
                        <td v-for="column in displayCols | filterBy true in 'visible'" track-by="$index"
                            v-show="column.visible">
                            {{ entry[column.title] }}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Add item popup-->
        <vue-popup title="Add item" :show.sync="isShowPopup" @popup-confirm="addItemSubmit" >
            <form class="form-horizontal" style="overflow-x: hidden">
                <div class="form-group">
                    <label class="col-sm-2 control-label">用户名</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" placeholder="用户名 (username)" v-model="username"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">密码</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" placeholder="密码 (password)" v-model="password"/>
                    </div>
                </div>
                <!--<div class="form-group">-->
                    <!--<label class="col-sm-2 control-label">昵称</label>-->
                    <!--<div class="col-sm-10">-->
                        <!--<input type="text" class="form-control" placeholder="昵称 (nickname)" :value="nickname"/>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="form-group">
                    <label class="col-sm-2 control-label">角色</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" placeholder="角色 (role)" v-model="role"/>
                    </div>
                </div>
                <!--<div class="form-group">-->
                    <!--<label class="col-sm-2 control-label">单位</label>-->
                    <!--<div class="col-sm-10">-->
                        <!--<input type="text" class="form-control" placeholder="单位 (unit)" :value="unit"/>-->
                    <!--</div>-->
                <!--</div>-->
            </form>
        </vue-popup>
        <!-- /Add item pupup-->

    </div>
</template>
<script>
    import VuePopup from './VuePopup.vue';

    export default {
        name: "VueBootstrapTable",
        components: {
            'vue-popup': VuePopup

        },
        props: {
            /**
             * The column titles, required
             */
            columns: {
                type: Array,
                required: true,
            },
            /**
             * The rows, an Array of objects
             */
            values: {
                type: Array,
                required: true,
            },
            /**
             * Enable/disable table sorting, optional, default true
             */
            sortable: {
                type: Boolean,
                required: false,
                default: true,
            },
            /**
             * Enable/disable input filter, optional, default false
             */
            showFilter: {
                type: Boolean,
                required: false,
                default: false,
            },
            /**
             * Enable/disable column picker to show/hide table columns, optional, default false
             */
            showColumnPicker: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        data: function () {
            return {
                filteredSize: 0,
                filterKey: "",
                sortKey: "",
                sortOrders: {},
                columnMenuOpen: false,
                displayCols: [],
                isShowPopup: false,
                username:'',
                password:'',
                role:0
            };
        },
        ready: function () {
            this.setSortOrders();
            var self = this;
            this.columns.forEach(function (column) {
                var obj = {};
                obj.title = column.title;
                obj.visible = true;
                self.displayCols.push(obj);
            });
            this.requestData();
        },
        watch: {
            values: function () {
            },
            columns: function () {
                var self = this;
                this.columns.forEach(function (column) {
                    var obj = {};
                    obj.title = column.title;
                    obj.visible = true;
                    self.displayCols.push(obj);
                });
                this.setSortOrders();
            },
            showFilter: function () {
                this.filterKey = "";
            },
            showColumnPicker: function () {
                this.columnMenuOpen = false;

                this.displayCols.forEach(function (column) {
                    column.visible = true;
                });
            }
        },
        computed: {
            filteredValues: function () {
                var result = this.$options.filters.filterBy(this.values, this.filterKey);
                result = this.$options.filters.orderBy(result, this.sortKey, this.sortOrders[this.sortKey]);
                this.filteredSize = result.length;
                return result;
            },
        },
        methods: {
            setSortOrders: function () {
                this.sortKey = "";
                var sortOrders = {};
                this.columns.forEach(function (column) {
                    sortOrders[column.title] = 0;
                });
                this.sortOrders = sortOrders;

            },
            sortBy: function (key) {
                if (this.sortable) {
                    var self = this;
                    this.sortKey = key;
                    this.columns.forEach(function (column) {
                        if (column.title !== key) {
                            self.sortOrders[column.title] = 0;
                        }
                    });
                    if (this.sortOrders[key] === 0) {
                        this.sortOrders[key] = 1;
                    } else {
                        this.sortOrders[key] = this.sortOrders[key] * -1;
                    }
                }
                //console.log(JSON.stringify(this.sortOrders));
            },
            getClasses: function (key) {
                var classes = [];
                if (this.sortable) {
                    classes.push("arrow");
                    if (this.sortKey === key) {
                        classes.push("active");
                    }
                    if (this.sortOrders[key] === 1) {
                        classes.push("asc");
                    } else if (this.sortOrders[key] === -1) {
                        classes.push("dsc");
                    }
                }
                return classes;
            },
            toggleColumn: function (column) {
                column.visible = !column.visible;
            },
            closeDropdown: function () {
                this.columnMenuOpen = false;
            },
            addItemClick: function () {
                this.isShowPopup = true;
                console.log('click!');
            },
            addItemSubmit: function(){
                console.log(this.username + ',' + this.password + ',' + this.role);
                $.ajax({
                    type: "POST",
                    url: 'http://127.0.0.1:3000/lumiai/api/adduser',
//                    dataType: 'json',
                    data: {
                        'username': this.username,
                        'password': this.password,
                        'role':this.role
                    },
                    xhrFields: {
                        withCredentials: true   //支持跨域发送cookies
                    },
                    crossDomain: true,
                    success: function (data) {
                        this.requestData();
                    }.bind(this),
                    error: function (xhr, status, err) {
                        console.error('xhr = ' + JSON.stringify(xhr), 'status = ' + status, 'err = ' + JSON.stringify(err));
                    }.bind(this)
                });
            },
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
        },
        events: {}
    }
</script>