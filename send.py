import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_mail(text,mail,name):
# Gmail credentials
    sender_email = "taniskvolley@gmail.com"  # Replace with your Gmail
    app_password = "cwpr qlap xoko yhju"   # App password (from Google)

    # Recipient
    receiver_email = "taniskvolley@gmail.com"
    subject = name+" "+"want to contact uhh"
    body = mail + text

    # Compose message
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    # Attach body
    message.attach(MIMEText(body, "plain"))

    try:
        # Connect to Gmail SMTP server
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, app_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
            print("✅ Email sent successfully!")

    except Exception as e:
        print("❌ Failed to send email:", e)


