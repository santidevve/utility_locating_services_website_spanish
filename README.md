# Utility Locating Services Website (Spanish)

This is a modern, responsive website for a Utility Locating Services company. It features a professional landing page, service descriptions, and a functional quote request system backed by a lightweight Flask database.

## 🚀 Features

*   **Modern UI/UX**: Implements Glassmorphism design, smooth scrolling animations, and responsive layouts.
*   **Quote System**: Users can submit service requests which are stored in a local SQLite database.
*   **Tech Stack**: Built with Python (Flask), SQLAlchemy, HTML5, CSS3, and Vanilla JavaScript.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
*   [Python 3.8+](https://www.python.org/downloads/)
*   `pip` (Python package manager)

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <your-repository-url>
    cd utility_locating_services_website_spanish
    ```

2.  **Create a Virtual Environment**
    It's recommended to use a virtual environment to manage dependencies.

    *   **Windows**:
        ```bash
        python -m venv .venv
        .venv\Scripts\activate
        ```
    *   **macOS / Linux**:
        ```bash
        python3 -m venv .venv
        source .venv/bin/activate
        ```

3.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

## ▶️ Running the Application

1.  **Start the local server**
    ```bash
    python app.py
    ```

2.  **View locally**
    Open your web browser and go to:
    [http://localhost:5000](http://localhost:5000)

## 🗄️ Database

The application uses **SQLite** (`utility.db`). The database file and tables are automatically created the first time you run the application. No manual setup is required.

## 📂 Project Structure

*   `app.py`: Main Flask application logic and database models.
*   `templates/`: HTML files (`index.html`, `solicitar-presupuesto.html`, etc.).
*   `static/`:
    *   `css/`: Stylesheets (`style.css`).
    *   `js/`: JavaScript files (`script.js`).
    *   `images/`: Assets.
*   `requirements.txt`: List of Python library dependencies.

## 🤝 Contributing

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
