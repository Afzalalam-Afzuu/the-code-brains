export function GET() {
  const content = "google.com, pub-3691889459537976, DIRECT, f08c47fec0942fa0\n";
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
