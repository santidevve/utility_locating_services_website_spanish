# Utility Locating Services Website (Spanish)

This is a modern, responsive website for a Utility Locating Services company. It features a professional landing page, service descriptions, and a functional quote request system backed by a lightweight Flask database.

## 🚀 Features

*   **Modern UI/UX**: Implements Glassmorphism design, smooth scrolling animations, and responsive layouts.
*   **Secure Preview**: Protected by login authentication for professional client demonstrations.
*   **Quote System**: Users can submit service requests which are stored in a local SQLite database.
*   **Tech Stack**: Built with Python (Flask), Flask-Login, SQLAlchemy, HTML5, CSS3, and Vanilla JavaScript.

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

4.  **Configure Environment Variables**
    
    Create a `.env` file in the project root:
    ```bash
    cp .env.example .env
    ```
    
    Edit the `.env` file with your credentials:
    - `SECRET_KEY`: Generate a random secret key
    - `PREVIEW_USERNAME`: Username for site access (e.g., "cliente")
    - `PREVIEW_PASSWORD`: A secure password
    
    **⚠️ IMPORTANT**: The `.env` file is already in `.gitignore` and will NOT be committed to Git.

## ▶️ Running the Application

1.  **Start the local server**
    ```bash
    python app.py
    ```

2.  **Access the site**
    Open your web browser and go to:
    [http://localhost:5000](http://localhost:5000)
    
    You will be redirected to the login page.

3.  **Login**
    Use the credentials you configured in your `.env` file:
    - Username: The value of `PREVIEW_USERNAME`
    - Password: The value of `PREVIEW_PASSWORD`

4.  **Navigate the site**
    After successful authentication, you can freely browse all pages.

## 🔒 Security Features

The site includes a simple authentication barrier for production previews:

- **Protected Routes**: All pages require authentication except `/login`
- **Session Management**: Uses Flask-Login for secure session handling
- **Environment Variables**: Credentials stored securely in `.env` file
- **Auto-redirect**: Unauthenticated users are automatically redirected to login

**For Production Deployment**: 
1. Update `.env` with production credentials
2. Set `FLASK_ENV=production`
3. Share login credentials securely with your client

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
