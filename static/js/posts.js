
var app = function() {
    var self = {};
    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    function get_posts_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
        return posts_url + "?" + $.param(pp);
    }

    self.get_posts = function () {
        $.getJSON(get_posts_url(0, 4), function (data) {
            self.vue.posts = data.posts;
            self.vue.has_more = data.has_more;
            self.vue.logged_in = data.logged_in;
        })
    };

    self.get_more = function () {
        var num_posts = self.vue.posts.length;
        $.getJSON(get_posts_url(num_posts, num_posts + 4), function (data) {
            self.vue.has_more = data.has_more;
            self.extend(self.vue.posts, data.posts);
        });
    }

    self.add_post_button = function(){
        if (self.vue.logged_in)
            self.vue.is_adding_post = !self.vue.is_adding_post;
    }

    self.add_post = function(){
        $.post(add_post_url,
            {
                post_content: self.vue.form_content
            },
            function (data) {
                $.web2py.enableElement($("#add_post_submit"));
                self.vue.posts.unshift(data.post);
                if (self.vue.posts.length > 4) {
                    self.vue.has_more = true;
                }
                self.vue.form_content = "";
            });
    }

    // Edit functions
    self.edit_post_button = function(post_id){
        self.vue.edit_id = post_id;
        self.vue.ed_content = "";
    }

    self.edit_post = function (post_id) {
        $.post(edit_post_url,
            {
                post_id: post_id,
                post_content: self.vue.edit_content
            },
            function (data) {
                $.web2py.enableElement($("#edit_post"));
            }
        )
    }


    self.delete_post = function (post_id) {
        $.post(del_post_url,
            {
                post_id: post_id
            },
            function () {
                var idx = null;
                for (var i = 0; i < self.vue.posts.length; i++) {
                    if (self.vue.posts[i].id === post_id) {
                        // If I set this to i, it won't work, as the if below will
                        // return false for items in first position.
                        idx = i + 1;
                        break;
                    }
                }
                if (idx) {
                    self.vue.posts.splice(idx - 1, 1);
                }
            }
        )
    }

    // Complete as needed.
    self.vue = new Vue({
        el: "#posts",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data:{
            has_more: false,
            posts: [],
            logged_in: false,
            is_adding_post: false,
            make_edit: false,
            edit_id: 0,
            user_email: null,
            form_content: null,
            edit_content: null,
            post_content: null
        },
        methods: {
            get_more: self.get_more,
            add_post_button: self.add_post_button,
            add_post: self.add_post,
            edit_post_button: self.edit_post_button,
            edit_post: self.edit_post,
            delete_post: self.delete_post
        }
    });

    self.get_posts();
    $("#posts").show();

    return self;
};

var APP1 = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP1 = app();});