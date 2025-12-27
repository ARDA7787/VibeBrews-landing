# Contributing to mysabr-api

Thank you for contributing! These guidelines are here to make it easier for you and the maintainers to collaborate
effectively.

If you're unsure about anything, open an issue or a draft PR and we'll work through it together.

---

1) How to get started

- Fork the repository and clone your fork locally.

```bash
git clone git@github.com:<your-username>/mysabr-api.git
cd mysabr-api
```

- Use the Gradle wrapper for tasks:

```bash
./gradlew clean build
```

2) Branching and commit naming

- Branch from `develop` using a descriptive name:
    - feature/<short-description>
    - fix/<short-description>
    - chore/<short-description>
    - docs/<short-description>

Example: `feature/add-password-reset` or `fix/jwt-expiration-bug`.

- Commit messages should be short and meaningful. Use present-tense: `Add login endpoint`,
  `Fix SQL injection possibility`.

3) Tests

- All new features must include unit tests covering the logic. Use integration tests for repository/DB logic.
- Run tests locally before opening a PR:

```bash
./gradlew test
```

- For tests that need a database, either:
    - Use Testcontainers, or
    - Run against a local Postgres instance and set the appropriate env vars.

4) Database migrations & SQL changes

- Add new schema changes as SQL scripts in `sql/` and include a short description in the filename or a comment at the
  top.
- Update `sql/seedDatas/` when adding seed/example data.

5) Pull request checklist

Before requesting a review, make sure your PR:

- [ ] Builds successfully: `./gradlew clean build`
- [ ] Passes tests: `./gradlew test`
- [ ] Includes or updates tests for new behavior
- [ ] Includes database migration scripts (if applicable) under `sql/` or the migration tool directory
- [ ] Has a clear description of the change, why it's needed, and any deployment notes
- [ ] Does not contain secrets or generated files that shouldn't be committed (e.g., `build/` artifacts)

6) Code style and quality

- Keep code consistent with the existing style. IntelliJ and Eclipse formatting files are in `IDE-code-format-style/`.
- Keep methods small and focused. Prefer descriptive names for variables and methods.

7) Security and secrets

- Never commit secrets (JWT secrets, DB passwords, AWS keys). Use environment variables or AWS Secrets Manager.
- For production secrets, prefer using an external secret manager and referencing secrets via environment variables or
  the SAM template.

8) Review process

- PRs will be reviewed by one or more maintainers. Expect constructive feedback and iterate on suggested changes.
- Be responsive to review comments and update the PR accordingly.

9) Release & Deployment notes

- If your change requires a version bump or release notes, add them to the PR and coordinate with the person who
  performs releases.
- For SAM/Lambda-specific changes, verify the `template.yaml` environment variable mappings and IAM role changes.

10) Quick local workflow examples

Run Quarkus dev mode (fast feedback):

```bash
./gradlew quarkusDev
```

Thanks for helping improve mysabr-api. We appreciate careful, well-tested contributions!
