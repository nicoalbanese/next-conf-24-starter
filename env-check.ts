import "dotenv/config";

function main() {
  console.log("Hello, Conf!");
  console.log(process.env.AWS_REGION);
}

main();