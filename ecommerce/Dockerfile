FROM node:21 AS ng-builder

WORKDIR /ngapp

RUN npm i -g @angular/cli

COPY client/package*.json .
COPY client/angular.json .
COPY client/tsconfig.* .
COPY client/src src
COPY client/proxy.config.json .

RUN npm ci && ng build

# /ngapp/dist/client-side/browser/*

# Starting with this Linux server
FROM maven:3-eclipse-temurin-21 AS sb-builder

## Build the application
# Create a directory call /sbapp
# go into the directory cd /app
WORKDIR /sbapp

# everything after this is in /sbapp
COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn
COPY src src
COPY --from=ng-builder /ngapp/dist/client-side/browser/ main/resources/static

# Build the application
RUN mvn package -Dmaven.test.skip=true

FROM openjdk:21-jdk-bullseye

WORKDIR /app 

COPY --from=sb-builder /sbapp/target/ecommerce-0.0.1-SNAPSHOT.jar app.jar

## Run the application
# Define environment variable 
ENV PORT=8080 SPRING_DATA_MONGO_URI=NOT_SET SPRING_DATASOURCE_URL=NOT_SET
ENV SPRING_DATASOURCE_USERNAME=NOT_SET SPRING_DATASOURCE_PASSWORD=NOT_SET

# Expose the port
EXPOSE ${PORT}

# Run the program
ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar
