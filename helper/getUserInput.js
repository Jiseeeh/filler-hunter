import prompt from "prompt-sync";

const input = prompt({ sigint: true });

export default function getUserInput() {
  return input("Enter anime title to hunt its fillers: ");
}
