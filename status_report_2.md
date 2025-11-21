## Accomplishments:
### Tanuj
* Setup Loki for logs persistance 
* Setup Graphans logs aggregation and monitoring
* Added docker plugin configuration for Grafana Loki to send container logs to Loki - Effort Estimation

Git commit: https://github.ncsu.edu/TAYDevops/infra-deployment/commit/5f44ece3e2b60fcec10f83defe5a8414904b0211

### Abhishek
* Create Database to save feature configurations
* Add REST endpoints to save and retrieve configuration for a server

Git commit: https://github.ncsu.edu/TAYDevops/Feature-configuration/commit/cfba76ecae4bcf51ab170dc85b3dbfdbaca7512d 

### Yaswanth
* Setup Ansible to deploy the app on staging
* Integrate the Ansible playbook trigger from the pipeline to run with a temporary VCL (with sudo access)

Git commit: https://github.ncsu.edu/TAYDevops/infra-deployment/commit/4a7fbe9fcbc7a909d5d7242c30ddac62a2dbc233 

## Next Steps
### Tanuj
* Continous Deployment on merge pull request to release branch: 3 days.
* Migrate configuration from docker compose to docker - Effort Estimation: 3 days.

### Abhishek
* Add a util function to fetch and determine the value for a feature. - Effort Estimation: 3 days.
* Use feature flag for dark launching a feature on the app - Effort Estimation: 2 days.

### Yaswanth
* Add smoke test for staging and production enviornments. - Effort Estimation: 2 days.
* If the deployment or integration testing fails on production server, then we will rollback to previous version. - Effort Estimation: 3 days.

## Retrospective
### What worked
* We were able to work on Infrastructure (Tanuj), Backend (Abhishek), and Deployment (Yaswanth) simultaneously without blocking each other.
* Researching the tools and feature flag approach before the sprint started allowed us to hit our sprint targets accurately.

### Want didn't work
* As sudo was not enabled on the provided VCL, we were not able to install docker compose, hence we had to test the Ansible trigger from workflow on temporary VCL (with sudo).
  
### What are you going to do differently
* We are going to change our solution to use plain docker files instead of docker compose and add an additional nginx container for reverse proxy connection to various services.
