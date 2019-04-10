#!/usr/bin/env bash

# Ensure the log file exists

touch /crontab.log

# Ensure permission on the command
#chmod a+x /cron_service.py

# Added a cronjob in a new crontab
#echo "* * * * * python /cron_service.py >> /logs/crontab.log 2>&1" > /etc/crontab
echo "* * * * * /usr/bin/curl --silent http://app:3000/cron > /crontab.log 2>&1" > /etc/crontab
# Registering the new crontab
crontab /etc/crontab

# Starting the cron
/usr/sbin/service cron start

# Displaying logs
# Useful when executing docker-compose logs mycron
tail -f /crontab.log