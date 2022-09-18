router.post('/:id/comments', (req, res) => {
    const createdDate = new Date().toISOString(); 
    db..findOne({
     where:{id: req.params.id}
    })
    .then((article) => {
     if(!article) throw Error()
   db.comment.create({
     articleId: parseInt(req.params.id),
     name: req.body.name,
     content: req.body.content,
     createdAt: createdDate,
     updatedAt: createdDate
   })
   .then(comment => {
     res.redirect(`/articles/${req.params.id}`);
   })
  })
   .catch((error) => {
     res.status(400).render('main/404')
   })
  })
  