import psycopg2 
DATABASE_URL = "postgres://avnadmin:AVNS_l5P8Q418hHL3-xYjULw@pg-324e2c81-trainswithus.f.aivencloud.com:22527/defaultdb?sslmode=require"
def get_connection():
    return psycopg2.connect(DATABASE_URL)

def signup(name, email, password):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO usertable (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    conn.commit()
    cur.close()
    conn.close()
    # conn = get_connection()
    # cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    # cur.execute("SELECT * FROM usertable WHERE email = %s", (email,))
    # user = cur.fetchone()
    # cur.close()
    # conn.close()
    # return dict(user) if user else None

def fetch_user_by_email(email):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM usertable WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user

def login(email, password):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM usertable WHERE email = %s AND password = %s", (email, password))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user is not None

def updatePass(email, newpass):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("UPDATE usertable SET password = %s WHERE email = %s", (newpass, email))
    conn.commit()
    cur.close()
    conn.close()
