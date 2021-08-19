# Analysis Using TimescaleDB
Get all the results within a time period.

```
PORT=5432
with SSHTunnelForwarder(('ipaddress.com'),
                        ssh_username='',
                        ssh_password='',
                        remote_bind_address=('localhost', PORT),
                        local_bind_address=('localhost', PORT)):

    try:
        conn = psycopg2.connect(dbname='spatempdb',
                                user='',
                                host='localhost',
                                port = 5432,
                                password='')
        cursor = conn.cursor()
        print('connected', cursor)
    except:
        print('notconnected')

    ds_id = '27' # the datastream id you want to query
    st_time = '2021-03-30 12:29:00-4'
    end_time = '2021-03-30 13:29:00-4'

    command =   """
                SELECT "RESULT_NUMBER"
                FROM public."OBSERVATIONS"
                WHERE "DATASTREAM_ID" = %s and "RESULT_TIME" > '%s' and "RESULT_TIME" < '%s';
                """ %(ds_id, st_time, end_time)

    cursor.execute(command)
    rows = cursor.fetchall()
    print(len(rows))
    for r in rows:
        print(r)
    cursor.close()
```

## time_bucket()
time_bucket() allows you to average out the results at arbitrary intervals. For example you can extract the results for every 1 hour, 1 week or 15 minute. TimescaleDB will do the averaging for you. For more information refer to the  <a href="https://docs.timescale.com/api/latest/hyperfunctions/time_bucket/#time-bucket" target="_blank">time_bucket() documentation</a>

We are using the Python library psycopg2 to access masa3db. Here is an example script to extract data from the OBSERVATIONS table of the FROST-Server.
```
import psycopg2
from sshtunnel import SSHTunnelForwarder

PORT=5432
with SSHTunnelForwarder(('ipaddress.com'),
                        ssh_username='',
                        ssh_password='',
                        remote_bind_address=('localhost', PORT),
                        local_bind_address=('localhost', PORT)):

    try:
        conn = psycopg2.connect(dbname='spatempdb',
                                user='',
                                host='localhost',
                                port = 5432,
                                password='')
        cursor = conn.cursor()
    except:
        print('notconnected')

    ds_id = '27' # the datastream id you want to query
    st_time = '2021-03-30 12:29:00-4'
    end_time = '2021-03-30 13:29:00-4'
    #===============================================================================================
    #Get the median of the results
    #===============================================================================================
    command =   """
                SELECT time_bucket('15 minute', "RESULT_TIME") AS avg_time,
                percentile_cont(0.5) WITHIN GROUP (ORDER BY "RESULT_NUMBER") AS median_value
                FROM public."OBSERVATIONS"
                WHERE "DATASTREAM_ID" = %s and "RESULT_TIME" > '%s' and "RESULT_TIME" < '%s'
                GROUP BY avg_time
                ORDER BY avg_time DESC;
                """ %(ds_id, st_time,end_time)

    cursor.execute(command)
    rows = cursor.fetchall()
    print(len(rows))
    for r in rows:
        print(r)

    #===============================================================================================
    #Get the average of the results
    #===============================================================================================
    command =   """
                SELECT time_bucket('1 hour', "RESULT_TIME") AS avg_time, AVG("RESULT_NUMBER")
                FROM public."OBSERVATIONS"
                WHERE "DATASTREAM_ID" = %s and "RESULT_TIME" > '%s' and "RESULT_TIME" < '%s'
                GROUP BY avg_time
                ORDER BY avg_time DESC;
                """ %(ds_id, st_time,end_time)

    cursor.execute(command)
    rows = cursor.fetchall()
    print(len(rows))
    for r in rows:
        print(r[1])

    #===============================================================================================
    #Get the minimum, median and maximum of the results
    #===============================================================================================
    command =   """
                SELECT time_bucket('15 minute', "RESULT_TIME") AS avg_time,
                percentile_cont(0.0) WITHIN GROUP (ORDER BY "RESULT_NUMBER") AS median_value,
                percentile_cont(0.5) WITHIN GROUP (ORDER BY "RESULT_NUMBER") AS median_value,
                percentile_cont(1.0) WITHIN GROUP (ORDER BY "RESULT_NUMBER") AS median_value
                FROM public."OBSERVATIONS"
                WHERE "DATASTREAM_ID" = %s and "RESULT_TIME" > '%s' and "RESULT_TIME" < '%s'
                GROUP BY avg_time
                ORDER BY avg_time DESC;
                """ %(ds_id, st_time,end_time)

    cursor.execute(command)
    rows = cursor.fetchall()
    print(len(rows))
    for r in rows:
        print(r)

    cursor.close()
```

## time_bucket_gapfill()
Similar to time_bucket but will automatically fill in results if there are no data. <a href="https://docs.timescale.com/api/latest/hyperfunctions/gapfilling-interpolation/time_bucket_gapfill/#required-arguments" target="_blank">time_bucket_gapfill() documentation</a>

```
import psycopg2
from sshtunnel import SSHTunnelForwarder

PORT=5432
with SSHTunnelForwarder(('ipaddress'),
                        ssh_username='',
                        ssh_password='',
                        remote_bind_address=('localhost', PORT),
                        local_bind_address=('localhost', PORT)):

    try:
        conn = psycopg2.connect(dbname='spatempdb',
                                user='',
                                host='localhost',
                                port = 5432,
                                password='')
        cursor = conn.cursor()
        print(cursor)
    except:
        print('notconnected')

    ds_id = '27'
    st_time = '2021-03-30 12:29:00-4'
    end_time = '2021-03-30 13:29:00-4'

    #===============================================================================================
    #time bucket gapfill filling gap with previously seen value
    #===============================================================================================

    command = """
                 SELECT time_bucket_gapfill('3 minute', "RESULT_TIME") AS avg_time,
                 percentile_cont(0.5) WITHIN GROUP (ORDER BY "RESULT_NUMBER") AS median_value,
                 locf(percentile_cont(0.5) WITHIN GROUP (ORDER BY "RESULT_NUMBER"))
                 FROM public."OBSERVATIONS"
                 WHERE "DATASTREAM_ID" = %s and "RESULT_TIME" > '%s' and "RESULT_TIME" < '%s'
                 GROUP BY avg_time
                 ORDER BY avg_time ASC;

                 """ %(ds_id , st_time, end_time)

    cursor.execute(command)
    rows = cursor.fetchall()
    print(len(rows))
    for r in rows:
        print(r)
        
    #===============================================================================================
    #time bucket gapfill filling gap interpolating between values
    #===============================================================================================

    command = """
                 SELECT time_bucket_gapfill('3 minute', "RESULT_TIME") AS avg_time,
                 percentile_cont(0.5) WITHIN GROUP (ORDER BY "RESULT_NUMBER") AS median_value,
                 interpolate(percentile_cont(0.5) WITHIN GROUP (ORDER BY "RESULT_NUMBER"))
                 FROM public."OBSERVATIONS"
                 WHERE "DATASTREAM_ID" = %s and "RESULT_TIME" > '%s' and "RESULT_TIME" < '%s'
                 GROUP BY avg_time
                 ORDER BY avg_time ASC;

                 """ %(ds_id , st_time, end_time)

    cursor.execute(command)
    rows = cursor.fetchall()
    print(len(rows))
    for r in rows:
        print(r)

    cursor.close()
```
