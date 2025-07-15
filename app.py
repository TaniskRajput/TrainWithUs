from flask import Flask, render_template, request, redirect, session, url_for, flash
from db import signup, fetch_user_by_email
from werkzeug.security import check_password_hash
from send import send_mail

app = Flask(__name__, template_folder="frontend")
app.secret_key = "your_secret_key"  # Needed for session management

@app.route("/")
def home():
    if 'user' in session:
        return render_template("index.html")  # Homepage for logged-in users
    return redirect(url_for("login_route"))  # Redirect to login if not logged in

@app.route("/schedule")
def schedule():
    if 'user' not in session:
        return redirect(url_for('login_route'))
    return render_template("schedule.html")

@app.route("/signup", methods=["GET", "POST"])
def signup_route():
    if request.method == 'GET':
        return render_template("signup.html")

    # Get form data
    name = request.form.get("name")
    email = request.form.get("email")
    password = request.form.get("password")
    confirm_password = request.form.get("confirmPassword")

    if password != confirm_password:
        flash("❌ Passwords do not match!")
        return redirect(url_for("signup_route"))
    
    signup(name, email, password)
    flash("✅ Signup successful. Please log in.")
    return redirect(url_for("login_route"))

@app.route("/login", methods=["GET", "POST"])
def login_route():
     if 'user' in session:
        return redirect(url_for("home"))

     if request.method == 'GET':
        return render_template("login.html")

    # POST: Login form submitted
     email = request.form.get("email")
     password = request.form.get("password")

     user = fetch_user_by_email(email)
     print(user)

     if user:
        if password == user[3]:
            session['user'] = user[2]
            return redirect(url_for("home"))
        else:
            flash("❌ Incorrect password.")
            return redirect(url_for("login_route"))
     else:
        flash("❌ Email not found.")
        return redirect(url_for("login_route"))
    # if 'user' in session:
    #     return redirect(url_for("home")) 

    # if request.method == 'GET':
    #     return render_template("login.html")

    # # POST: Login form submitted
    # email = request.form.get("email")
    # password = request.form.get("password")

    # user = fetch_user_by_email(email)
    # print(user)
    # if user:
    #     # Directly compare plain password for testing purposes
    #     if password == user['password']:
    #         session['user'] = user['email']
    #         flash("✅ Logged in successfully!", "success")
    #         return redirect(url_for("home"))
    #     else:
    #         flash("❌ Incorrect password.", "danger")
    #         return redirect(url_for("login_route"))
    # else:
    #     flash("❌ Email not found.", "danger")
    #     return redirect(url_for("login_route"))
    
    # if user:  # secure password check
    #     session['user'] = email
    #     return redirect(url_for("home"))  # 🔁 Server-side redirect to homepage
    # else:
    #     flash("❌ Invalid email or password.")
    #     return redirect(url_for("login_route"))  # Reload login page with error.
@app.route("/logout")
def logout():
    session.pop('user', None)
    return redirect(url_for("login_route"))

@app.route("/email_send",methods=["POST","GET"])
def send_email(): 
    if request.method=='POST':
        send_mail(request.form.get("message"),request.form.get("email"),request.form.get("name"))
        # return  "MAIL SENT!"
        return redirect(url_for("login_route"))
    else:
        return redirect(url_for("login_route"))
