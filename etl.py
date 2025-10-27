import json
import psycopg2
import os

# Configurações do banco
conn = psycopg2.connect(
    dbname=os.environ.get('PGDATABASE'),
    user=os.environ.get('PGUSER'),
    password=os.environ.get('PGPASSWORD'),
    host=os.environ.get('PGHOST'),
    port=os.environ.get('PGPORT')
)
cur = conn.cursor()

# Carrega os arquivos JSON
with open('bairros_BH.geojson', encoding='utf-8') as f:
    bairros_data = json.load(f)
with open('temp_bairro_ano_BH.geojson', encoding='utf-8') as f:
    temp_data = json.load(f)

# Insere cidade (exemplo: Belo Horizonte) com id fixo
city_id = 1
cur.execute("INSERT INTO city (id, nome) VALUES (%s, %s);", (city_id, 'Belo Horizonte'))
conn.commit()  # Commit após inserir cidade
print(f"Cidade inserida com id: {city_id}")

# Mapeamento de bairros: id_bairro -> nome_bairro
bairro_id_nome = {}
# Mapeamento de nome_bairro -> id_bairro
bairro_nome_id = {}

# 1. Insere bairros e poligonos
for feature in bairros_data['features']:
    nome_bairro = feature['properties']['NOME']
    id_bairro = feature['id']
    # Insere bairro com id do JSON
    cur.execute(
        "INSERT INTO neighborhood (id, nome, id_city) VALUES (%s, %s, %s);",
        (id_bairro, nome_bairro, city_id)
    )
    bairro_id_nome[id_bairro] = nome_bairro
    bairro_nome_id[nome_bairro] = id_bairro
conn.commit()  # Commit após inserir bairros
print("Bairros inseridos.")

# Insere poligonos
polygon_id = 1
for feature in bairros_data['features']:
    nome_bairro = feature['properties']['NOME']
    neighborhood_id = bairro_nome_id[nome_bairro]
    geom = feature['geometry']
    if geom['type'] == 'Polygon':
        rings = geom['coordinates']
    elif geom['type'] == 'MultiPolygon':
        rings = [ring for poly in geom['coordinates'] for ring in poly]
    else:
        rings = []
    for ring in rings:
        for coord in ring:
            if len(coord) == 2:
                lon, lat = coord
                cur.execute(
                    "INSERT INTO poligons (id, lat, lon, id_neighborhood) VALUES (%s, %s, %s, %s);",
                    (str(polygon_id), lat, lon, neighborhood_id)
                )
                polygon_id += 1
conn.commit()  # Commit após inserir poligonos
print("Poligonos inseridos.")

# 2. Insere dados de temperatura
for feature in temp_data['features']:
    temp_id = feature.get('id', '')
    # O id é no formato '<idx>_<id_bairro>', onde idx indica o ano (0=2015, 1=2016, ...)
    if '_' in temp_id:
        idx, id_bairro = temp_id.split('_', 1)
        try:
            ano = 2015 + int(idx)
        except ValueError:
            continue  # pula se idx não for número
        nome_bairro = bairro_id_nome.get(id_bairro)
        if nome_bairro:
            id_neighborhood = bairro_nome_id[nome_bairro]
            temperatura = feature['properties'].get('temperatura')
            climate_id = temp_id  # Usa o id do JSON como id da tabela climate
            cur.execute(
                "INSERT INTO climate (id, ano, temperature, ndvi, particles, id_neighborhood) VALUES (%s, %s, %s, %s, %s, %s);",
                (climate_id, ano, temperatura, None, None, id_neighborhood)
            )
conn.commit()  # Commit após inserir dados de temperatura
print("Dados de temperatura inseridos.")

# 3. Atualiza coluna particles na tabela climate usando o GeoJSON de AOD
try:
    with open('media_aod_bairros_curitiba.geojson', encoding='utf-8') as f:
        aod_data = json.load(f)
    for feature in aod_data['features']:
        climate_id = feature['id']
        particles = feature['properties'].get('media_AOD')
        cur.execute(
            "UPDATE climate SET particles = %s WHERE id = %s;",
            (particles, climate_id)
        )
    conn.commit()
    print("Coluna particles atualizada com sucesso.")
except FileNotFoundError:
    print("Arquivo media_aod_bairros_curitiba.geojson não encontrado. Pulando atualização de particles.")

cur.close()
conn.close()
