# mysabr-api

MySabr Core/Platform API — a Java/Quarkus-based core or platform services packaged with Gradle and prepared for AWS
Lambda (SAM) deployments.

This README documents the repository layout, tech stack, how to build and run locally, how to use the included SQL schema files, and deployment notes (SAM / LocalStack / AWS).

---

Quick checklist
- Project type: Java + Quarkus + Gradle
- Packaging: runnable JAR / Quarkus native/runner artifacts
- Cloud: AWS SAM template included for Lambda packaging and deployment
- Local dev: Quarkus dev mode and SAM Local / LocalStack supported
- DB schema: SQL files are under `sql/`

What you'll find here
- Project overview and tech stack
- Repo layout with important files and directories
- Build, run and test commands
- Local development tips (Quarkus, SAM, LocalStack)
- Database setup & seeding using provided SQL
- Environment variables and configuration
- Troubleshooting and common tasks

Project overview
This repository implements an MySabr Core API that supports profile creation by account type, lookups, and many. It is
implemented
with Quarkus (compiled and packaged with Gradle). The build outputs both Quarkus application bundles and deployable
artifacts suitable for AWS Lambda / SAM.

Core libraries noticed in the repository
- Quarkus (framework, runtime)
- Bcrypt library (at.favre.lib.bcrypt) — password hashing
- java-jwt (com.auth0.java-jwt) — JWT creation/verification
- AWS Lambda / Events libraries (for SAM-compatible handlers)
- Jackson (JSON handling)

Repository layout (top-level)
- build.gradle, gradlew, settings.gradle — Gradle build
- template.yaml — AWS SAM template for Lambda packaging/deploy
- aws/ — notes and event examples (LocalStack hints)
- build/ — build outputs (runner jars, quarkus-app, artifacts)
- quarkus-app/, quarkus-build/ — Quarkus assembled application (when built)
- lib/, generated/, classes/ — build/runtime dependencies and classes
- sql/ — SQL schema files and seed data (see below)
- src/ — application source (Java / resources)

Important files and directories
- `template.yaml` — SAM template used to package/deploy as Lambda
- `sql/` — contains create table scripts: e.g. Create_Table_Student_Profile.sql
- `aws/localstack.txt` — notes for running with LocalStack
- `build/` — contains build outputs such as `mysabr-api-dev.jar` and `mysabr-api-1.0.0-SNAPSHOT-runner.jar`

Build (recommended: use the Gradle wrapper)
From the project root:

```bash
./gradlew clean build -x test
```

This produces artifacts under `build/` and may also assemble `quarkus-app/` depending on the Gradle tasks and project configuration.

Run locally
There are multiple ways to run this service depending on your workflow:

1) Run the assembled JAR (if present)

```bash
# example; adjust filename if different
java -jar build/mysabr-api-dev.jar
# or
java -jar build/mysabr-api-1.0.0-SNAPSHOT-runner.jar
```

2) Run with Quarkus dev mode (fast edit/run feedback — requires Quarkus Gradle plugin)

```bash
./gradlew quarkusDev
```

3) Run as a SAM local Lambda API

- Build the SAM artifact:

```bash
./gradlew build
sam build -t template.yaml
```

- Start the API locally (requires AWS SAM CLI and Docker):

```bash
sam local start-api -t template.yaml --port 8081
```

LocalStack
If you prefer LocalStack for local AWS emulation, see `aws/localstack.txt` for notes. Typical flow:
- Start LocalStack (via docker-compose or the LocalStack CLI)
- Configure AWS SDK endpoints or AWS CLI to talk to LocalStack
- Use the SAM template + LocalStack to run/test event integrations

Database setup
This project expects a relational database for storing user records. The `sql/` folder includes CREATE TABLE scripts for each user type and a `seedDatas/` directory for example data.

Steps to set up a local Postgres (example):

1. Create a database (e.g., `mysabrdb`)
2. Run the SQL scripts in `sql/` in the order needed (table creates first, then seeds):

```bash
psql -h localhost -U <dbuser> -d mysabrdb -f sql/Create_Table_Student_Profile.sql
psql -h localhost -U <dbuser> -d mysabrdb -f sql/Create_Table_Educator_Users.sql
# ...repeat for other scripts or run a combined script
```

3. Seed sample data from `sql/seedDatas/` if applicable.

Testing
- Unit & integration tests (if present) can be executed with Gradle:

```bash
./gradlew test
```

- For integration tests that need a DB, prefer using a local Postgres instance, Testcontainers, or a dedicated test database.

Packaging & Deploy (AWS SAM)
1. Build project

```bash
./gradlew clean build
```

2. Build SAM artifact and deploy

```bash
sam build -t template.yaml
sam deploy --guided
```

Note: SAM deployment requires AWS credentials configured in your environment (AWS CLI profile or environment variables). If you use LocalStack, configure endpoints accordingly.

Observability & logs

- When running as a local JAR or Quarkus dev mode, logs are printed to stdout.
- When deployed as Lambda, use CloudWatch logs. The SAM template will set up IAM roles/permissions — verify the template for log forwarding.

Common tasks
- Add a new user type: add SQL create script under `sql/`, create Java entity/repository, add service logic and API endpoints, add tests, and include any seed data.
- Change JWT settings: update the `JWT_SECRET` and token lifetime in configuration; rotate secrets carefully in production.

Troubleshooting
- Port conflicts: adjust `quarkus.http.port` or `server.port` in config.
- DB connection failures: validate JDBC URL, credentials, and that the DB is reachable.
- SAM local errors: ensure Docker is running and SAM CLI is installed and reachable.
- Missing application properties values: errors at startup usually indicate missing required configuration values — check logs.

Security notes
- Never commit secrets (JWT secrets, DB passwords) to source control. Use environment variables or AWS Secrets Manager for production.
- Passwords should be stored hashed using bcrypt (the repository includes a bcrypt library dependency).

Contributing

- Please see `CONTRIBUTING.md` for detailed contribution guidelines, PR checklists, branch naming, testing, and
  database/migration instructions.

Further reading / next steps
- Inspect `template.yaml` to understand Lambda function resource definitions and environment mappings.
- Check `src/main/resources` for exact Quarkus configuration keys used to wire the datasource and security properties.
