from django.http import HttpResponse, JsonResponse
from django.template import loader

import pytz
import random
import datetime
from dateutil import parser
from django.conf import settings

def cesium_viewer(request):
    template = loader.get_template('csviewer/viewer.html')
    return HttpResponse(template.render())

def tiles_url(request):
    url = "http://localhost/static/3dtiles/arch_eg/tileset.json"
    return JsonResponse({"tiles_url": url})

def update_timeseries_data(request):
    # auth_user = settings.AUTH_USER
    # auth_pass = settings.AUTH_PW
    czml_data, dt_now_spore = update_time('dataset1')
    pos_list = [[ 103.78244865132135, 1.4957790803607318, 0.3 ],
                [ 103.78244865132135, 1.4957790803607318, 1.0 ],
                [ 103.78244865132135, 1.4957790803607318, 2.0 ],
                [ 103.78244865132135, 1.4957790803607318, 2.8 ]]

    for cnt1,pos in enumerate(pos_list):
        #calc the number of seconds so far
        delta_sec = 30
        start_time = dt_now_spore - datetime.timedelta(seconds=delta_sec)
        ndata = int(delta_sec/10)
        for cnt2 in range(ndata):
            name = str(cnt1) + '_' + str(cnt2)
            
            res_dt = start_time + datetime.timedelta(seconds=10*cnt2)
            if cnt2 == ndata-1:
                res_dt2 = res_dt + datetime.timedelta(seconds=60)
            else:    
                res_dt2 = res_dt + datetime.timedelta(seconds=10)

            res_dt_str = res_dt.isoformat(timespec='seconds')
            res_dt2_str = res_dt2.isoformat(timespec='seconds')
            desc = "<p> Name: dummy data of" + name + "<br> Time: " + res_dt_str + " / " + res_dt2_str + "<br> Historical Trending Data@(http://localhost/grafana)</p>"
            res = random.uniform(20.0, 30.0)
            bcolor = [255, 255, 255,125]
            if res > 25:
                bcolor = [255, 0, 0, 125]
            elif res < 22:
                bcolor = [0, 0, 255, 125]
            czml_data.append(
                {'id': 'datastream' + name, 'name': name, 'description': desc,
                    'availability': res_dt_str + '/' + res_dt2_str,
                    'label': {
                        'fillColor': { 'rgba': [0, 0, 0, 255]},
                        'font': '12pt Lucida Console',
                        'horizontalOrigin': 'CENTER',
                        'pixelOffset': { 'cartesian2': [0, 0]},
                        'style': 'FILL',
                        'text': str(round(res, 1)) + ' C',
                        'showBackground': True,
                        'backgroundColor': {'rgba': bcolor},
                        'distanceDisplayCondition' : {'distanceDisplayCondition': [0, 100]}
                        },
                    'position': {'cartographicDegrees': pos}
                })
            
    return JsonResponse({'czml':czml_data})

def update_timeseries_data2(request):
    czml_data, dt_now_spore = update_time('dataset2')
    pos_list = [[ 103.78241099215295, 1.4958120060441105, 1.5 ],
                [ 103.78242507375, 1.4957402814027136, 1.5 ],
                [ 103.78247670627249, 1.4958126763678536, 1.5 ],
                [ 103.78248542345162, 1.4957603911154922, 1.5 ]]

    for cnt1,pos in enumerate(pos_list):
        delta_sec = 30
        start_time = dt_now_spore - datetime.timedelta(seconds=delta_sec)
        ndata = int(delta_sec/10)
        for cnt2 in range(ndata):
            name = str(cnt1) + '_' + str(cnt2)
            
            res_dt = start_time + datetime.timedelta(seconds=10*cnt2)
            if cnt2 == ndata-1:
                res_dt2 = res_dt + datetime.timedelta(seconds=60)
            else:    
                res_dt2 = res_dt + datetime.timedelta(seconds=10)

            res_dt_str = res_dt.isoformat(timespec='seconds')
            res_dt2_str = res_dt2.isoformat(timespec='seconds')
            desc = "<p> Name: dummy data of" + name + "<br> Time: " + res_dt_str + " / " + res_dt2_str + "<br> Historical Trending Data@(http://localhost/grafana)</p>"
            res = random.uniform(400.0, 1000.0)
            bcolor = [255, 255, 255,125]
            if res > 800:
                bcolor = [255, 0, 0, 125]
            elif res < 600:
                bcolor = [0, 0, 255, 125]
            czml_data.append(
                {'id': 'datastream' + name, 'name': name, 'description': desc,
                    'availability': res_dt_str + '/' + res_dt2_str,
                    'label': {
                        'fillColor': { 'rgba': [0, 0, 0, 255]},
                        'font': '12pt Lucida Console',
                        'horizontalOrigin': 'CENTER',
                        'pixelOffset': { 'cartesian2': [0, 0]},
                        'style': 'FILL',
                        'text': str(round(res, 1)) + ' units',
                        'showBackground': True,
                        'backgroundColor': {'rgba': bcolor},
                        'distanceDisplayCondition' : {'distanceDisplayCondition': [0, 100]}
                        },
                    'position': {'cartographicDegrees': pos}
                })
            
    return JsonResponse({'czml':czml_data})

def update_time(docname):
    dt_now = datetime.datetime.now()
    dt_now = dt_now.astimezone(tz=pytz.timezone('US/Eastern'))
    dt_now_spore = dt_now.astimezone(tz=pytz.timezone('Asia/Singapore'))

    today_str = dt_now_spore.date().isoformat()
    czml_data = [{"id": "document", "name": docname, "version": "1.0", 
                "clock": {"interval": "%sT00:00:00+08:00/%sT23:59:59+08:00" % (today_str, today_str), "currentTime": ""}}]

    czml_data[0]['clock']['currentTime'] = dt_now_spore.isoformat(timespec='seconds')

    return czml_data, dt_now_spore
    