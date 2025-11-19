// node has a built in http server

const http = require("http");

console.log("Starting basic http server");

// Create the server

const server = http.createServer((request, response) => {
  console.log("\nIncoming Request:");
  console.log("Method:", request.method);
  console.log("URL:", request.url);
  console.log("HTTP Version:", request.httpVersion);
  console.log("Headers:", JSON.stringify(request.headers, null, 2));

  // Set response headers
  response.writeHead(200, {
    "Content-Type": "text/html",
    Server: "Codecademy-HTTP-Demo",
  });

  // Send response body
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
     table, tr, th, td{
        border:1px solid black;
        border-radius: 10px;
     }

     td{
        background-color: aqua;
     }

     th{
        background-color: brown;
     }

    </style>
</head>
<body>
    <table>
      <tr>
        <th>Name</th>
        <th>Date</th>
        <th>Time</th>
      </tr>
<tr>
    <td>Sue</td>
    <td>5/5/2025</td>
    <td>10:00AM</td>
</tr>

<tr>
    <td>Bob</td>
    <td>1/6/2025</td>
    <td>9:00AM</td>
</tr>

<tr>
    <td>Lee</td>
    <td>10/10/2025</td>
    <td>12:00AM</td>
</tr>
    </table>
</body>
</html>
  `;

  response.end(html);
});

// select a port
const PORT = 3000;

// start the server to handle requests

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Try visiting the URL in your browser to see HTTP in action!");
  console.log("Press Ctrl+C to stop the server");
});

// Handle server errors
server.on("error", (err) => {
  console.error("Server error:", err.message);
});
