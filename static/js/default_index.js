/**
 * Created by gding on 11/9/2016.
 */

 /* url variables for the functions
    var get_user_info_url = "{{=URL('api', 'get_user_info', user_signature=True)}}";
    var get_average_info_url = "{{=URL('api', 'get_average_info', user_signature=True)}}";

*/

var app = function () {
    var self = {};

    Vue.config.silent = false;


    self.edit_balance_button = function(){
        if (self.vue.logged_in) {
            self.vue.is_editing_bal = !self.vue.is_editing_bal;
            self.vue.is_editing_stats = false;
            self.vue.is_editing_costs = false;
        }
    }

    self.edit_stats_button = function(){
        if (self.vue.logged_in) {
            self.vue.is_editing_stats = !self.vue.is_editing_stats;
            self.vue.is_editing_balance = false;
            self.vue.is_editing_costs = false;
        }
    }

    self.edit_costs_button = function(){
        if (self.vue.logged_in) {
            self.vue.is_editing_costs = !self.vue.is_editing_costs;
            self.vue.is_editing_balance = false;
            self.vue.is_editing_stats = false;
        }
    }

    self.get_user_info = function(){ // Get current user info
        $.get(get_user_info_url, function(data) {
            self.vue.logged_in = data.logged_in;
            self.vue.person = data.person;
        });
    }

    self.update_stats = function(){  // update user info
        $.post(update_stats_url, {
            gender: self.vue.gender,
            age: self.vue.age
        });
    }

    self.get_average_info = function(){ // get average user info
        $.get(get_average_info_url, function(data) {
            self.vue.logged_in = self.vue.logged_in;
        });
    }

    self.update_costs = function(){  // update user info
        $.post(update_costs_url, {
            rent: self.vue.rent,
            food: self.vue.food,
            utilities: self.vue.utilities,
            transportation: self.vue.transportation,
            other: self.vue.other
        });
    }

    self.update_balance = function(){  // update user info
        $.post(update_balance_url, {
            current_balance: self.vue.current_balance,
            goal: self.vue.goal,
            income: self.vue.income
        });
    }


    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data:{
            person: [],
            user_name: null,
            user_email: null,
            logged_in: false,
            gender: null,
            income: 0,
            age: 0,
            current_balance: 0,
            is_editing_bal: false,
            is_editing_stats: false,
            is_editing_costs: false,
            goal: 0,
            avg_bal: 0,
            avg_spend: 0,
            avg_income: 0
        },
        methods: {
            edit_balance_button: self.edit_balance_button,
            edit_stats_button: self.edit_stats_button,
            edit_costs_button: self.edit_costs_button,
            get_user_info: self.get_user_info,
            update_stats: self.update_stats,
            update_costs: self.update_costs,
            update_balance: self.update_balance,
            get_average_info: self.get_average_info
        }
    });

    self.get_user_info();
    $("#vue-div").show();
    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});