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

db.define_table('user',
		Field('user_name', get_name()),
                Field('user_email', get_email()),
  		Field('gender', requires=IS_IN_SET(['Male', 'Female'], 						error_message='Please choose a category'))
                #Field('job'), is our budget planner for students only?
		Field('age', 'integer'),
		Field('current balance', 'double'),
                Field('goal'),
                Field('income', 'double'),
                Field('spendings', db.spendings)
                )

db.define_table('spendings',
                Field('rent', 'double'),
		Field('food', 'double'),
		Field('utilities', 'double'),
		Field('car(transportation)', 'double'),
		Field('others', 'double'),
                Field('total', 'double')
		)


# after defining tables, uncomment below to enable auditing
auth.enable_record_versioning(db)

