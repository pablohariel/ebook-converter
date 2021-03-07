import { Router } from 'express'
import path from 'path'
import xtend from 'xtend'
import convert from 'ebook-convert'
import multer from 'multer'

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(' ').join(''))
  }
})

const routes = Router()
const upload = multer({ storage: storage })

routes.post('/book/download', upload.single('file'), async (req, res) => {
    let fileName = req.file.originalname.split(' ').join('')
    try {
      const options = {
        input: path.join(__dirname, 'uploads', fileName),
        output: path.join(__dirname, 'books', 'example.mobi'),
        authors: '"Seth Vincent"',
        pageBreaksBefore: '//h:h1',
        chapter: '//h:h1',
        insertBlankLine: true,
        insertBlankLineSize: '1',
        lineHeight: '12',
        marginTop: '50',
        marginRight: '50',
        marginBottom: '50',
        marginLeft: '50'
      }
  
      convert(options, function (err: Error) {
        if (err) return res.status(400).json({message: "error"})
        if (!err) return res.download(path.join(__dirname, 'books', 'example.mobi'))
      })
    } catch(err){
      console.log(err)
      res.status(400).json({message: "error"})
    }
  })

export default routes 