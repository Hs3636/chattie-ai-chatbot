// src/Gemini.js

async function run(prompt) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();

  if (res.ok) {
    return data.response;
  } else {
    throw new Error(data.error || "Something went wrong");
  }
}

export { run };
