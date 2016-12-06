// Variables for charts/updating
var curr_person, edited_costs = false, edited_balance = false, edited_stats, delay = 0, firstLoad = true;

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
            self.vue.is_editing_bal = false;
            self.vue.is_editing_costs = false;
        }
    }

    self.edit_costs_button = function(){
        if (self.vue.logged_in) {
            self.vue.is_editing_costs = !self.vue.is_editing_costs;
            self.vue.is_editing_bal = false;
            self.vue.is_editing_stats = false;
        }
    }

    self.edited_costs = function(){
        edited_costs = true;
    }

    self.edited_balance = function(){
        edited_balance = true;
    }

    self.edited_stats = function(){
        edited_stats = true;
    }

    self.get_user_info = function(){ // Get current user info
        $.get(get_user_info_url, function(data) {
            self.vue.logged_in = data.logged_in;
            self.vue.person = data.person;
        });
        //sets curr_person after person has been retrieved by the .get
        $( document ).ajaxComplete(function() {
            curr_person = self.vue.person;
        });
    }

    self.update_stats = function(){  // update user info
        $.post(update_stats_url, {
            gender: self.vue.gender,
            age: self.vue.age,
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
            rent: 0,
            food: 0,
            utilities: 0,
            transportation: 0,
            other: 0,
            total: 0,
        },
        methods: {
            edit_balance_button: self.edit_balance_button,
            edit_stats_button: self.edit_stats_button,
            edit_costs_button: self.edit_costs_button,
            edited_costs: self.edited_costs,
            edited_balance: self.edited_balance,
            edited_stats: self.edited_stats,
            get_user_info: self.get_user_info,
            update_stats: self.update_stats,
            update_costs: self.update_costs,
            update_balance: self.update_balance,
        }
    });

    self.get_user_info();
    $("#vue-div").show();
    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above woul
jQuery(function(){APP = app();});