## Nginx

Nginx is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server.

---

## Reproduction Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/zrock-dev-backup/load-balancer.git
   ```

2. Change into the project directory:
   ```bash
   cd load-balancer
   ```

3. Build and start the containers in detached mode:
   ```bash
   docker compose up -d --build
   ```

4. Open the link in your browser:
   ```
   http://localhost:8080
   ```

---

## Stress Testing

Run the stress test script:
```bash
./stress-test.sh
```
