# Define your tables below (or better in another model file) for example
#
# >>> db.define_table('mytable', Field('myfield', 'string'))
#
# Fields can be 'string','text','password','integer','double','boolean'
#       'date','time','datetime','blob','upload', 'reference TABLENAME'
# There is an implicit 'id integer autoincrement' field
# Consult manual for more options, validators, etc.

import datetime

def get_name():
    if auth.user: return auth.user.first_name + " " + auth.user.last_name
    else:         return 'No Name Specified'

def get_email():
    if auth.user: return auth.user.email
    else:         return 'No E-mail Specified'

db.define_table('post',
                Field('user_email', default=auth.user.email if auth.user_id else None),
                Field('post_content', 'text'),
                Field('created_on', 'datetime', default=datetime.datetime.utcnow()),
                Field('updated_on', 'datetime', update=datetime.datetime.utcnow()),
                )

db.post.user_email.readable = db.post.user_email.writable = False
db.post.post_content.requires = IS_NOT_EMPTY()
db.post.created_on.readable = db.post.created_on.writable = False
db.post.updated_on.readable = db.post.updated_on.writable = False


#the code for user may better fit in db.py under the auth_user.extra_fields function
db.define_table('person',
		        #Field('user_name', get_name()),
                Field('user_email', default=auth.user.email if auth.user_id else None),
                Field('gender', requires=IS_IN_SET(['Male', 'Female', 'Unspecified'], error_message='Please choose a category')),
                #Field('job'), is our budget planner for students only?
                Field('age', 'integer'),
                Field('current_balance', 'double'),
                Field('goal', 'double'),
                Field('income', 'double'),
                Field('rent', 'double'),
                Field('food', 'double'),
                Field('utilities', 'double'),
                Field('transportation', 'double'),
                Field('other', 'double'),
                Field('total', 'double')
)

# after defining tables, uncomment below to enable auditing
auth.enable_record_versioning(db)



