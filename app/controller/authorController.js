const getAllAuthors = (req,res) => {
    res.status(200).json({
        success: true,
        message: `${req.method} - request to author endpoint.`
    })
}


const getAuthorById = (req,res) => {
    const { id } = req.params
    res.status(200).json({
        id: id,
        success: true,
        message: `${req.method} - request to author endpoint.`
    })
}

const createAuthor = (req,res) => {
    res.status(200).json({
        success: true,
        message: `${req.method} - request to author endpoint.`
    })
}

const updateAuthor = (req,res) => {
    const { id } = req.params
    res.status(200).json({
        id: id,
        success: true,
        message: `${req.method} - request to author endpoint.`
    })
}

const deleteAuthor = (req,res) => {
    const { id } = req.params
    res.status(200).json({
        id: id,
        success: true,
        message: `${req.method} - request to author endpoint.`
    })
}



module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}