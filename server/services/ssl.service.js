import tls from "tls";

export function checkSSL(hostname) {
  return new Promise((resolve) => {
    const socket = tls.connect(
      443,
      hostname,
      { servername: hostname, rejectUnauthorized: false },
      () => {
        const cert = socket.getPeerCertificate();
        socket.end();

        resolve({
          valid: !!cert.subject,
          issuer: cert.issuer?.O || "Unknown",
          validTo: cert.valid_to,
        });
      }
    );

    socket.on("error", () => resolve({ valid: false }));
  });
}

