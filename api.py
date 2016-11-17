def index():
    pass

def get_user_name_from_email(email):
    """Returns a string corresponding to the user first and last names,
    given the user email."""
    u = db(db.auth_user.email == email).select().first()
    if u is None:
        return 'None'
    else:
        return ' '.join([u.first_name, u.last_name])

@auth.requires_signature()
# Get the user's info to display on home page. Info is none if not logged_in. Works like get_posts in hw3
# for logged_in status
def get_user_info():
    logged_in = auth.user_id is not None
    if logged_in:
        person = db(db.person.user_email).select().first()
        current_balance = person.current_balance
    else:
        person = None
        current_balance = None
    return response.json(dict(
        logged_in=logged_in,
        person=person,
        current_balance=current_balance
    ))

@auth.requires_signature()
def update_info():
    return response.json(dict(
    ))

@auth.requires_signature()
# Gets average info for all users
def get_average_info():
    users = db().select(db.users.ALL)
    avg_bal = 0
    avg_spendings = 0
    avg_income = 0
    for user in users:
        avg_bal += user.cur_balance
        avg_income += user.income
        avg_spendings += user.spendings
    avg_bal = avg_bal / db.users.size()
    avg_income = avg_income / db.users.size()
    avg_spendings = avg_spendings / db.users.size()
    return response.json(dict(
        avg_bal=avg_bal,
        avg_income=avg_income,
        avg_spend=avg_spendings
    ))