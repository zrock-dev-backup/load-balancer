const http = require("http");
const os = require("os");
const url = require("url");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  
  const parsedUrl = url.parse(req.url);
  
  if (parsedUrl.pathname === "/api/server-info") {
    const serverInfo = {
      hostname: os.hostname(),
      timestamp: new Date().toISOString()
    };
    
    await sleep(500);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(serverInfo));
    return;
  }
  const jsonResponse = {
    message: "none",
    status: "success"
  };

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })

  res.end(JSON.stringify(jsonResponse));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Hostname: ${os.hostname()}`);
});
