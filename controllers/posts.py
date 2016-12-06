from datetime import datetime
import time


def edit():
    return dict()

def get_user_name_from_email(email):
    """Returns a string corresponding to the user first and last names,
    given the user email."""
    u = db(db.auth_user.email == email).select().first()
    if u is None:
        return 'None'
    else:
        return ' '.join([u.first_name, u.last_name])

def get_posts():
    """This controller is used to get the posts.  Follow what we did in lecture 10, to ensure
    that the first time, we get 4 posts max, and each time the "load more" button is pressed,
    we load at most 4 more posts."""
    # Implement me!
    start_idx = int(request.vars.start_idx) if request.vars.start_idx is not None else 0
    end_idx = int(request.vars.end_idx) if request.vars.end_idx is not None else 0
    # We just generate a lot of of data.
    posts = []
    has_more = False
    user_email = ""
    rows = db().select(db.post.ALL, orderby=~db.post.created_on, limitby=(start_idx, end_idx + 1))
    for i, r in enumerate(rows):
        if i < end_idx - start_idx:
            create_tuple = r.created_on.strftime("%a %b %d  %Y  @ %H:%M")
            update_tuple = r.updated_on.strftime("%a %b %d  %Y  @ %H:%M")
            t = dict(
                id=r.id,
                post_content=r.post_content,
                username=get_user_name_from_email(r.user_email),
                make_edit=(auth.user.email == r.user_email),
                created_on=create_tuple,
                updated_on=update_tuple
            )
            posts.append(t)
        else:
            has_more = True
    logged_in = auth.user_id is not None
    return response.json(dict(
        posts=posts,
        logged_in=logged_in,
        has_more=has_more,
    ))


# Note that we need the URL to be signed, as this changes the db.
@auth.requires_signature()
def add_post():
    """Here you get a new post and add it.  Return what you want."""
    # Implement me!
    p_id = db.post.insert(
        user_email=auth.user.email,
        post_content=request.vars.post_content
    )
    r = db.post(p_id)
    t = dict(
        id=r.id,
        post_content=r.post_content,
        username=get_user_name_from_email(r.user_email),
        make_edit=(auth.user.email == r.user_email),
        created_on=r.created_on,
        updated_on=r.updated_on
    )
    return response.json(dict(post=t))


@auth.requires_signature()
def edit_post():
    p = db(db.post.id == request.vars.post_id).select().first()  # find and update the post
    p.post_content = request.vars.post_content
    p.updated_on = datetime.utcnow()
    p.update_record()
    r = db.post(request.vars.post_id)
    t = dict(
        id=r.id,
        post_content=r.post_content,
        updated_on=r.updated_on
    )
    return response.json(dict(post=t))

@auth.requires_signature()
def del_post():
    """Used to delete a post."""
    db(db.post.id == request.vars.post_id).delete()
    return "ok"