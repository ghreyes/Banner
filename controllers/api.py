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
    user = db(db.person.user_email == auth.user.email).select().first()
    if logged_in:
        #user profile not setup yet, give them default values
        if not user:
            p_id = db.person.insert(
                user_email=auth.user.email,
                gender='Unspecified',
                age='18',
                current_balance='0',
                goal='0',
                income='0',
                rent='0',
                food='0',
                utilities='0',
                transportation='0',
                other='0',
                total='0'
            )
            p = db.person(p_id)
        # user profile already made
        else:
            p = dict(
                gender=user.gender,
                age=user.age,
                current_balance=user.current_balance,
                goal=user.goal,
                income=user.income,
                rent=user.rent,
                food=user.food,
                utilities=user.utilities,
                transportation=user.transportation,
                other=user.other,
                total=(user.rent + user.food + user.utilities + user.transportation + user.other)
            )
    # user not logged in
    else:
        p = None
    return response.json(dict(
        logged_in=logged_in,
        person=p,
    ))


@auth.requires_signature()
# Update goal and income for now.
def update_stats():
    p = db(db.person.user_email == auth.user.email).select().first()
    logger.info(p)
    p.gender = request.vars.gender
    p.age = request.vars.age
    p.update_record()
    person = dict(
        gender = p.gender,
        age = p.age,
        goal = p.goal,
        income = p.income,
        rent = p.rent,
        food = p.food,
        utilities = p.utilities,
        transportation = p.transportation,
        other = p.other,
        total = p.total
    )
    return response.json(dict(
        person=person
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


def update_costs():
    p = db(db.person.user_email == auth.user.email).select().first()
    logger.info(p)
    p.rent = request.vars.rent
    p.food = request.vars.food
    p.utilities = request.vars.utilities
    p.transportation = request.vars.transportation
    p.other = request.vars.other
    p.total = (request.vars.rent + request.vars.food + request.vars.utilities + request.vars.transportation + request.vars.other)
    p.update_record()
    person = dict(
        gender = p.gender,
        age = p.age,
        goal = p.goal,
        income = p.income,
        rent = p.rent,
        food = p.food,
        utilities = p.utilities,
        transportation = p.transportation,
        other = p.other,
        total = p.total
    )
    return response.json(dict(
        person=person
    ))


def update_balance():
    p = db(db.person.user_email == auth.user.email).select().first()
    logger.info(p)
    p.current_balance = request.vars.current_balance
    p.goal = request.vars.goal
    p.income = request.vars.income
    p.update_record()
    person = dict(
        gender=p.gender,
        age=p.age,
        goal=p.goal,
        income=p.income,
        rent=p.rent,
        food=p.food,
        utilities=p.utilities,
        transportation=p.transportation,
        other=p.other,
        total=p.total
    )
    return response.json(dict(
        person=person
    ))
