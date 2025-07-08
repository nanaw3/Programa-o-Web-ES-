import { Router } from "express"
import { LoremIpsum } from "lorem-ipsum"

const router = Router()

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

router.get("/lorem/:qtd", (req, res) => {
  const qtd = parseInt(req.params.qtd)

  if (isNaN(qtd) || qtd <= 0) {
    return res.status(400).send("Parâmetro inválido.")
  }

  const texto = lorem.generateParagraphs(qtd)
  res.send(`<p>${texto.replace(/\n/g, "</p><p>")}</p>`)
})

export default router
