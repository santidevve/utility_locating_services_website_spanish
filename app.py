from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
# Default to local Postgres, but allow for environment variable override
# Fallback to sqlite if postgres fails or for easier local dev without setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///utility.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
#     "client_encoding": "utf8"
# }
app.secret_key = 'super_secret_key' # Needed for flash messages

db = SQLAlchemy(app)

class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    services = db.Column(db.String(500)) # Stored as comma-separated string
    purpose = db.Column(db.String(100))
    explain = db.Column(db.Text)
    dimensions = db.Column(db.String(100))
    service_date = db.Column(db.Date)
    address = db.Column(db.String(200))
    city = db.Column(db.String(100))
    state = db.Column(db.String(50))
    zip_code = db.Column(db.String(20))
    client_type = db.Column(db.String(50))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(50))
    email = db.Column(db.String(100))
    staff_talk = db.Column(db.String(10))
    has_proposal = db.Column(db.String(10))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Quote {self.id} - {self.name}>'

with app.app_context():
    try:
        db.create_all()
        print("Database connected and tables created.")
    except Exception as e:
        print(f"Error connecting to database: {e}")
        # Ideally fallback to SQLite here if strictly needed, but kept simple for now

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/areas-de-servicio.html')
def areas():
    return render_template('areas-de-servicio.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/solicitar-presupuesto.html', methods=['GET', 'POST'])

def quote():
    if request.method == 'POST':
        try:
            # Extract data from form
            services = ",".join(request.form.getlist('services[]'))
            new_quote = Quote(
                services=services,
                purpose=request.form.get('purpose'),
                explain=request.form.get('explain'),
                dimensions=request.form.get('dimensions'),
                service_date=datetime.strptime(request.form.get('date'), '%Y-%m-%d'),
                address=request.form.get('address'),
                city=request.form.get('city'),
                state=request.form.get('state'),
                zip_code=request.form.get('zip'),
                client_type=request.form.get('client_type'),
                name=request.form.get('name'),
                phone=request.form.get('phone'),
                email=request.form.get('email'),
                staff_talk=request.form.get('staff_talk'),
                has_proposal=request.form.get('has_proposal')
            )
            db.session.add(new_quote)
            db.session.commit()
            flash('¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.', 'success')
            return redirect(url_for('quote'))
        except Exception as e:
            db.session.rollback()
            flash(f'Error al enviar la solicitud: {str(e)}', 'error')
            print(f"Error saving quote: {e}")

    return render_template('solicitar-presupuesto.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
