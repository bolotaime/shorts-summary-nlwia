import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Não é um shorts!")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoId] = params.split("?si")

  content.textContent = "Obtendo o texto do aúdio."

  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
