import { NextResponse } from "next/server";

const STORE_ENV = process.env.STORE_ENV;

export async function GET() {
  if (STORE_ENV === "production") {
    const content = [
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: "co.tapcart.app.id_99G6QNo3nu",
          sha256_cert_fingerprints: [
            "42:00:99:5A:DA:F4:7E:5F:9A:65:C7:1A:E2:6F:0B:9F:F3:8D:F5:74:F1:FC:00:BC:73:C2:BF:E1:4E:14:F7:45",
          ],
        },
      },
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: "co.tapcart.app.id_99G6QNo3nu",
          sha256_cert_fingerprints: [
            "A9:AC:8B:07:FB:3A:AD:91:68:86:7F:AA:26:A6:F0:38:FC:2A:09:9B:CD:AE:77:33:50:79:27:A4:3F:83:7E:5D",
          ],
        },
      },
    ];

    return new NextResponse(JSON.stringify(content), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return NextResponse.json({});
  }
}
