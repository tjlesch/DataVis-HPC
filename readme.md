To run the tool you will first need to download the git repository. After downloading the git repository you will then need to open a local webserver. This can be done with a simple python command. After running the local webpage please go to that local webpage in google chrome (other browsers have not yet been tested) and you should see the tool. 
git clone https://github.com/tjlesch/DataVis-HPC
cd DataVis-HPC
python -m http.server 8080
type http://localhost:8080/HPC/ into browser
