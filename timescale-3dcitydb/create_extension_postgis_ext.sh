#!/bin/bash
psql -U "${POSTGRES_USER}" "${POSTGRES_DB}" -c 'CREATE EXTENSION IF NOT EXISTS postgis_raster CASCADE'
psql -U "${POSTGRES_USER}" "${POSTGRES_DB}" -c 'CREATE EXTENSION IF NOT EXISTS postgis_sfcgal CASCADE'

