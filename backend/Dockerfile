# Stage 1: Build application with Maven
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /build

# Copy maven configuration and pom
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime Image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create upload directory and non-root user
RUN addgroup -S keystone && adduser -S keystone -G keystone \
    && mkdir -p /app/uploads \
    && chown -R keystone:keystone /app

COPY --from=builder --chown=keystone:keystone /build/target/*.jar /app/app.jar

USER keystone
EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod \
    UPLOAD_DIR=/app/uploads

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
