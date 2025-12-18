import tls from "tls";

export function checkSSL(hostname) {
  return new Promise((resolve) => {
    let handled = false;

    const socket = tls.connect(
      443,
      hostname,
      { servername: hostname, rejectUnauthorized: false },
      () => {
        if (handled) return;
        handled = true;
        const cert = socket.getPeerCertificate();
        socket.end();

        resolve({
          valid: !!cert.subject,
          issuer: cert.issuer?.O || "Unknown",
          validTo: cert.valid_to,
        });
      }
    );

    socket.on("error", (err) => {
      if (handled) return;
      handled = true;
      console.error(`SSL Error for ${hostname}:`, err.message);
      resolve({ valid: false, error: err.message });
    });

    socket.setTimeout(5000, () => {
      if (handled) return;
      handled = true;
      console.error(`SSL Timeout for ${hostname}`);
      socket.destroy();
      resolve({ valid: false, error: "Connection timed out" });
    });
  });
}

