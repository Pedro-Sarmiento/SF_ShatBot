from src import create_app
from src.routes.routes import api as api_blueprint

app = create_app()

app.register_blueprint(api_blueprint)
app.debug=True

if __name__ == "__main__":
    app.run(host='0.0.0.0') 
    