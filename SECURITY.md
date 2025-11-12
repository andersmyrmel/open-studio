# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Open-Studio, please report it by:

1. **Email**: Send details to the repository maintainer (check GitHub profile)
2. **GitHub Security Advisories**: Use the [Security tab](../../security/advisories/new) to privately report vulnerabilities

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

## Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Fix Timeline**: Depends on severity
  - Critical: Immediate priority
  - High: Within 2 weeks
  - Medium: Within 1 month
  - Low: Next release cycle

## Security Best Practices

When using Open-Studio:

1. **Database Credentials**: Never commit `.env` files or expose database credentials
2. **Network Access**: Use firewalls and restrict database access to trusted IPs
3. **Updates**: Keep Open-Studio and dependencies up to date
4. **Docker**: If using Docker, ensure proper network isolation
5. **Production**: Consider using read-only database users for querying

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Known Limitations

- Open-Studio connects directly to PostgreSQL databases without authentication layer
- All database operations are performed with the credentials you provide
- SQL execution capabilities allow DDL/DML operations based on database user permissions
