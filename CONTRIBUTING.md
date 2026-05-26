# Contributing to Rudra Hospital Digital Platform

Thank you for taking the time to contribute to the Rudra Hospital healthcare platform! This document provides the guidelines and workflows needed to help maintain, improve, and secure our hospital's digital systems.

## 📄 Code of Conduct
By participating in this project, you agree to uphold our commitment to patient data privacy, professional collaboration, and a respectful working environment.

## 🔒 Crucial Healthcare Compliance
* **HIPAA, GDPR & Local Medical Regulations:** Never upload, commit, or log actual Patient Health Information (PHI) or Personally Identifiable Information (PII).
* **Test Data:** Use only randomized, synthetic data for testing and development.
* **Security:** If you find a security vulnerability, do NOT open a public issue. Email our security team immediately at: `security@rudrahospital.com`.

## 🚀 How to Contribute

### 1. Reporting Bugs or Requesting Features
* Search the repository **Issues** tab to see if your topic already exists.
* If not, open a new issue using our provided template.
* Include clear steps to reproduce the bug, your environment details, and the expected outcome.

### 2. Development Workflow
1. **Fork** the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Implement** your changes. Ensure you adhere to our established coding style guide.
3. **Write Tests:** Ensure all new code has matching unit or integration test coverage.
4. **Run Tests Locally:** Verify that all existing tests pass before pushing:
   ```bash
   npm test # or your specific test command
   ```

### 3. Submitting a Pull Request (PR)
* Open a PR against the `main` branch.
* Link the PR to the specific issue it resolves.
* Fill out the PR template completely, including screenshots for user interface changes.
* Ensure your commit messages are clear, descriptive, and follow conventional commit formats.
* At least two core maintainers must review and approve your code before merging.

## 🛠️ Style Guide
* **Code Formatting:** We use automated linters. Run `npm run lint` before committing.
* **Documentation:** Update relevant `README.md` files or inline documentation for any new features or API changes.

## ❓ Questions?
If you have questions about the setup, code logic, or hospital workflows, feel free to reach out to the project maintainers or post in our internal development channel.
