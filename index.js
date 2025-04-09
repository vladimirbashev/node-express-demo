import express from "express"

const port = 9000;

const app = express()

app.get("/hello/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
