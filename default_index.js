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
        if (self.vue.logged_in)
            self.vue.is_editing_bal = !self.vue.is_editing_bal;
    }

    self.get_user_info = function(){
        $.get(get_user_info_url, function(data) {
            self.vue.logged_in = data.logged_in;
            self.vue.current_balance = data.current_balance;
        });
    }

    self.update_info = function(){
        $.post(update_info_url, function(data){
            self.vue.current_balance = data.current_balance;
        });
    }

    self.get_average_info = function(){
        $.get(get_average_info_url, function(data) {
            self.vue.logged_in = self.vue.logged_in;
        });
    }


    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data:{
            person: null,
            user_name: null,
            user_email: null,
            logged_in: false,
            gender: null,
            age: 0,
            current_balance: 0,
            is_editing_bal: false,
            goal: 0,
            avg_bal: 0,
            avg_spend: 0,
            avg_income: 0
        },
        methods: {
            edit_balance_button: self.edit_balance_button,
            get_user_info: self.get_user_info,
            update_info: self.update_info,
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