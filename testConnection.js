for (let i = 1; i <= 10; i++) {
  try {
    const response = await fetch("http://[::1]:3000/players/4", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Connection: "close",
      },
      body: JSON.stringify({
        name: "Zohar",
        lowestTime: 2.209,
        id: 4,
      }),
    });

    console.log(`Request ${i}: ${response.status}`);
    await response.text();
  } catch (error) {
    console.error(`Request ${i} FAILED:`, error.cause ?? error);
  }
}
