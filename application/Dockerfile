FROM maven:3.9.11-amazoncorretto-24
LABEL version=1.0
WORKDIR /app
COPY . .
RUN mvn package -DskipTests
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/target/demo-0.0.1-SNAPSHOT.jar"]