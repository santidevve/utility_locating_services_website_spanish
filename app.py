from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/areas-de-servicio.html')
def areas():
    return render_template('areas-de-servicio.html')

@app.route('/solicitar-presupuesto.html')
def quote():
    return render_template('solicitar-presupuesto.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
