# Temel olarak resmi Python 3.10 imajını al
FROM python:3.10

# Bilgisayarımızı kirletmemek için tüm komutları kutunun içindeki /app klasöründe çalıştır
WORKDIR /app

# Önce sadece bağımlılık listesini kopyala (bu hızlı build almayı sağlar)
COPY requirements.txt .

# Django, DRF, psycopg2-binary (Postgres'e bağlanmak için) gibi her şeyi kur
RUN pip install -r requirements.txt

# Şimdi projenin geri kalan tüm kodlarını /app klasörüne kopyala
COPY . .

# Bu kutu çalıştığında otomatik olarak Django'yu 8000 portunda başlat
# 0.0.0.0 demek "kutunun dışından gelen her isteği kabul et" demektir. Bu şart.
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]