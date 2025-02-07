// Generate the secret key and public key
let sk = window.NostrTools.generateSecretKey(); // `sk` is a Uint8Array
let pk;

// Wait for 2 seconds before generating and displaying the public key
setTimeout(() => {
  pk = window.NostrTools.getPublicKey(sk);
  console.log(sk);
  console.log(pk);

  // Display the public key on the HTML
  const pkDisplayElement = document.getElementById("pk-display");
  pkDisplayElement.textContent = `Key: ${pk}`;
}, 2000);
