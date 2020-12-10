# Particle Webhooks
Webhook is a Particle integration mechanism. For more information on Webhooks, refer to [this](https://docs.particle.io/tutorials/device-cloud/webhooks/). 8 Webhooks are setup to enable the integration with Particle devices.
1. The getFilter Webhook. This Webhook makes GET request to the FROST-Server to filter and search for relevant information. Setup your Webhook as follows.
    ```
    Event Name: getFilter
    URL: http://your.frost-server.com:8080/FROST-Server/v1.0/{{{query}}}
    Request Type: GET
    Request Format: Query Parameters
    Device: Any

    Advanced Settings
    HTTP BASIC AUTH
    Username: Your username for FROST-server access
    Password: Your password for FROST-server access

    WEBHOOK RESPONSES
    Response Topic
    {{PARTICLE_DEVICE_ID}}/hook-response/{{PARTICLE_EVENT_NAME}}

    ENFORCE SSL: No
    ```
2. The postThing Webhook. This Webhook makes POST request to the FROST-Server to create a Thing object for the Particle device. Setup your Webhook as follows.
    ```
    Event Name: postThing
    URL: http://your.frost-server.com:8080/FROST-Server/v1.0/Things
    Request Type: POST
    Request Format: JSON
    Device: Any

    Advanced Settings
    JSON DATA: Custom
    {
      "name": "{{{PARTICLE_DEVICE_ID}}}",
      "description": "{{{thingdesc}}}",
      "properties": {
        "deployment": "{{{deployment}}}",
        "pins": "{{{pins}}}"
      },
      "Locations": [
        {
          "name": "{{{foiname}}}",
          "description": "{{{foidesc}}}",
          "encodingType": "{{{entype}}}",
          "location": {
            "type": "{{{loctype}}}",
            "coordinates": [
              "{{{coordx}}}",
              "{{{coordy}}}",
              "{{{coordz}}}"
            ]
          }
        }
      ]
    }
    HTTP BASIC AUTH
    Username: Your username for FROST-server access
    Password: Your password for FROST-server access

    WEBHOOK RESPONSES
    Response Topic
    {{PARTICLE_DEVICE_ID}}/hook-response/{{PARTICLE_EVENT_NAME}}

    ENFORCE SSL: No
    ```
3. The postDatastream Webhook. This Webhook makes POST request to the FROST-Server to create a Datastrean object for the Particle device. Setup your Webhook as follows.
    ```
    Event Name: postDatastream
    URL: http://your.frost-server.com:8080/FROST-Server/v1.0/Datastreams
    Request Type: POST
    Request Format: Custom Body
    Device: Any

    Advanced Settings
    CUSTOM REQUEST BODY
    {
        "name": "{{{dsname}}}",
        "description": "{{{dsdesc}}}",
        "observationType": "{{{obstype}}}",
        "unitOfMeasurement":
        {
            "name": "{{{uomname}}}",
            "symbol": "{{{uomsym}}}",
            "definition": "{{{uomdef}}}"
        },
        "Thing":{"@iot.id":{{{thingid}}}},
        "ObservedProperty":{"@iot.id":{{{obspropid}}}},
        "Sensor":{"@iot.id":{{{sensorid}}}}
    }
    HTTP BASIC AUTH
    Username: Your username for FROST-server access
    Password: Your password for FROST-server access

    WEBHOOK RESPONSES
    Response Topic
    {{PARTICLE_DEVICE_ID}}/hook-response/{{PARTICLE_EVENT_NAME}}

    ENFORCE SSL: No
    ```
4. The postMultiDatastream Webhook. This Webhook makes POST request to the FROST-Server to create a MultiDatastrean object for the Particle device. Setup your Webhook as follows.
    ```
    Event Name: postMultiDatastream
    URL: http://your.frost-server.com:8080/FROST-Server/v1.0/MultiDatastreams
    Request Type: POST
    Request Format: Custom Body
    Device: Any

    Advanced Settings
    CUSTOM REQUEST BODY
    {
        "name": "{{{dsname}}}",
        "description": "{{{dsdesc}}}",
        "observationType": "http://www.opengis.net/def/observationType/OGC-OM/2.0/OM_ComplexObservation",
        "multiObservationDataTypes":["{{{obstype}}}", "{{{obstype}}}"],
        "unitOfMeasurements":
        [
         {
            "name": "{{{uomname}}}",
            "symbol": "{{{uomsym}}}",
            "definition": "{{{uomdef}}}"
         },
         {
            "name": "{{{uomname}}}",
            "symbol": "{{{uomsym}}}",
            "definition": "{{{uomdef}}}"
         }
        ],
        "Thing":{"@iot.id":{{{thingid}}}},
        "ObservedProperties":[{"@iot.id":{{{obspropid}}}}, {"@iot.id":{{{obspropid}}}}],
        "Sensor":{"@iot.id":{{{sensorid}}}}
    }
    HTTP BASIC AUTH
    Username: Your username for FROST-server access
    Password: Your password for FROST-server access

    WEBHOOK RESPONSES
    Response Topic
    {{PARTICLE_DEVICE_ID}}/hook-response/{{PARTICLE_EVENT_NAME}}

    ENFORCE SSL: No
    ```
5. The postObservation Webhook. This Webhook makes POST request to the FROST-Server to create a Observation object for the Particle device. Setup your Webhook as follows.
    ```
    Event Name: postObservation
    URL: http://your.frost-server.com:8080/FROST-Server/v1.0/Observations
    Request Type: POST
    Request Format: Custom Body
    Device: Any

    Advanced Settings
    CUSTOM REQUEST BODY
    {
        "phenomenonTime": "{{{time}}}",
        "resultTime": "{{{time}}}",
        "result": {{{result}}},
        "Datastream": {"@iot.id": {{{dsId}}}}
    }
    HTTP BASIC AUTH
    Username: Your username for FROST-server access
    Password: Your password for FROST-server access

    WEBHOOK RESPONSES
    Response Topic
    {{PARTICLE_DEVICE_ID}}/hook-response/{{PARTICLE_EVENT_NAME}}

    ENFORCE SSL: No
    ```
6. The postMultiObservation Webhook. This Webhook makes POST request to the FROST-Server to create a MultiObservation object for the Particle device. Setup your Webhook as follows.
    ```
    Event Name: postObservation
    URL: http://your.frost-server.com:8080/FROST-Server/v1.0/CreateObservations
    Request Type: POST
    Request Format: Custom Body
    Device: Any

    Advanced Settings
    CUSTOM REQUEST BODY
    [{
        "components": ["phenomenonTime","resultTime","result"],
        "dataArray": [["{{{time}}}","{{{time}}}", [{{{result1}}}, {{{result2}}}]]],
        "dataArray@iot.count": 1,
        "MultiDatastream": {"@iot.id": {{{mdsId}}}}
    }]
    HTTP BASIC AUTH
    Username: Your username for FROST-server access
    Password: Your password for FROST-server access

    WEBHOOK RESPONSES
    Response Topic
    {{PARTICLE_DEVICE_ID}}/hook-response/{{PARTICLE_EVENT_NAME}}

    ENFORCE SSL: No
    ```
7. The postSensor Webhook. This Webhook makes POST request to the FROST-Server to create a Sensor object for the Particle device. Setup your Webhook as follows.
    ```
    Event Name: postSensor
    URL: http://your.frost-server.com:8080/FROST-Server/v1.0/Sensors
    Request Type: POST
    Request Format: JSON
    Device: Any

    Advanced Settings
    JSON DATA - Custom
    {
      "name": "{{{name}}}",
      "description": "{{{desc}}}",
      "encodingType": "{{{encodeType}}}",
      "metadata": "{{{metadata}}}"
    }
    HTTP BASIC AUTH
    Username: Your username for FROST-server access
    Password: Your password for FROST-server access

    WEBHOOK RESPONSES
    Response Topic
    {{PARTICLE_DEVICE_ID}}/hook-response/{{PARTICLE_EVENT_NAME}}

    ENFORCE SSL: No
    ```
8. The postObsProperties Webhook. This Webhook makes POST request to the FROST-Server to create a Observed Property object for the Particle device. Setup your Webhook as follows.
    ```
    Event Name: postSensor
    URL: http://your.frost-server.com:8080/FROST-Server/v1.0/ObservedProperties
    Request Type: POST
    Request Format: JSON
    Device: Any

    Advanced Settings
    JSON DATA - Custom
    {
      "name": "{{{name}}}",
      "description": "{{{desc}}}",
      "definition": "{{{def}}}"
    }
    HTTP BASIC AUTH
    Username: Your username for FROST-server access
    Password: Your password for FROST-server access

    WEBHOOK RESPONSES
    Response Topic
    {{PARTICLE_DEVICE_ID}}/hook-response/{{PARTICLE_EVENT_NAME}}
    
    ENFORCE SSL: No
    ```
