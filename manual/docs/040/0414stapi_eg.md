# Example Python Script to Post to a FROST Server (Sensorthing API)

## Post Meta Data of the Datastream
1. Register the sensor and the property this sensor is observing.
    ```
    import requests
    from requests.auth import HTTPBasicAuth

    url = 'http://localhost/frost/v1.1/'
    auth_user = 'your_username'
    auth_pass = 'secret_password'
    #========================================================================
    #observed property
    #========================================================================
    observed_prop1 = {"name": "temperature",
                    "description": "temperature of an object",
                    "definition": ""
                    }

    r1 = requests.post(url+"ObservedProperties", 
                    auth=HTTPBasicAuth(auth_user, auth_pass), 
                    json=observed_prop1)

    print(r1)

    #========================================================================
    #sensor
    #========================================================================
    sensor_data1 = {"name": "xyz temp sensor",
                    "description": "measure temperature using xyz method",
                    "encodingType": "application/pdf",
                    "metadata": ""
                    }

    r1 = requests.post(url+"Sensors", 
                    auth=HTTPBasicAuth(auth_user, auth_pass), 
                    json=sensor_data1)
    print(r1)
    ```

2. Register the Thing and the datastream.
    ```
    import requests
    from requests.auth import HTTPBasicAuth

    url = 'http://localhost/frost/v1.1/'
    auth_user = 'your_username'
    auth_pass = 'secret_password'
    #==========================================================================================================================================================
    # region: Fill in the parameters, #The sensorthings API data model is used (https://developers.sensorup.com/docs/#introduction)
    #==========================================================================================================================================================
    #THING PARAMETERS
    thing_name = 'occ_sensor'
    thingDesc = 'setup to test occ sensor'#describe the deployment
    #==========================================================================================================================================================
    #LOCATION PARAMETERS
    locName = 'xyz place'
    locDesc = 'xyz waiting area'
    loc_encoding_type = 'application/vnd.geo+json'
    #Define the geometry of the location. Geometry types from geojson is accepted. Refer to https://tools.ietf.org/html/rfc7946 for geometry types.
    loc_type = 'Point'
    coordinates = [-74.6448927740998, 40.344893511213165, 0] #0,0,0 lon/kat/alt is the coordinates of null island, this is just a place holder
    #==========================================================================================================================================================
    #DATASTREAM PARAMETERS
    ds_names = ['datastream_name1']
    ds_descs = ['value_sensor_is_sensing']
    obs_types = ['http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_Measurement']

    ds_uoms = [{"name": "valuex","symbol": "","definition": "definition of x"}]
    #visit "http://www.qudt.org/qudt/owl/1.0.0/unit/Instances.html" to get the definition

    #id of the observed property, go to  https://localhost/frost/v1.1/ObservedProperties to check the properties availabe and specify the @iot.id
    #if properties are not available you will have to register a new property
    ds_obs_prop_ids = [1]
    #id of the sensor, go to https://localhost/frost/v1.1/Sensors to check the sensors availabe and specify the @iot.id
    #if sensors are not available you will have to register a new property 
    ds_sensor_ids = [1]

    # endregion
    #==========================================================================================================================================================
    # region:FUNCTIONS
    #==========================================================================================================================================================
    def get_id_from_header(location_str):
        split = location_str.split('/')
        thing = split[-1]
        idx1 = thing.index('(')
        idx2 = thing.index(')')
        thing_id = int(thing[idx1+1:idx2])
        return thing_id

    def postds(thing_id, dsname, dsdesc, dsobs, dsuom, dsobsprop_id, dssensor_id):
        #Parameters that defines the datastream
        datastream_data = {'name': dsname,
                        'description': dsdesc,
                        'observationType': dsobs,
                        'unitOfMeasurement': dsuom,
                        'Thing':{"@iot.id":thing_id},
                        'ObservedProperty':{'@iot.id':dsobsprop_id},
                        'Sensor':{'@iot.id':dssensor_id}}
        dr = requests.post(url+"Datastreams", auth=HTTPBasicAuth(auth_user,auth_pass), json=datastream_data)
        ds_loc_str = dr.headers['Location'] 
        ds_id = get_id_from_header(ds_loc_str )
        return ds_id

    # endregion
    #==========================================================================================================================================================
    # region: THE JSON OBJECTS TO BE POST
    #==========================================================================================================================================================
    #Parameters that defines the location of the thing    
    loc_data = {'name': locName,
                'description': locDesc,
                'encodingType': loc_encoding_type,
                'location': {'type': loc_type,
                            'coordinates': coordinates}}

    #Parameters that defines the thing
    thingloc_data = {'name': thing_name,
                    'description': thingDesc,
                    'Locations': [loc_data]}
    #==========================================================================================================================================================
    #==========================================================================================================================================================
    is_thing_reg = False
    #check if this thing already exist on the database
    filter_thing = "Things?$filter=name eq '" + thing_name + "'&$expand=Locations($select=name),Datastreams($select=id)&$select=id"
    find_thing = requests.get(url+filter_thing)
    thing_content = find_thing.json()
    thing_ls = thing_content['value']

    nthings = len(thing_ls)
    if nthings > 0:
        loc_name_val = thing_ls[0]['Locations'][0]['name']
        if loc_name_val == locName:
            is_thing_reg = True
            
    if is_thing_reg == False:
        r = requests.post(url+"Things",auth=HTTPBasicAuth(auth_user,auth_pass),
                        json=thingloc_data)
        print(r.text)
        loc_str = r.headers['Location']
        thing_id = get_id_from_header(loc_str)
        # post datastreams to the thing
        ds_ids = []
        nds = len(ds_names)
        for i in range(nds):
            dsname = ds_names[i]
            dsdesc = ds_descs[i]
            dsobs = obs_types[i]
            dsuom = ds_uoms[i]
            dsobsprop_id = ds_obs_prop_ids[i]
            dssensor_id = ds_sensor_ids[i]
            ds_id = postds(thing_id, dsname, dsdesc, dsobs, dsuom, dsobsprop_id, dssensor_id)
            ds_ids.append(ds_id)
    else:
        thing_id = thing_ls[0]['@iot.id']
        dss = thing_ls[0]['Datastreams']
        ds_ids = []
        for ds in dss:
            ds_id = ds['@iot.id']
            ds_ids.append(ds_id)

    #==========================================================================================================================================================
    print('===============================================================================')
    print('Thing ID:', thing_id)
    print('Visit this page to look at the registered Device: \n',url+'Things(' + str(thing_id) + ')')
    print('Datastream ID:', ds_ids)
    print('Use this information to post observation in sensorthing_post_observation.py')
    print('===============================================================================')
    # endregion
    ```
## Post Observations to the Datastream
3. Once all the meta data is setup. The sensor can post to the datastream with this script.
    ```
    import datetime
    import requests
    from requests.auth import HTTPBasicAuth

    url = 'http://localhost/frost/v1.1/'
    auth_user = 'your_username'
    auth_pass = 'secret_password'
    ds_id = 1
    #==========================================================================================================================================================
    #DATASTREAMS ID
    #==========================================================================================================================================================
    obs_data = {'phenomenonTime': '',
                'resultTime': '',
                'result': '',
                'Datastream':{'@iot.id':ds_id}
                }

    #get the current time
    dt = datetime.datetime.now(datetime.timezone.utc) # UTC time
    # dt = dt.astimezone() # local time
    dtstr = dt.isoformat()
    print(dtstr)

    #post the datastream
    obs_data['phenomenonTime'] = dtstr
    obs_data['resultTime'] = dtstr
    obs_data['result'] = 1
        
    r1 = requests.post(url+"Observations", 
                    auth=HTTPBasicAuth(auth_user, auth_pass), 
                    json=obs_data)
    print(r1.text)
    ```