from flask import request, jsonify
from sqlalchemy import or_
from config import app, db, jwt
from models import Estado, Municipio, Parroquia, Centro, Mesa
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import pandas as pd
import os

@app.route("/leer_api")
def leer_api():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, "static/csv/Resultados.csv")
    df = pd.read_csv(csv_path, encoding="latin-1")
    estados = []
    codigos_ed = []
    municipios = []
    codigos_mun = []
    parroquias = []
    codigos_par = []
    centros = []
    codigos_cent = []
    mesas = []
    mesas_id = []
    for item in df.values.tolist():
        cod_edo = item[0]
        nombre_edo = item[1]
        cod_mun = item[2]
        nombre_mun = item[3]
        cod_par = item[4]
        nombre_par = item[5]
        nombre_centro = item[6]
        nombre_mesa = item[7]
        votos_validos = item[8]
        votos_nulos = item[9]
        EG = item[10]
        NM = item[11]
        LM = item[12]
        JABE = item[13]
        JOBR = item[14]
        AE = item[15]
        CF = item[16]
        DC = item[17]
        EM = item[18]
        BERA = item[19]
        mun_id = f"M{str(cod_mun)}" + f"E{str(cod_edo)}"

        estado = Estado(cod_edo=cod_edo, name=nombre_edo)
        municipio = Municipio(id=mun_id, cod_mun=cod_mun, name=nombre_mun, cod_edo=cod_edo)
        parroquia = Parroquia(cod_par=cod_par, name=nombre_par, cod_mun=cod_mun, mun_id=mun_id, cod_edo=cod_edo)
        centro = Centro(name=nombre_centro, cod_par=cod_par, mun_id=mun_id, cod_edo=cod_edo)
        mesa = Mesa(name=nombre_mesa, centro=nombre_centro, cod_par=cod_par, mun_id=mun_id, cod_edo=cod_edo, votos_validos=votos_validos, votos_nulos=votos_nulos, EG=EG, NM=NM, LM=LM, JABE=JABE, JOBR=JOBR, AE=AE, CF=CF, DC=DC, EM=EM, BERA=BERA)
        if estado.cod_edo not in codigos_ed: 
            estados.append(estado)
            codigos_ed.append(cod_edo)
        if (mun_id not in codigos_mun): 
            municipios.append(municipio)
            codigos_mun.append(mun_id)
        if parroquia.cod_par not in codigos_par: 
            parroquias.append(parroquia)
            codigos_par.append(cod_par)
        if centro.name not in codigos_cent: 
            centros.append(centro)
            codigos_cent.append(nombre_centro)
            centro.name,centro.cod_par
        if mesa.id not in mesas_id:
            mesas.append(mesa)
    try:
        db.session.bulk_save_objects(estados)
        db.session.bulk_save_objects(municipios)
        db.session.bulk_save_objects(parroquias)
        db.session.bulk_save_objects(centros)
        db.session.bulk_save_objects(mesas)
        db.session.commit()
        
    except Exception as e:
        return jsonify({"message": str(e)}), 200
    return jsonify({"message": "api leida"})

@app.route("/get_api", methods = ["GET"])
def get_api():
    estados = Estado.query.all()
    json_estados = list(map(lambda x: x.to_json(), estados))
    municipios = Municipio.query.all()
    json_municipios = list(map(lambda y: y.to_json(), municipios))
    parroquias = Parroquia.query.all()
    json_parroquias = list(map(lambda z: z.to_json(), parroquias))
    centros = Centro.query.all()
    json_centros = list(map(lambda w: w.to_json(), centros))
    mesas = Mesa.query.all()
    json_mesas = list(map(lambda e: e.to_json(), mesas))
    return jsonify({
        "estados": json_estados,
        "municipios": json_municipios,
        "parroquias": json_parroquias,
        "centros": json_centros,
        "mesas": json_mesas
    })

@app.route("/get_votos")
def get_votos():
    mesas = Mesa.query.all()
    json_mesas = list(map(lambda e: e.to_json(), mesas))
    return sumar_votos(json_mesas)

@app.route("/get_votos/<lugar>")
def get_votos_lugares(lugar):
    cod = lugar[1:]
    json = {}
    if is_estado(lugar):
        mesas = Mesa.query.filter_by(cod_edo = cod)
        json_mesas = list(map(lambda e: e.to_json(), mesas))
        json = sumar_votos(json_mesas)
    elif is_mun(lugar):
        mesas = Mesa.query.filter_by(mun_id = lugar)
        json_mesas = list(map(lambda e: e.to_json(), mesas))
        json = sumar_votos(json_mesas)
    elif is_parroquia(lugar):
        mesas = Mesa.query.filter_by(cod_par = cod)
        json_mesas = list(map(lambda e: e.to_json(), mesas))
        json = sumar_votos(json_mesas)
    elif is_centro(lugar):
        centro = Centro.query.filter_by(name = cod).first()
        parroquia = Parroquia.query.filter_by(cod_par = centro.cod_par).first()
        mesas = Mesa.query.filter_by(centro = cod)
        json_mesas = list(map(lambda e: e.to_json(), mesas))
        json = sumar_votos(json_mesas)
        votos_par = get_votos_lugares(f"P{parroquia.cod_par}").to_json()
        return json
    return json, 200


def sumar_votos(json_mesas):
    votos_validos = 0
    votos_nulos = 0
    EG = 0
    NM = 0
    LM = 0
    JABE = 0
    JOBR = 0
    AE = 0
    CF = 0
    DC = 0
    EM = 0
    BERA = 0

    for mesa in json_mesas:
        votos_validos += mesa["votos_validos"]
        votos_nulos += mesa["votos_nulos"]
        EG += mesa["EG"]
        NM += mesa["NM"]
        LM += mesa["LM"]
        JABE += mesa["JABE"]
        JOBR += mesa["JOBR"]
        AE += mesa["AE"]
        CF += mesa["CF"]
        DC += mesa["DC"]
        EM += mesa["EM"]
        BERA += mesa["BERA"]
    votos_totales = votos_nulos + votos_validos
    return jsonify({
        "votos_totales": votos_totales,
        "votos_nulos": votos_nulos,
        "EG": EG,
        "NM": NM,
        "LM": LM,
        "JABE": JABE,
        "JOBR": JOBR,
        "AE": AE,
        "CF": CF,
        "DC": DC,
        "EM": EM,
        "BERA": BERA}
        )

def is_estado(lugar):
    if lugar[0] == ("E"):
        cod = lugar[1:]
        if cod.isdigit():
            edo = Estado.query.filter_by(cod_edo = cod).first()
            if not edo:
                return False
            else:
                return True
        else:
            return False
    else:
        return False
    
def is_mun(lugar):
    mun = Municipio.query.filter_by(id = lugar).first()
    if not mun:
        return False
    else:
        return True

def is_parroquia(lugar):
    if lugar[0] == ("P"):
        cod = lugar[1:]
        if cod.isdigit():
            par = Parroquia.query.filter_by(cod_par = cod).first()
            if not par:
                return False
            else:
                return True
        else: return False
    else:
        return False
    
def is_centro(lugar):
    if lugar[0] == ("C"):
        cod = lugar[1:]
        if cod.isdigit():
            cen = Centro.query.filter_by(name = cod).first()
            if not cen:
                return False
            else:
                return True
        else:
            return False
    else:
        return False
    

@app.route("/search")
def search_tables():
    search_term = request.args.get('q')
    if not search_term:
        return jsonify({'error': 'Parámetro "q" requerido'}), 400
    
    results = []
    models = [Estado, Municipio, Parroquia, Centro, Mesa]

    for model in models:
        columns = [col for col in model.__table__.columns if isinstance(col.type, db.String)]
        
        if not columns:
            continue
        
        filters = or_(*[col.ilike(f'%{search_term}%') for col in columns])
        
        try:
            records = model.query.filter(filters).all()
            for record in records:
                tabla = model.__name__
                if tabla == "Estado":
                    results.append({
                    'tabla': model.__name__,
                    'registro': record.to_json()})
                elif tabla == "Municipio":
                    edo = Estado.query.filter_by(cod_edo=record.cod_edo).first()
                    results.append({
                    'tabla': model.__name__,
                    'registro': record.to_json(),
                    'estado': edo.to_json().get('name')
                })
                elif tabla == "Parroquia":
                    edo = Estado.query.filter_by(cod_edo=record.cod_edo).first()
                    mun = Municipio.query.filter_by(id=record.mun_id).first()
                    results.append({
                    'tabla': model.__name__,
                    'registro': record.to_json(),
                    'estado': edo.to_json().get('name'),
                    'municipio': mun.to_json().get('name')
                })
        except Exception as e:
            app.logger.error(f"Error buscando en {model.__name__}: {str(e)}")

    return jsonify(results)

@app.route("/token", methods=["POST"])
def create_token():
    data = request.json.get()
    email = data.get("email", None)
    password = data.get("password", None)

    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
