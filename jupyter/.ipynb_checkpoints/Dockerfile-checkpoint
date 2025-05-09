# Basis-Image für JupyterLab
FROM jupyter/datascience-notebook:latest

# Arbeitsverzeichnis setzen
WORKDIR /home/jovyan

# Notebook-Dateien kopieren
COPY notebooks /home/jovyan/notebooks

# Jupyter Port freigeben
EXPOSE 8888

# Startbefehl für Jupyter
CMD ["start-notebook.sh", "--NotebookApp.token=''"]
