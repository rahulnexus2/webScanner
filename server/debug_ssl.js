import tls from "tls";

const testDomains = ["google.com", "expired.badssl.com", "wrong.host.badssl.com", "self-signed.badssl.com"];

async function check(hostname) {
    console.log(`Checking ${hostname}...`);
    return new Promise((resolve) => {
        const socket = tls.connect(
            443,
            hostname,
            { servername: hostname, rejectUnauthorized: false },
            () => {
                const cert = socket.getPeerCertificate();
                socket.end();
                console.log(`  > Connected. Has cert? ${!!cert.subject}`);
                if (cert.subject) console.log(`  > Issuer: ${cert.issuer.O}`);
                resolve({
                    valid: !!cert.subject,
                    issuer: cert.issuer?.O || "Unknown",
                    validTo: cert.valid_to,
                });
            }
        );

        socket.on("error", (e) => {
            console.log(`  > Error: ${e.message}`);
            resolve({ valid: false });
        });

        // Add timeout handling which was missing in service
        socket.setTimeout(3000, () => {
            console.log("  > Timeout");
            socket.destroy();
            resolve({ valid: false });
        });
    });
}

async function run() {
    for (const d of testDomains) {
        await check(d);
    }
}

run();
