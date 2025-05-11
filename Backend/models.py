from config import db

class Estado(db.Model):
    __tablename__ = 'estados'
    cod_edo = db.Column(db.Integer, primary_key = True, autoincrement = False)
    name = db.Column(db.String(100), nullable=False, index = True)
    def to_json(self):
        return {
            'cod_edo': self.cod_edo,
            'name': self.name
            }

class Municipio(db.Model):
    __tablename__ = 'municipios'
    id = db.Column(db.String, primary_key = True, autoincrement = False)
    cod_mun = db.Column(db.Integer)
    name = db.Column(db.String(100), nullable=False, index = True)
    cod_edo = db.Column(db.Integer)
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'cod_mun': self.cod_mun,
            'cod_edo': self.cod_edo
            }

class Parroquia(db.Model):
    __tablename__ = 'parroquias'
    cod_par = db.Column(db.Integer, primary_key = True, autoincrement = False)
    name = db.Column(db.String(100), nullable=False, index = True)
    cod_mun = db.Column(db.Integer)
    mun_id = db.Column(db.String)
    cod_edo = db.Column(db.Integer)
    def to_json(self):
        return {
            'cod_par': self.cod_par,
            'name': self.name,
            'cod_mun': self.cod_mun,
            'mun_id': self.mun_id,
            'cod_edo': self.cod_edo
            }

class Centro(db.Model):
    __tablename__ = 'centros'
    name = db.Column(db.Integer, primary_key = True, autoincrement = False, index = True)
    cod_par = db.Column(db.Integer)
    mun_id = db.Column(db.String)
    cod_edo = db.Column(db.Integer)
    
    def to_json(self):
        return {
            'name': self.name,
            'cod_par': self.cod_par,
            'mun_id': self.mun_id,
            'cod_edo': self.cod_edo
            }

class Mesa(db.Model):
    __tablename__ = 'mesas'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.Integer, index = True)
    centro = db.Column(db.Integer)
    cod_par = db.Column(db.Integer)
    mun_id = db.Column(db.String)
    cod_edo = db.Column(db.Integer)
    votos_validos = db.Column(db.Integer)
    votos_nulos = db.Column(db.Integer)
    EG = db.Column(db.Integer)
    NM = db.Column(db.Integer)
    LM = db.Column(db.Integer)
    JABE = db.Column(db.Integer)
    JOBR = db.Column(db.Integer)
    AE = db.Column(db.Integer)
    CF = db.Column(db.Integer)
    DC = db.Column(db.Integer)
    EM = db.Column(db.Integer)
    BERA = db.Column(db.Integer)
    def to_json(self):
        return {
            'name': self.name,
            'centro': self.centro,
            'cod_par': self.cod_par,
            'mun_id': self.mun_id,
            'cod_edo': self.cod_edo,
            'votos_validos': self.votos_validos,
            'votos_nulos': self.votos_nulos,
            'EG': self.EG,
            'NM': self.NM,
            'LM': self.LM,
            'JABE': self.JABE,
            'JOBR': self.JOBR,
            'AE': self.AE,
            'CF': self.CF,
            'DC': self.DC,
            'EM': self.EM,
            'BERA': self.BERA
            }
        
        
