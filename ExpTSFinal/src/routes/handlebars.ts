import { Router } from "express"

const router = Router()

router.get("/hb1", (req, res) => {
  res.render("hb1", { nome: "Express + HBS!" })
})

router.get("/hb2", (req, res) => {
  res.render("hb2", { titulo: "Express Framework" })
})

router.get("/hb3", (req, res) => {
  const professores = [
    { nome: "David Fernandes", sala: "1238" },
    { nome: "Horácio Fernandes", sala: "1236" },
    { nome: "Edlene Moura", sala: "1236" },
    { nome: "Elaine Harada", sala: "1231" },
  ]
  res.render("hb3", { professores })
})

router.get("/hb4", (req, res) => {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ]

  res.render("hb4", { technologies })
})

export default router
