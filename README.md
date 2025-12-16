
# Team Members
1. Tanuj Kulkarni - tskulkar
2. Abhishek Potdar - apotdar
3. Yaswanth Baddi - ybaddi
   
[WikiLink](https://github.ncsu.edu/TAYDevops/Coffee-shop/wiki/Problem-Description)
# COFFEE PROJECT 

**Description**

Coffee app is a simple web application built with Node.js, Express and Javascript. This repository contains the full source code, test suite, static assets and GitHub workflow automations.

**CI/CD**

Ci.yml runs on pull request to any branch with jobs with lint, unit-test, build and audit. The main_pipeline.yml gets triggered on push to release branch and has same steps as ci.yml along with deploy to staging and production and their smoke tests.

**Developer Guide**
1. public/indes.html: This is the home page of coffee app which shows all the coffee list with their name and prices along with promo banners.
2. public/script.js: This has javascript actions on the home page based on the API calls
3. app.js: This provides the Get, Post, and Put API's to update the feature configuration for each store.
4. data.js: This file provides the default coffees and prices for the application.
webpack.config.js: This file contains the configuration for webpack to build the coffee app.
5. test/unit_test/app.test.js: This file contains the unit tests for the coffee app for GET and POST requests.
6. test/smoke_prod/smoke.prod.test.js: This file contains the smoke tests for the staging environment for GET and POST requests.
7. test/smoke_staging/smoke.staging.test.js: This file contains the smoke tests for the production environment for GET and POST requests.


