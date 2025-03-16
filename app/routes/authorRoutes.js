const router = require("express").Router()
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require("../controller/authorController")

router.get("/", getAllAuthors)

router.get("/:id", getAuthorById)

router.post("/",createAuthor)

router.patch("/:id", updateAuthor)


router.delete("/:id", deleteAuthor)


module.exports = router;
