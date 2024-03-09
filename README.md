# Geospatial Starter App

Here is some starter code to get going with geospatial data and services.  There are tons of things that could have
been used instead, but the choices here are reasonably well regarded (and open source) or considered simply enough 
for a novice to use. 

## Installation

```
docker compose api python manage.py collectstatic
docker compose up -d
```

## Use
Django admin can be viewed at http://localhost:8000/admin  username: admin password: admin (the password can be changed via the admin page).
Geoserver 