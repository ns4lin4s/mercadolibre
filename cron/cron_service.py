#Lo ocupo solo para desarrolo.
import requests 
r = requests.get('http://localhost:3000/cron')
print(r.status_code)