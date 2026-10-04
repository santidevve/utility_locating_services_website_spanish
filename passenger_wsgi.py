import sys
import os

# Agrega el directorio actual al path de Python
sys.path.insert(0, os.path.dirname(__file__))

# Importa tu instancia Flask 'app' renombrada a 'application'
from app import app as application

