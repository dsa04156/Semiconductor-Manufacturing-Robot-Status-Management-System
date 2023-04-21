# Base Image
FROM openjdk:11-jdk-slim

# Set the working directory to /app
WORKDIR /app

# Copy the project directory into the container at /app
COPY . /app

# Build the project
RUN ./gradlew build

# Set the default command to run the application
CMD ["java", "-jar", "/app/build/libs/my-application.jar"]