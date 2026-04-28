# Introduction to Yun2Infinity

The Yun2Infinity is an open-source software stack that can handle spatial time-series data. It is an integration of the following open-source software:
- [PostgreSQL Database](https://www.postgresql.org/) – the core database software.
- [TimescaleDB](https://docs.timescale.com/latest/main) – extension of PostgreSQL that can handle time-series data.
- [Postgis](https://postgis.net/) – extension of PostgreSQL that can handle spatial data.
- [3DCityDB](https://www.3dcitydb.org/3dcitydb/) – extension of PostgreSQL that can handle 3D City data, it uses the data model of CityGML.
- [FROST-Server](https://www.iosb.fraunhofer.de/en/projects-and-products/frost-server.html) – PostgreSQL based implementation of the Sensorthings API.
- [BIMServer](https://github.com/opensourceBIM/BIMserver) – Database server (Oracle Berkeley DB) that stores IFC schema as objects. Able to query using ProtoBuffers, SOAP or JSON API.