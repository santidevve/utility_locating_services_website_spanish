from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from dotenv import load_dotenv
from datetime import datetime, timedelta
import os

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)

# Configuración desde variables de entorno
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback-dev-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///utility.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuración de sesión - Timeout de 5 minutos de inactividad
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)
app.config['SESSION_PERMANENT'] = True  # Las sesiones se marcan como permanentes por defecto

# Configurar Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.login_message = 'Por favor inicia sesión para acceder al sitio.'
login_manager.login_message_category = 'info'

db = SQLAlchemy(app)

# Clase User simple para autenticación
class User(UserMixin):
    """Usuario simple para autenticación basada en .env"""
    def __init__(self, username):
        self.id = username

@login_manager.user_loader
def load_user(user_id):
    """Cargar usuario desde el ID de sesión"""
    if user_id == os.getenv('PREVIEW_USERNAME'):
        return User(user_id)
    return None

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
@login_required
def index():
    """Página principal - protegida por autenticación"""
    return render_template('index.html')

@app.route('/areas-de-servicio.html')
@login_required
def areas():
    """Página de áreas de servicio - protegida por autenticación"""
    return render_template('areas-de-servicio.html')

@app.route('/faq')
@login_required
def faq():
    """Página de FAQ - protegida por autenticación"""
    return render_template('faq.html')

@app.route('/solicitar-presupuesto.html', methods=['GET', 'POST'])
@login_required
def quote():
    """Página de solicitud de presupuesto - protegida por autenticación"""
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

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Página de login - única ruta pública"""
    # Si ya está autenticado, redirigir al inicio
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Validar credenciales contra variables de entorno
        if username == os.getenv('PREVIEW_USERNAME') and password == os.getenv('PREVIEW_PASSWORD'):
            user = User(username)
            login_user(user)
            
            # Marcar la sesión como permanente para aplicar el timeout de 5 minutos
            session.permanent = True
            
            flash('¡Bienvenido! Has iniciado sesión correctamente.', 'success')
            
            # Redirigir a la página solicitada o al inicio
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('index'))
        else:
            flash('Usuario o contraseña incorrectos.', 'error')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    """Cerrar sesión del usuario"""
    logout_user()
    flash('Has cerrado sesión correctamente.', 'info')
    return redirect(url_for('login'))

if __name__ == '__main__':
    # Configuración del servidor desde variables de entorno
    debug_mode = os.getenv('FLASK_ENV') == 'development'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)
