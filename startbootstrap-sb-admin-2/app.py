from flask import Flask, render_template, jsonify, request
import pandas as pd
import pymongo

app = Flask(__name__,static_folder="./static")

@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/login")
@app.route("/")
def login():
    return render_template("login.html")

@app.route("/forgot-password")
def forgot_password():
    return render_template("forgot-password.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/trade")
def trade():
    return render_template("blank.html")

@app.route("/CSales")
def CSales():
    return render_template("blankS.html")

@app.route("/Hcars")
def Hcars():
    return render_template("blankH.html")

@app.route("/test")
def test():
    return render_template("test.html")

@app.route("/tendencies")
def tendencies():
    return render_template("tendencies.html")

@app.route("/sales")
@app.route("/sales/<year>")
def sales(year="2019"):
    # aqui me conecto a mi mongo db y pido todos los datos
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["FinalProject"]
    mycol = mydb["BrandFilter"]
    resultado = mycol.find({"Year":year},{"_id":False})
    resultado= [x for i,x in enumerate(resultado)]
    return jsonify (resultado)

@app.route("/salesComplete")
def salesComplete():
    # aqui me conecto a mi mongo db y pido todos los datos
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["FinalProject"]
    mycol = mydb["sales"]
    salesC = mycol.find({}, {'_id': False})
    salesC= [x for i,x in enumerate(salesC)]
    return jsonify (salesC)

@app.route("/hybrid")
def hybrid():
    # aqui me conecto a mi mongo db y pido todos los datos
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["FinalProject"]
    mycol = mydb["HybridFilter"]
    resultadoHybrid = mycol.find({}, {'_id': False})
    resultadoHybrid= [x for i,x in enumerate(resultadoHybrid)]
    return jsonify (resultadoHybrid)


@app.route("/hybridComplete")
def hybridComplete():
    # aqui me conecto a mi mongo db y pido todos los datos
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["FinalProject"]
    mycol = mydb["Hybrid"]
    resultadoHybridC = mycol.find({}, {'_id': False})
    resultadoHybridC= [x for i,x in enumerate(resultadoHybridC)]

    anio2019={}
    anio2018={}
    anio2017={}
    anio2016={}

    for x in resultadoHybridC:
        if x["Year"]=="2019":
            if x["Month"] in anio2019:
                anio2019[x["Month"]]+=int(x["Total"])
            else:
                anio2019[x["Month"]]=int(x["Total"])
            
        if x["Year"]=="2018":
            if x["Month"] in anio2018:
                anio2018[x["Month"]]+=int(x["Total"])
            else:
                anio2018[x["Month"]]=int(x["Total"])

        if x["Year"]=="2017":
            if x["Month"] in anio2017:
                anio2017[x["Month"]]+=int(x["Total"])
            else:
                anio2017[x["Month"]]=int(x["Total"])

        if x["Year"]=="2016":
            if x["Month"] in anio2016:
                anio2016[x["Month"]]+=int(x["Total"])
            else:
                anio2016[x["Month"]]=int(x["Total"])

    datosporanio = pd.DataFrame([anio2019,anio2018, anio2017, anio2016], index=[2019,2018,2017,2016])
    return datosporanio.to_json()


@app.route('/h44')
def h1():
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["FinalProject"]
    connect = mydb["BrandFilter2"]
    res = list(connect.find({},{"_id":False}))
    return jsonify(res)
  

if __name__ == "__main__":
    app.run()