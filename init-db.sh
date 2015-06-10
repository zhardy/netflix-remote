#! /bin/bash

psql --file=../dbTables.sql --dbname=netremote
node load_movie_data.js